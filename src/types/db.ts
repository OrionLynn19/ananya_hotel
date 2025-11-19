export interface Room {
  id: number;
  name: string; // This is "title" in frontend
  description: string | null;
  price: number;
  capacity: number;
  beds: number;
  available: boolean;
  image_url: string | null;
  
  // New fields to match frontend
  destination: string;
  category: 'Suite Ocean Front Wing' | 'Ocean Front Wing' | 'Deluxe Room';
  wing_label: string;
  size: string;
  ideal_for: string;
  bed_types: string;
  interconnect: boolean;
  
  created_at: string;
}

export interface Amenity {
  id: number;
  name: string;
  created_at: string;
}

export interface Package {
  id: number;
  room_id: number;
  name: string;
  description: string | null;
  original_price: number | null;
  price: number;
  points: number;
  benefits: string[]; // Array of benefit strings
  is_member_only: boolean;
  created_at: string;
}

export interface RoomAmenity {
  room_id: number;
  amenity_id: number;
}

export interface RoomWithAmenities extends Room {
  amenities: Amenity[];
}

export interface RoomWithPackages extends RoomWithAmenities {
  packages: Package[];
}

// Add type for filtering
export interface RoomFilters {
  destination?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface Booking {
  id: number;
  room_id: number;
  
  // Guest Information
  prefix: 'Mr.' | 'Mrs.' | 'Ms.' | 'Dr.' | 'Prof.';
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  passport_number?: string;
  
  // Booking Details
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  arrival_time?: string;
  special_requests?: string;
  
  // Pricing
  room_price_per_night: number;
  total_nights: number;
  subtotal: number;
  coupon_code?: string;
  discount_amount: number;
  total_price: number;
  
  // Status
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface BookingWithDetails extends Booking {
  room: RoomWithAmenities;
  amenities: string[];
}

export interface BookingRequest {
  room_id: number;
  prefix: string;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  passport_number?: string;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  arrival_time?: string;
  special_requests?: string;
  coupon_code?: string;
}

export interface Coupon {
  id: number;
  code: string;
  discount_type: 'percentage' | 'fixed';
  discount_value: number;
  valid_from: string | null;
  valid_until: string | null;
  max_uses: number | null;
  current_uses: number;
  active: boolean;
  created_at: string;
}

export interface CartItem {
  id: number;
  session_id: string;
  room_id: number;
  check_in: string;
  check_out: string;
  adults: number;
  children: number;
  price: number;
  created_at: string;
  room?: {
    name: string;
    image_url: string;
    capacity: number;
  };
}