import { NextResponse } from 'next/server';
import { addToCart, getCartItems, clearCart } from '@/app/lib/dbhelper';
import { cookies } from 'next/headers';

function getOrCreateSessionId(): string {
  const cookieStore = cookies();
  let sessionId = cookieStore.get('session_id')?.value;
  
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }
  
  return sessionId;
}

export async function GET() {
  try {
    const sessionId = getOrCreateSessionId();
    const items = await getCartItems(sessionId);
    return NextResponse.json(items);
  } catch (error: any) {
    console.error('Error fetching cart:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const sessionId = getOrCreateSessionId();
    const { room_id, check_in, check_out, adults, children } = await request.json();
    
    // Validate input
    if (!room_id || !check_in || !check_out || !adults) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const cartItem = await addToCart(
      sessionId,
      room_id,
      check_in,
      check_out,
      adults,
      children || 0
    );
    
    const response = NextResponse.json(cartItem, { status: 201 });
    
    // Set session cookie
    response.cookies.set('session_id', sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7 // 7 days
    });
    
    return response;
  } catch (error: any) {
    console.error('Error adding to cart:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE() {
  try {
    const sessionId = getOrCreateSessionId();
    await clearCart(sessionId);
    return NextResponse.json({ success: true, message: 'Cart cleared' });
  } catch (error: any) {
    console.error('Error clearing cart:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}