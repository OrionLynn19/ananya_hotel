export interface Room {
  id: number;
  name: string;
  description: string | null;
  price: number;
  capacity: number;
  beds: number;
  available: boolean;
  image_url: string | null;
  created_at: string;
}

export interface Amenity {
  id: number;
  name: string;
  created_at: string;
}

export interface RoomAmenity {
  room_id: number;
  amenity_id: number;
}

export interface RoomWithAmenities extends Room {
  amenities: Amenity[];
}