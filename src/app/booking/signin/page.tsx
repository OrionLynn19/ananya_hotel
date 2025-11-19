"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";


export default function SignInPage() {
  const router = useRouter();
  const font = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
  };

  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/booking/my-bookings");
    }, 1200);
  }

  return (
    <div className="min-h-screen flex justify-center px-4 py-4 bg-transparent text-white">
      <div className="hidden md:block w-[1440px] max-w-full 2xl:w-full mx-auto">
        {/* border updated to border-white/90 */}
        <div className="rounded-3xl border border-white/90 bg-gradient-to-br from-black/20 via-black/20 to-amber-900/30 backdrop-blur-lg shadow-2xl flex flex-col md:flex-row overflow-hidden px-8 md:px-16 py-12 md:py-16 gap-12 md:gap-0">
          {/* Left welcome panel */}
          <div className="md:w-1/2 flex flex-col">
            <h1
              style={font}
              className="text-3xl md:text-[48px] font-extrabold tracking-tight mb-14"
            >
              Welcome back to ANAYA&nbsp;Hotel
            </h1>
            <p
              style={font}
              className="text-sm md:text-[26px] leading-relaxed max-w-md text-white"
            >
              It's with great pleasure that we extend our warmest welcome to
              you. We're thrilled to have you here and invite you to discover a
              sanctuary where the stunning beauty of the ocean meets
              unparalleled comfort. ANAYA is more than just a place to stay;
              it's a destination designed for tranquility, rejuvenation, and
              creating unforgettable memories.
            </p>
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px bg-white/30 mx-12" />

          {/* Right form panel */}
          <div className="md:w-1/2">
            <h2
              style={font}
              className="text-3xl font-bold mb-10 tracking-tight"
            >
              Sign in
            </h2>

            <form onSubmit={onSubmit} className="flex flex-col gap-7">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  // label paddingY increased
                  className="block text-xs uppercase tracking-wide mb-2 py-2 text-white/70"
                  style={font}
                >
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  // borders -> border-white/90
                  className="w-full rounded-md border border-white/90 bg-white/5 px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-white/90 transition"
                  placeholder="name@example.com"
                  style={font}
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  // label paddingY increased
                  className="block text-xs uppercase tracking-wide mb-2 py-2 text-white/70"
                  style={font}
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    required
                    value={pw}
                    onChange={(e) => setPw(e.target.value)}
                    // borders -> border-white/90
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
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => router.push("/booking/forgot-password")}
                    className="text-[11px] text-white/70 hover:text-white underline decoration-white/30"
                    style={font}
                  >
                    Forgot password?
                  </button>
                </div>
              </div>

              {/* Submit */}
              <div className="flex  items-center justify-end mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  // borders -> border-white/90
                  className="rounded-xl bg-white/10 hover:bg-white/20 border border-white/90 px-8 py-3 text-white text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed transition"
                  style={font}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>

            <div
              className="mt-10 text-sm text-white/80 text-right"
              style={font}
            >
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/booking/sign-up")}
                className="underline decoration-white/40 hover:text-white"
                style={font}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE SIGN-IN (≤ md) — place this block under the desktop layout. Desktop remains untouched */}
      <div className="md:hidden w-full px-4 py-8 text-white">
        <div className="max-w-[520px] w-full mx-auto">
          <div className="rounded-3xl border border-white/90 bg-gradient-to-br from-black/20 via-black/20 to-amber-900/30 backdrop-blur-lg shadow-2xl px-6 py-6">
            {/* Title + intro */}
            <h1
              style={font}
              className="text-center text-[28px] font-extrabold tracking-tight"
            >
              Welcome back to ANAYA&nbsp;Hotel
            </h1>
            <p
              style={font}
              className="mt-4 text-center text-[17px] leading-6 text-white font-normal px-7"
            >
              It's with great pleasure that we extend our warmest welcome to
              you. We're thrilled to have you here and invite you to discover a
              sanctuary where the stunning beauty of the ocean meets
              unparalleled comfort.
            </p>

            <hr className="my-6 border-white/90" />

            {/* Form */}
            <form onSubmit={onSubmit} className="flex flex-col gap-4">
              {/* Email */}
              <div>
                <input
                  id="m-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xl rounded-xl border border-white/90 bg-white/5 px-4 py-4 text-white placeholder-white/70 focus:outline-none focus:border-white/90"
                  placeholder="Your Email"
                  style={font}
                />
              </div>

              {/* Show password toggle (align right under email, like screenshot) */}
              <div className="flex justify-end -mt-1">
                <button
                  type="button"
                  onClick={() => setShowPw((s) => !s)}
                  className="text-[12px] text-white/80 hover:text-white underline decoration-white/40"
                  style={font}
                >
                  {showPw ? "Hide password" : "Show password"}
                </button>
              </div>

              {/* Password */}
              <div>
                <input
                  id="m-password"
                  type={showPw ? "text" : "password"}
                  required
                  value={pw}
                  onChange={(e) => setPw(e.target.value)}
                  className="w-full text-xl rounded-xl border border-white/90 bg-white/5 px-4 py-4 text-white placeholder-white/70 focus:outline-none focus:border-white/90"
                  placeholder="Password"
                  style={font}
                />
              </div>

              {/* Forgot + Sign In (right-aligned like screenshot) */}
              <div className="flex flex-col gap-3 items-end mt-1">
                <button
                  type="button"
                  onClick={() => router.push("/booking/forgot-password")}
                  className="text-[12px] text-white/80 hover:text-white underline decoration-white/40"
                  style={font}
                >
                  Forgot password?
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-white/10 hover:bg-white/20 border border-white/90 px-6 py-3 text-white text-sm tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
                  style={font}
                >
                  {loading ? "Signing in..." : "Sign In"}
                </button>
              </div>
            </form>

            {/* Bottom note */}
            <div
              className="mt-6 text-center text-sm text-white/80"
              style={font}
            >
              Don’t have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/booking/sign-up")}
                className="underline decoration-white/40 hover:text-white"
                style={font}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
