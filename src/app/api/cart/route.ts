import { NextResponse } from "next/server";
import {
  addToCart,
  getCartItems,
  clearCart,
  removeFromCart,
  calculateNights,
} from "@/app/lib/dbhelper";
import type { CartItem as DBCartItem } from "@/types/db";
import { cookies } from "next/headers";

function getOrCreateSessionId(): string {
  const cookieStore = cookies() as unknown as {
    get: (key: string) => { value?: string } | undefined;
  };
  let sessionId = cookieStore.get("session_id")?.value;

  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random()
      .toString(36)
      .substr(2, 9)}`;
  }

  return sessionId;
}

export async function GET() {
  try {
    const sessionId = getOrCreateSessionId();
    const rawItems = (await getCartItems(sessionId)) as any[];

    console.log("Raw cart items from DB:", JSON.stringify(rawItems, null, 2));

    // Map DB cart items to frontend-friendly shape
    const items = (rawItems || []).map((ci) => {
      const nights = calculateNights(ci.check_in, ci.check_out);
      
      // ✅ Use the stored price (which should already be package_price × nights)
      const pricePerNight = nights > 0 ? Math.round((ci.price / nights) * 100) / 100 : 0;
      
      console.log(`Cart item ${ci.id}:`, {
        storedPrice: ci.price,
        nights,
        pricePerNight,
        package_id: ci.package_id,
        packageData: ci.package,
        bed_type: ci.bed_type,
        roomData: ci.room
      });
      
      // ✅ Use bed_type from cart_items table (this is what you stored)
      const beds = ci.bed_type 
        ? [ci.bed_type]
        : ci.room?.bed_types
          ? String(ci.room.bed_types)
              .split(",")
              .map((s: string) => s.trim())
          : ["Standard Bed"];

      return {
        id: String(ci.id),
        title: ci.room?.name || `Room ${ci.room_id}`,
        image: ci.room?.image_url || "",
        beds, // ✅ Now shows "King Bed" or "Twin Bed"
        extraBed: false,
        persons: (ci.adults || 0) + (ci.children || 0),
        quantity: 1,
        pricePerNight, // ✅ Correct package price per night
        startDate: ci.check_in,
        endDate: ci.check_out,
        nights,
        location: ci.room?.destination || "",
      };
    });

    const totalGuests = items.reduce(
      (acc: number, it) => acc + (it.persons || 0),
      0
    );
    const totalCost = (rawItems || []).reduce(
      (acc: number, it) => acc + (it.price || 0),
      0
    );

    console.log("Cart summary:", { totalGuests, totalCost, itemCount: items.length });

    const summary = { totalGuests: `${totalGuests} Adults`, totalCost };

    return NextResponse.json({ items, summary });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error fetching cart:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const sessionId = getOrCreateSessionId();
    const { 
      room_id, 
      package_id,
      package_price,
      bed_type,
      check_in, 
      check_out, 
      adults, 
      children 
    } = await request.json();

    console.log("Cart POST received:", { 
      room_id, 
      package_id, 
      package_price, 
      bed_type, 
      check_in, 
      check_out, 
      adults, 
      children 
    });

    // Validate input
    if (!room_id || !check_in || !check_out || !adults) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const cartItem = await addToCart(
      sessionId,
      room_id,
      check_in,
      check_out,
      adults,
      children || 0,
      package_id,
      package_price,
      bed_type
    );

    const response = NextResponse.json(cartItem, { status: 201 });

    // Set session cookie
    response.cookies.set("session_id", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error adding to cart:", message);
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const idParam = url.searchParams.get("id");

    if (idParam) {
      const id = Number(idParam);
      if (Number.isNaN(id)) {
        return NextResponse.json({ error: "Invalid id" }, { status: 400 });
      }
      await removeFromCart(id);
      return NextResponse.json({ success: true, message: "Item removed" });
    }

    const sessionId = getOrCreateSessionId();
    await clearCart(sessionId);
    return NextResponse.json({ success: true, message: "Cart cleared" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("Error clearing cart:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
