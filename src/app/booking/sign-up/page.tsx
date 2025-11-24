"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const font = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
  };

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

 async function onSubmit(e: React.FormEvent) {
  e.preventDefault();
  setLoading(true);

  try {
    const res = await fetch("/api/auth/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password: pw }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Sign up failed");
      setLoading(false);
      return;
    }

    // After successful sign up → go to sign in page
    router.push("/booking/signin");
  } catch (err) {
    console.error(err);
    alert("Something went wrong. Please try again.");
    setLoading(false);
  }
}

  return (
    <div className="min-h-screen flex justify-center px-4 py-4 bg-transparent text-white">
      {/* DESKTOP */}
      <div className="hidden md:block w-[1440px] max-w-full 2xl:w-full mx-auto">
        <div className="rounded-3xl border border-white/90 bg-gradient-to-br from-black/20 via-black/20 to-amber-900/30 backdrop-blur-lg shadow-2xl flex flex-col md:flex-row overflow-hidden px-8 md:px-16 py-12 md:py-16 gap-12 md:gap-0">
          {/* Left text */}
          <div className="md:w-1/2 flex flex-col">
            <h1
              style={font}
              className="text-3xl md:text-[48px] font-extrabold tracking-tight mb-14"
            >
              Create your ANAYA&nbsp;Hotel account
            </h1>
            <p
              style={font}
              className="text-sm md:text-[26px] leading-relaxed max-w-md text-white"
            >
              It&apos;s with great pleasure that we extend our warmest welcome to you.
              Join ANAYA to enjoy a seamless booking experience, track your stays,
              and access exclusive offers crafted just for you.
            </p>
          </div>

          <div className="hidden md:block w-px bg-white/30 mx-12" />

          {/* Right form */}
          <div className="md:w-1/2">
            <h2 style={font} className="text-3xl font-bold mb-10 tracking-tight">
              Sign up
            </h2>

            <form onSubmit={onSubmit} className="flex flex-col gap-7">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs uppercase tracking-wide mb-2 py-2 text-white/70"
                  style={font}
                >
                  YOUR EMAIL
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-md border border-white/90 bg-white/5 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/90 transition"
                  placeholder="name@example.com"
                  style={font}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-xs uppercase tracking-wide mb-2 py-2 text-white/70"
                  style={font}
                >
                  PASSWORD
                </label>

                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    required
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    className="w-full rounded-md border border-white/90 bg-white/5 px-4 py-3 pr-28 text-white placeholder-white/60 focus:outline-none focus:border-white/90 transition"
                    placeholder="Password"
                    style={font}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPw((s) => !s)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-white/80 hover:text-white"
                    style={font}
                  >
                    {showPw ? "Hide password" : "Show password"}
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="flex items-center justify-end mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/90 px-8 py-3 text-white text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition"
                  style={font}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div className="mt-10 text-sm text-white/80 text-right" style={font}>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/booking/signin")}
                className="underline decoration-white/40 hover:text-white"
                style={font}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE */}
      <div className="md:hidden w-full px-4 py-6 text-white">
        <div className="max-w-[460px] w-full mx-auto">
          <div className="rounded-[32px] border border-white/80 bg-black/40 backdrop-blur-xl shadow-2xl px-6 py-8 flex flex-col items-stretch">
            <h1
              style={font}
              className="text-center text-[22px] leading-snug font-extrabold tracking-tight mb-4"
            >
              Create your ANAYA account
            </h1>

            <p
              style={font}
              className="text-center text-[13px] leading-relaxed text-white/90 mb-6"
            >
              Join ANAYA to enjoy effortless bookings and personalized experiences
              every time you stay with us.
            </p>

            <hr className="my-4 border-white/40" />

            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="w-full rounded-full border border-white/80 bg-white/10 px-5 py-3 text-[14px] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80"
                style={font}
              />

              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="text-[11px] text-white/80 hover:text-white underline decoration-white/40"
                  style={font}
                >
                  {showPw ? "Hide password" : "Show password"}
                </button>
              </div>

              <input
                type={showPw ? "text" : "password"}
                required
                value={pw}
                onChange={(e) => setPw(e.target.value)}
                placeholder="Password"
                className="w-full rounded-full border border-white/80 bg-white/10 px-5 py-3 text-[14px] text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/80"
                style={font}
              />

              <div className="flex flex-col items-center gap-3 mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-1 w-full max-w-[200px] rounded-full border border-white/80 bg-white/10 hover:bg-white/20 px-6 py-2.5 text-[13px] tracking-wide text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  style={font}
                >
                  {loading ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </form>

            <div
              className="mt-6 text-center text-[12px] text-white/80"
              style={font}
            >
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/booking/signin")}
                className="underline decoration-white/40 hover:text-white"
                style={font}
              >
                Sign In
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
