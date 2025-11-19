// src/app/api/auth/sign-in/route.ts
import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.session || !data.user) {
      return NextResponse.json(
        { message: error?.message ?? "Invalid email or password" },
        { status: 401 }
      );
    }

    const { user, session } = data;

try {
  await supabase
    .from("profiles")
    .upsert(
      {
        id: user.id,
        email: user.email,                               
        full_name: user.user_metadata?.full_name ?? null,
        role: "user",                                    
      },
      { onConflict: "id" }
    );
} catch {

}


    return NextResponse.json(
      {
        message: "Signed in successfully",
        userId: user.id,
        email: user.email,
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("Sign-in error:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
