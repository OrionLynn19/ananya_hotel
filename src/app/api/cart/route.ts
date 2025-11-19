// import { NextResponse } from "next/server";
// import { getCartData } from "../../../mocks/cartData";

// export async function GET() {
//   const data = getCartData();
//   return NextResponse.json(data);
// }
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
    const rawItems = (await getCartItems(sessionId)) as DBCartItem[];

    // Map DB cart items to frontend-friendly shape
    const items = (rawItems || []).map(
      (
        ci: DBCartItem & {
          room?: {
            name?: string;
            image_url?: string;
            bed_types?: string;
            destination?: string;
          };
        }
      ) => {
        const nights = calculateNights(ci.check_in, ci.check_out);
        const pricePerNight =
          nights > 0 ? Math.round((ci.price / nights) * 100) / 100 : 0;
        const beds = ci.room?.bed_types
          ? String(ci.room.bed_types)
              .split(",")
              .map((s: string) => s.trim())
          : [];

        return {
          id: String(ci.id),
          title: ci.room?.name || `Room ${ci.room_id}`,
          image: ci.room?.image_url || "",
          beds,
          extraBed: false,
          persons: (ci.adults || 0) + (ci.children || 0),
          quantity: 1,
          pricePerNight,
          startDate: ci.check_in,
          endDate: ci.check_out,
          nights,
          location: ci.room?.destination || "",
        };
      }
    );

    const totalGuests = items.reduce(
      (acc: number, it) => acc + (it.persons || 0),
      0
    );
    const totalCost = (rawItems || []).reduce(
      (acc: number, it) => acc + (it.price || 0),
      0
    );

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
    const { room_id, check_in, check_out, adults, children } =
      await request.json();

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
      children || 0
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
