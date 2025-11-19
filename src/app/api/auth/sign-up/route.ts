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

    // 1) Create user in Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    console.log("SignUp result:", { data, error });

    if (error || !data?.user) {
      return NextResponse.json(
        { message: error?.message || "Failed to sign up" },
        { status: 400 }
      );
    }

    const user = data.user;

    // 2) Create profile row (now also storing email)
    const { error: profileError } = await supabase.from("profiles").insert({
      id: user.id,     // same as auth.users.id (uuid)
      email: email,    // copy email into profiles table
      full_name: null,
      phone: null,
      role: "user",
    });

    if (profileError) {
      console.error("Profile insert error:", profileError);
      // Auth user is created, so we still return success
      return NextResponse.json(
        {
          message:
            "Account created, but failed to create profile record. Please contact admin.",
          userId: user.id,
          email: user.email,
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      {
        message: "Account created successfully",
        userId: user.id,
        email: user.email,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("SignUp route error:", err);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
