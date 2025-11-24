import { NextResponse } from 'next/server';
import { removeFromCart } from '@/app/lib/dbhelper';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    await removeFromCart(parseInt(params.id));
    return NextResponse.json({ success: true, message: 'Item removed from cart' });
  } catch (error: any) {
    console.error('Error removing from cart:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}