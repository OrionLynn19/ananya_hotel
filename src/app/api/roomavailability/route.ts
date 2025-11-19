import { NextResponse } from 'next/server';
import { checkRoomAvailability, checkRoomCapacity } from '@/app/lib/dbhelper';

export async function POST(request: Request) {
  try {
    const { room_id, check_in, check_out, adults, children } = await request.json();
    
    if (!room_id || !check_in || !check_out) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Check availability
    const isAvailable = await checkRoomAvailability(room_id, check_in, check_out);
    
    if (!isAvailable) {
      return NextResponse.json({
        available: false,
        message: 'Room is not available for selected dates'
      });
    }
    
    // Check capacity if adults/children provided
    if (adults !== undefined) {
      const capacityCheck = await checkRoomCapacity(
        room_id,
        adults,
        children || 0
      );
      
      if (!capacityCheck.isValid) {
        return NextResponse.json({
          available: false,
          message: capacityCheck.message
        });
      }
    }
    
    return NextResponse.json({
      available: true,
      message: 'Room is available'
    });
  } catch (error: any) {
    console.error('Error checking availability:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}