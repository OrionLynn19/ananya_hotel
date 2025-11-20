import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createBookingFromCart } from "@/app/lib/bookingHelper";

function getSessionId(): string {
  const cookieStore = cookies();
  const sessionCookie = cookieStore.get("session_id");
  
  if (!sessionCookie?.value) {
    throw new Error("No session found");
  }
  
  return sessionCookie.value;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const sessionId = getSessionId();

    console.log("📝 Creating booking for session:", sessionId);

    const {
      prefix,
      firstName,
      lastName,
      passportNumber,
      email,
      phoneNumber,
      arrivedBy,
      specialRequest,
      couponCode,
      paymentMethod,
      totalCost,
      totalGuests,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phoneNumber) {
      return NextResponse.json(
        { error: "Missing required fields: firstName, lastName, email, phoneNumber" },
        { status: 400 }
      );
    }

    if (!paymentMethod) {
      return NextResponse.json(
        { error: "Payment method is required" },
        { status: 400 }
      );
    }

    const booking = await createBookingFromCart(
      sessionId,
      {
        prefix,
        firstName,
        lastName,
        passportNumber,
        email,
        phoneNumber,
        arrivedBy,
        specialRequest,
        couponCode,
        paymentMethod,
      },
      totalCost,
      totalGuests
    );

    console.log("✅ Booking created successfully:", booking.id);

    return NextResponse.json({
      success: true,
      bookingId: booking.id,
      message: "Booking created successfully",
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error("❌ Error creating booking:", message);
    return NextResponse.json(
      { error: "Failed to create booking", details: message },
      { status: 500 }
    );
  }
}