import { supabase } from "./supabase";

export type BookingData = {
  prefix: string;
  firstName: string;
  lastName: string;
  passportNumber: string;
  email: string;
  phoneNumber: string;
  arrivedBy?: string;
  specialRequest?: string;
  couponCode?: string;
  paymentMethod?: string;
};

function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const diff = end.getTime() - start.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export async function createBookingFromCart(
  sessionId: string,
  bookingData: BookingData,
  totalCost: number,
  totalGuests: number
) {
  try {
    console.log("🔄 Creating booking for session:", sessionId);

    // 1. Get cart items with full details
    const { data: cartItems, error: cartError } = await supabase
      .from("cart_items")
      .select(`
        *,
        room:rooms!cart_items_room_id_fkey (
          id,
          name,
          price
        )
      `)
      .eq("session_id", sessionId);

    if (cartError) {
      console.error("❌ Error fetching cart:", cartError);
      throw cartError;
    }

    if (!cartItems || cartItems.length === 0) {
      throw new Error("Cart is empty");
    }

    console.log("📦 Cart items to book:", cartItems.length);

    // 2. Calculate discount if coupon applied
    const discountAmount = 0; // TODO: Implement coupon logic
    const finalTotal = totalCost - discountAmount;

    // 3. Get the first room's check-in/out for the main booking record
    const firstItem = cartItems[0];
    const totalNights = calculateNights(firstItem.check_in, firstItem.check_out);

    // 4. Create main booking record
    const { data: booking, error: bookingError } = await supabase
      .from("bookings")
      .insert({
        session_id: sessionId,
        room_id: firstItem.room_id, // Primary room (required by schema)
        prefix: bookingData.prefix || "Mr.",
        first_name: bookingData.firstName,
        last_name: bookingData.lastName,
        email: bookingData.email,
        phone_number: bookingData.phoneNumber,
        passport_number: bookingData.passportNumber || null,
        check_in: firstItem.check_in,
        check_out: firstItem.check_out,
        adults: firstItem.adults,
        children: firstItem.children || 0,
        arrival_time: bookingData.arrivedBy || null,
        special_requests: bookingData.specialRequest || null,
        room_price_per_night: firstItem.price / totalNights,
        total_nights: totalNights,
        subtotal: totalCost,
        coupon_code: bookingData.couponCode || null,
        discount_amount: discountAmount,
        total_price: finalTotal,
        payment_method: bookingData.paymentMethod,
        payment_status: "pending",
        status: "pending",
      })
      .select()
      .single();

    if (bookingError) {
      console.error("❌ Error creating booking:", bookingError);
      throw bookingError;
    }

    console.log("✅ Main booking created:", booking.id);

    // 5. Create booking_items for each cart item
    const bookingItems = cartItems.map((item) => {
      const nights = calculateNights(item.check_in, item.check_out);
      return {
        booking_id: booking.id,
        room_id: item.room_id,
        package_id: item.package_id,
        bed_type: item.bed_type,
        check_in: item.check_in,
        check_out: item.check_out,
        adults: item.adults,
        children: item.children || 0,
        total_nights: nights,
        room_price_per_night: item.price / nights,
        subtotal: item.price,
      };
    });

    const { error: itemsError } = await supabase
      .from("booking_items")
      .insert(bookingItems);

    if (itemsError) {
      console.error("❌ Error creating booking items:", itemsError);
      // Rollback: delete the booking
      await supabase.from("bookings").delete().eq("id", booking.id);
      throw itemsError;
    }

    console.log("✅ Booking items created:", bookingItems.length);

    // 6. Clear the cart
    const { error: clearError } = await supabase
      .from("cart_items")
      .delete()
      .eq("session_id", sessionId);

    if (clearError) {
      console.error("⚠️ Warning: Could not clear cart:", clearError);
      // Don't throw - booking is already created
    }

    console.log("✅ Cart cleared");

    return booking;
  } catch (error) {
    console.error("❌ Failed to create booking:", error);
    throw error;
  }
}

export async function getBooking(bookingId: number) {
  const { data: booking, error } = await supabase
    .from("bookings")
    .select(`
      *,
      booking_items (
        *,
        room:rooms (
          id,
          name,
          image_url,
          destination
        )
      )
    `)
    .eq("id", bookingId)
    .single();

  if (error) {
    console.error("Error fetching booking:", error);
    throw error;
  }

  return booking;
}