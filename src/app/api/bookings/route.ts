import { NextResponse } from 'next/server';
import { createBooking, getUserBookings, getAllBookings } from '@/app/lib/dbhelper';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const booking = await createBooking(body);
    return NextResponse.json(booking, { status: 201 });
  } catch (error: any) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to create booking' },
      { status: 400 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (email) {
      // Get bookings for specific user
      const bookings = await getUserBookings(email);
      return NextResponse.json(bookings);
    }

    // Get all bookings (admin)
    const bookings = await getAllBookings();
    return NextResponse.json(bookings);
  } catch (error: any) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}