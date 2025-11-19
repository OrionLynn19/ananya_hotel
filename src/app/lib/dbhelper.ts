import { supabase } from './supabase';
import { 
  Room, 
  Amenity, 
  RoomWithAmenities,
  RoomFilters,
  Booking, 
  BookingWithDetails, 
  BookingRequest,
  Coupon,
  CartItem
} from '@/types/db';

// ============================================
// ROOM FUNCTIONS
// ============================================

export async function getAllRooms(filters?: RoomFilters): Promise<RoomWithAmenities[]> {
  let query = supabase
    .from('rooms')
    .select(`
      *,
      room_amenities (
        amenity_id,
        amenities (
          id,
          name
        )
      )
    `)
    .eq('available', true);

  // Apply filters
  if (filters?.destination) {
    query = query.eq('destination', filters.destination);
  }
  
  if (filters?.category) {
    query = query.eq('category', filters.category);
  }
  
  if (filters?.minPrice) {
    query = query.gte('price', filters.minPrice);
  }
  
  if (filters?.maxPrice) {
    query = query.lte('price', filters.maxPrice);
  }

  const { data: rooms, error } = await query;

  if (error) throw error;

  return rooms?.map(room => ({
    ...room,
    amenities: room.room_amenities?.map((ra: any) => ra.amenities) || []
  })) || [];
}

export async function getRoomsByDestination(destination: string): Promise<RoomWithAmenities[]> {
  return getAllRooms({ destination });
}

export async function getRoomsByCategory(category: string): Promise<RoomWithAmenities[]> {
  return getAllRooms({ category });
}

export async function getRoomById(id: number): Promise<RoomWithAmenities | null> {
  const { data: room, error } = await supabase
    .from('rooms')
    .select(`
      *,
      room_amenities (
        amenity_id,
        amenities (
          id,
          name
        )
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!room) return null;

  return {
    ...room,
    amenities: room.room_amenities?.map((ra: any) => ra.amenities) || []
  };
}

export async function getDestinations(): Promise<string[]> {
  const { data, error } = await supabase
    .from('rooms')
    .select('destination')
    .eq('available', true);

  if (error) throw error;
  
  // Get unique destinations
  const destinations = [...new Set(data?.map(r => r.destination))];
  return destinations.filter(Boolean) as string[];
}

export async function getCategories(): Promise<string[]> {
  const { data, error } = await supabase
    .from('rooms')
    .select('category')
    .eq('available', true);

  if (error) throw error;
  
  // Get unique categories
  const categories = [...new Set(data?.map(r => r.category))];
  return categories.filter(Boolean) as string[];
}

export async function createRoom(room: Omit<Room, 'id' | 'created_at'>): Promise<Room> {
  const { data, error } = await supabase
    .from('rooms')
    .insert(room)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function updateRoom(id: number, updates: Partial<Room>): Promise<Room> {
  const { data, error } = await supabase
    .from('rooms')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function deleteRoom(id: number): Promise<void> {
  const { error } = await supabase
    .from('rooms')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function getAllAmenities(): Promise<Amenity[]> {
  const { data, error } = await supabase
    .from('amenities')
    .select('*')
    .order('name');

  if (error) throw error;
  return data || [];
}

export async function addAmenityToRoom(roomId: number, amenityId: number): Promise<void> {
  const { error } = await supabase
    .from('room_amenities')
    .insert({ room_id: roomId, amenity_id: amenityId });

  if (error) throw error;
}

export async function removeAmenityFromRoom(roomId: number, amenityId: number): Promise<void> {
  const { error } = await supabase
    .from('room_amenities')
    .delete()
    .eq('room_id', roomId)
    .eq('amenity_id', amenityId);

  if (error) throw error;
}

// ============================================
// BOOKING HELPER FUNCTIONS
// ============================================

export async function checkRoomAvailability(
  roomId: number,
  checkIn: string,
  checkOut: string
): Promise<boolean> {
  const { data, error } = await supabase
    .from('bookings')
    .select('id')
    .eq('room_id', roomId)
    .neq('status', 'cancelled')
    .or(`and(check_in.lte.${checkOut},check_out.gte.${checkIn})`);

  if (error) throw error;
  return data.length === 0;
}

export async function checkRoomCapacity(
  roomId: number,
  adults: number,
  children: number
): Promise<{ isValid: boolean; message?: string }> {
  const room = await getRoomById(roomId);
  
  if (!room) {
    return { isValid: false, message: 'Room not found' };
  }
  
  const totalGuests = adults + children;
  
  if (totalGuests > room.capacity) {
    return { 
      isValid: false, 
      message: `Room capacity is ${room.capacity} guests. You selected ${totalGuests} guests.` 
    };
  }
  
  return { isValid: true };
}

export function calculateNights(checkIn: string, checkOut: string): number {
  const start = new Date(checkIn);
  const end = new Date(checkOut);
  const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(nights, 1);
}

export async function validateCoupon(code: string): Promise<Coupon | null> {
  const { data, error } = await supabase
    .from('coupons')
    .select('*')
    .eq('code', code.toUpperCase())
    .eq('active', true)
    .single();

  if (error) return null;
  if (!data) return null;

  const now = new Date();
  
  if (data.valid_from && new Date(data.valid_from) > now) {
    return null;
  }
  
  if (data.valid_until && new Date(data.valid_until) < now) {
    return null;
  }
  
  if (data.max_uses && data.current_uses >= data.max_uses) {
    return null;
  }

  return data;
}

export function calculateDiscount(subtotal: number, coupon: Coupon): number {
  if (coupon.discount_type === 'percentage') {
    return Math.round((subtotal * (coupon.discount_value / 100)) * 100) / 100;
  }
  return Math.min(coupon.discount_value, subtotal);
}

// ============================================
// BOOKING CRUD FUNCTIONS
// ============================================

export async function createBooking(bookingData: BookingRequest): Promise<BookingWithDetails> {
  // 1. Validate adults
  if (bookingData.adults < 1) {
    throw new Error('At least 1 adult is required');
  }

  // 2. Check room capacity
  const capacityCheck = await checkRoomCapacity(
    bookingData.room_id,
    bookingData.adults,
    bookingData.children
  );

  if (!capacityCheck.isValid) {
    throw new Error(capacityCheck.message || 'Room capacity exceeded');
  }

  // 3. Check room availability
  const isAvailable = await checkRoomAvailability(
    bookingData.room_id,
    bookingData.check_in,
    bookingData.check_out
  );

  if (!isAvailable) {
    throw new Error('Room is not available for the selected dates');
  }

  // 4. Get room details with amenities
  const room = await getRoomById(bookingData.room_id);
  if (!room) {
    throw new Error('Room not found');
  }

  // 5. Calculate pricing
  const totalNights = calculateNights(bookingData.check_in, bookingData.check_out);
  const subtotal = room.price * totalNights;
  
  let discountAmount = 0;
  let coupon: Coupon | null = null;

  // 6. Apply coupon if provided
  if (bookingData.coupon_code) {
    coupon = await validateCoupon(bookingData.coupon_code);
    if (coupon) {
      discountAmount = calculateDiscount(subtotal, coupon);
    } else {
      throw new Error('Invalid or expired coupon code');
    }
  }

  const totalPrice = subtotal - discountAmount;

  // 7. Create booking
  const { data: booking, error: bookingError } = await supabase
    .from('bookings')
    .insert({
      room_id: bookingData.room_id,
      prefix: bookingData.prefix,
      first_name: bookingData.first_name,
      last_name: bookingData.last_name,
      email: bookingData.email,
      phone_number: bookingData.phone_number,
      passport_number: bookingData.passport_number,
      check_in: bookingData.check_in,
      check_out: bookingData.check_out,
      adults: bookingData.adults,
      children: bookingData.children,
      arrival_time: bookingData.arrival_time,
      special_requests: bookingData.special_requests,
      room_price_per_night: room.price,
      total_nights: totalNights,
      subtotal: subtotal,
      coupon_code: bookingData.coupon_code?.toUpperCase(),
      discount_amount: discountAmount,
      total_price: totalPrice,
      status: 'pending'
    })
    .select()
    .single();

  if (bookingError) throw bookingError;

  // 8. Store amenities snapshot
  if (room.amenities.length > 0) {
    const amenityInserts = room.amenities.map(amenity => ({
      booking_id: booking.id,
      amenity_name: amenity.name
    }));

    await supabase
      .from('booking_amenities')
      .insert(amenityInserts);
  }

  // 9. Update coupon usage
  if (coupon) {
    await supabase
      .from('coupons')
      .update({ current_uses: coupon.current_uses + 1 })
      .eq('id', coupon.id);
  }

  // 10. Return complete booking with room details
  return {
    ...booking,
    room: room,
    amenities: room.amenities.map(a => a.name)
  };
}

export async function getBookingById(id: number): Promise<BookingWithDetails | null> {
  const { data: booking, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms (
        *,
        room_amenities (
          amenities (
            id,
            name
          )
        )
      ),
      booking_amenities (
        amenity_name
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  if (!booking) return null;

  return {
    ...booking,
    room: {
      ...booking.rooms,
      amenities: booking.rooms.room_amenities?.map((ra: any) => ra.amenities) || []
    },
    amenities: booking.booking_amenities?.map((ba: any) => ba.amenity_name) || []
  };
}

export async function getUserBookings(email: string): Promise<BookingWithDetails[]> {
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms (
        *,
        room_amenities (
          amenities (
            id,
            name
          )
        )
      ),
      booking_amenities (
        amenity_name
      )
    `)
    .eq('email', email)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return bookings?.map(booking => ({
    ...booking,
    room: {
      ...booking.rooms,
      amenities: booking.rooms.room_amenities?.map((ra: any) => ra.amenities) || []
    },
    amenities: booking.booking_amenities?.map((ba: any) => ba.amenity_name) || []
  })) || [];
}

export async function getAllBookings(): Promise<BookingWithDetails[]> {
  const { data: bookings, error } = await supabase
    .from('bookings')
    .select(`
      *,
      rooms (
        *,
        room_amenities (
          amenities (
            id,
            name
          )
        )
      ),
      booking_amenities (
        amenity_name
      )
    `)
    .order('created_at', { ascending: false });

  if (error) throw error;

  return bookings?.map(booking => ({
    ...booking,
    room: {
      ...booking.rooms,
      amenities: booking.rooms.room_amenities?.map((ra: any) => ra.amenities) || []
    },
    amenities: booking.booking_amenities?.map((ba: any) => ba.amenity_name) || []
  })) || [];
}

export async function updateBookingStatus(
  id: number,
  status: Booking['status']
): Promise<Booking> {
  const { data, error } = await supabase
    .from('bookings')
    .update({ status })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function cancelBooking(id: number): Promise<Booking> {
  return updateBookingStatus(id, 'cancelled');
}

// ============================================
// CART FUNCTIONS
// ============================================

export async function addToCart(
  sessionId: string,
  roomId: number,
  checkIn: string,
  checkOut: string,
  adults: number,
  children: number
): Promise<CartItem> {
  // Validate
  if (adults < 1) {
    throw new Error('At least 1 adult is required');
  }

  // Check capacity
  const capacityCheck = await checkRoomCapacity(roomId, adults, children);
  if (!capacityCheck.isValid) {
    throw new Error(capacityCheck.message || 'Room capacity exceeded');
  }

  // Get room price
  const room = await getRoomById(roomId);
  if (!room) throw new Error('Room not found');

  const totalNights = calculateNights(checkIn, checkOut);
  const price = room.price * totalNights;

  const { data, error } = await supabase
    .from('cart_items')
    .insert({
      session_id: sessionId,
      room_id: roomId,
      check_in: checkIn,
      check_out: checkOut,
      adults,
      children,
      price
    })
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getCartItems(sessionId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from('cart_items')
    .select(`
      *,
      rooms (
        name,
        image_url,
        capacity
      )
    `)
    .eq('session_id', sessionId);

  if (error) throw error;
  return data || [];
}

export async function removeFromCart(id: number): Promise<void> {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

export async function clearCart(sessionId: string): Promise<void> {
  const { error } = await supabase
    .from('cart_items')
    .delete()
    .eq('session_id', sessionId);

  if (error) throw error;
}

// ============================================
// COUPON FUNCTIONS
// ============================================

export async function applyCoupon(code: string, subtotal: number): Promise<{
  isValid: boolean;
  discount: number;
  coupon?: Coupon;
  message?: string;
}> {
  const coupon = await validateCoupon(code);
  
  if (!coupon) {
    return {
      isValid: false,
      discount: 0,
      message: 'Invalid or expired coupon code'
    };
  }

  const discount = calculateDiscount(subtotal, coupon);

  return {
    isValid: true,
    discount,
    coupon,
    message: `Coupon applied! You saved $${discount.toFixed(2)}`
  };
}