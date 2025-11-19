import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';
import type { RoomWithPackages } from '@/types/db';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    
    // Get search parameters
    const destination = searchParams.get('destination');
    const checkIn = searchParams.get('checkIn');
    const checkOut = searchParams.get('checkOut');
    const roomsCount = parseInt(searchParams.get('rooms') || '1');
    const adults = parseInt(searchParams.get('adults') || '2');
    const children = parseInt(searchParams.get('children') || '0');

    // Build query
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
        ),
        packages (
          id,
          name,
          description,
          original_price,
          price,
          points,
          benefits,
          is_member_only
        )
      `)
      .eq('available', true);

    // Apply filters
    if (destination) {
      query = query.eq('destination', destination);
    }

    // Filter by capacity (total guests)
    const totalGuests = adults + children;
    if (totalGuests) {
      query = query.gte('capacity', totalGuests);
    }

    const { data: rooms, error } = await query;

    if (error) throw error;

    // Map to frontend format
    const mappedRooms: RoomWithPackages[] = rooms?.map(room => ({
      ...room,
      amenities: room.room_amenities?.map((ra: any) => ra.amenities) || [],
      packages: room.packages || []
    })) || [];

    // TODO: Later you can add availability checking based on checkIn/checkOut dates
    // For now, we return all matching rooms

    return NextResponse.json(mappedRooms);
  } catch (error) {
    console.error('Error fetching booking rooms:', error);
    return NextResponse.json(
      { error: 'Failed to fetch rooms' },
      { status: 500 }
    );
  }
}