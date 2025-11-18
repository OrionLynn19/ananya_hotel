import { supabase } from './supabase';
import { Room, Amenity, RoomWithAmenities } from '../types/db'; 

export async function getAllRooms(): Promise<RoomWithAmenities[]> {
  const { data: rooms, error } = await supabase
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

  if (error) throw error;

  return rooms?.map(room => ({
    ...room,
    amenities: room.room_amenities?.map((ra: any) => ra.amenities) || []
  })) || [];
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