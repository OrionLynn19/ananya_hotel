import { NextResponse } from 'next/server';
import { getBookingById, updateBookingStatus, cancelBooking } from '@/app/lib/dbhelper';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await getBookingById(parseInt(params.id));
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(booking);
  } catch (error: any) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json();
    
    if (!['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }
    
    const booking = await updateBookingStatus(parseInt(params.id), status);
    return NextResponse.json(booking);
  } catch (error: any) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const booking = await cancelBooking(parseInt(params.id));
    return NextResponse.json(booking);
  } catch (error: any) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}