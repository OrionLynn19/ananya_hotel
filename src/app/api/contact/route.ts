import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { firstName, lastName, email, subject, message } = await req.json();

    if (!firstName || !email || !message) {
      return NextResponse.json(
        { message: "First name, email, and message are required." },
        { status: 400 }
      );
    }

    const { error } = await supabase.from("contact_messages").insert({
      first_name: firstName,
      last_name: lastName,
      email,
      subject,
      message,
    });

    if (error) {
      console.error(error);
      return NextResponse.json(
        { message: "Failed to send message." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Message sent successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ ok: true, route: "contact" });
}
