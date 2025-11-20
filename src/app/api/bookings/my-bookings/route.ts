import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { supabase } from "@/app/lib/supabase";

function getSessionId(): string | null {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session_id");
  return sessionCookie?.value || null;
}

// ✅ Helper function to parse date without timezone issues
function formatLocalDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// ✅ Helper to parse date for comparison
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export async function GET() {
  try {
    const sessionId = getSessionId();

    if (!sessionId) {
      return NextResponse.json({ bookings: [] });
    }

    console.log("📋 Fetching bookings for session:", sessionId);

    // Fetch all bookings for this session with related data
    const { data: bookings, error } = await supabase
      .from("bookings")
      .select(`
        id,
        prefix,
        first_name,
        last_name,
        email,
        phone_number,
        passport_number,
        check_in,
        check_out,
        adults,
        children,
        total_price,
        status,
        payment_status,
        created_at,
        booking_items (
          id,
          room_id,
          bed_type,
          check_in,
          check_out,
          adults,
          children,
          total_nights,
          subtotal,
          room:rooms (
            id,
            name,
            image_url,
            destination
          )
        )
      `)
      .eq("session_id", sessionId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("❌ Error fetching bookings:", error);
      throw error;
    }

    console.log("✅ Found bookings:", bookings?.length || 0);

    // Transform data to match frontend format
    const formattedBookings = (bookings || []).map((booking) => {
      const bookingItems = booking.booking_items || [];
      const totalGuests = booking.adults + (booking.children || 0);
      const totalRooms = bookingItems.length;

      // Determine status and tag
      let status: "IN_PROGRESS" | "COMPLETED" | "CANCELLED";
      let tag: string;

      // ✅ Use local date parsing for comparison
      const checkInDate = parseLocalDate(booking.check_in);
      const checkOutDate = parseLocalDate(booking.check_out);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (booking.status === "cancelled") {
        status = "CANCELLED";
        tag = "Cancelled";
      } else if (checkOutDate < today) {
        status = "COMPLETED";
        tag = "Completed";
      } else if (booking.payment_status === "pending") {
        status = "IN_PROGRESS";
        tag = "Payment Pending";
      } else {
        status = "IN_PROGRESS";
        tag = "Upcoming";
      }

      // Get primary room image (first booking item)
      const primaryRoom = bookingItems[0]?.room;
      const imageSrc = primaryRoom?.image_url?.startsWith('/')
        ? primaryRoom.image_url
        : `/Images/${primaryRoom?.image_url || 'default-room.jpg'}`;

      return {
        id: String(booking.id),
        title: primaryRoom?.name || "Room Booking",
        tag,
        amount: Number(booking.total_price),
        currency: "THB",
        guests: totalGuests,
        rooms: totalRooms,
        startDate: formatLocalDate(booking.check_in), // ✅ Use local date formatting
        endDate: formatLocalDate(booking.check_out),   // ✅ Use local date formatting
        location: primaryRoom?.destination || "Thailand",
        imageSrc,
        status,
        bookingItems: bookingItems.map((item) => ({
          roomName: item.room?.name || "Room",
          bedType: item.bed_type,
          nights: item.total_nights,
          subtotal: Number(item.subtotal),
        })),
      };
    });

    return NextResponse.json({ bookings: formattedBookings });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("❌ Error in my-bookings API:", message);
    return NextResponse.json(
      { error: "Failed to fetch bookings", details: message },
      { status: 500 }
    );
  }
}