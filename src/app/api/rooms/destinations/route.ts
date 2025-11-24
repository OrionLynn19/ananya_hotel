import { NextResponse } from 'next/server';
import { getDestinations } from '@/app/lib/dbhelper';

export async function GET() {
  try {
    const destinations = await getDestinations();
    return NextResponse.json(destinations);
  } catch (error) {
    console.error('Error fetching destinations:', error);
    return NextResponse.json(
      { error: 'Failed to fetch destinations' },
      { status: 500 }
    );
  }
}