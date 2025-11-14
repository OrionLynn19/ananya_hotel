"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Currency = {
  code: string;
  label: string;
  flag: string; // path in /public/Images
};

const CURRENCIES: Currency[] = [
  { code: "THB", label: "THB", flag: "/Images/Thai.png" },
  { code: "CNY", label: "CNY", flag: "/Images/China.png" },
  { code: "USD", label: "USD", flag: "/Images/USA.png" },
];

export default function BookingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currency, setCurrency] = useState<Currency>(CURRENCIES[0]);
  const [openCurrency, setOpenCurrency] = useState(false);

  return (
    <div className="min-h-screen text-white">
      <div className="relative min-h-screen">
        {/* 🔹 BACKGROUND IMAGE */}
        <div className="absolute inset-0 -z-10">
          <div
            className="w-full h-full bg-cover bg-center brightness-75"
            style={{ backgroundImage: "url('/Images/booking.png')" }}
          />
        </div>

        {/* 🔹 NAVBAR */}
        <header className="bg-[#33373d]/95 backdrop-blur-sm border-b border-white/10">
          <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
            {/* 🔹 LOGO + TEXT */}
           <div className="flex flex-col items-center leading-tight">
  <Image
    src="/Images/Vector.png"
    alt="ANANYA logo"
    width={60}
    height={60}
    className="object-contain"
  />

  <span className="tracking-[0.25em] text-4xl font-semibold mt-1 text-center">
    ANANYA
  </span>
</div>

            {/* 🔹 NAVIGATION MENU */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium ml-43">

              <Link
                href="/"
                className="px-4 py-2 rounded-full transition-all hover:border hover:border-white/60 hover:bg-white/10 text-xl"
              >
                Home
              </Link>

              <Link
                href="/booking/rooms"
                className="px-4 py-2 rounded-full transition-all hover:border hover:border-white/60 hover:bg-white/10 text-xl"
              >
                Rooms
              </Link>

              <Link
                href="/booking/my-bookings"
                className="px-4 py-2 rounded-full transition-all hover:border hover:border-white/60 hover:bg-white/10 text-xl"
              >
                My Bookings
              </Link>

              {/* 🔹 CURRENCY DROPDOWN */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setOpenCurrency(!openCurrency)}
                  className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:border hover:border-white/60 hover:bg-white/10 text-xl"
                >
                  <Image
                    src={currency.flag}
                    alt={currency.label}
                    width={20}
                    height={20}
                    className="object-cover rounded-full"
                  />
                  <span>{currency.label}</span>
                  <span>▾</span>
                </button>

                {openCurrency && (
                  <div className="absolute right-0 mt-2 w-32 z-50 bg-[#1c1f24]/95 border border-white/20 rounded-2xl shadow-xl py-2">
                    {CURRENCIES.map((c) => (
                      <button
                        key={c.code}
                        onClick={() => {
                          setCurrency(c);
                          setOpenCurrency(false);
                        }}
                        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-white/10"
                      >
                        <Image
                          src={c.flag}
                          alt={c.label}
                          width={20}
                          height={20}
                          className="rounded-full"
                        />
                        {c.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* 🔹 SIGN IN */}
              <Link
                href="/booking/signin"
                className="px-4 py-2 rounded-full transition-all hover:border hover:border-white/60 hover:bg-white/10 text-xl"
              >
                Sign in
              </Link>

              {/* 🔹 CART ICON */}
              <Link
  href="/booking/cart"
  className="px-4 py-2 rounded-full transition-all hover:border hover:border-white/60 hover:bg-white/10"
  aria-label="Cart"
>
  <Image
    src="/Images/cart.png"   // ← your cart image file
    alt="Cart"
    width={22}
    height={22}
    className="object-contain"
  />
</Link>
            </nav>
          </div>
        </header>

        {/* 🔹 PAGE CONTENT */}
        <main className="max-w-7xl mx-auto px-6 py-10">{children}</main>
      </div>
    </div>
  );
}
