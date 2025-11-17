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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen text-white">
      <div className="relative min-h-screen">
        {/* 🔹 BACKGROUND IMAGE */}
        <div className="absolute inset-0 -z-10">
          <div
            className="h-full w-full bg-cover bg-center brightness-75"
            style={{ backgroundImage: "url('/Images/booking.png')" }}
          />
        </div>

        <header className="bg-[#33373d]/95 border-b border-white/10 backdrop-blur-sm">
          <div className="mx-auto max-w-7xl px-6 py-4">
            <div className="flex items-center justify-between md:hidden">
              <div className="flex w-10 justify-start">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(true)}
                  aria-label="Open menu"
                  className="text-white"
                >
                  <span className="mb-1 block h-0.5 w-6 bg-white" />
                  <span className="mb-1 block h-0.5 w-6 bg-white" />
                  <span className="block h-0.5 w-6 bg-white" />
                </button>
              </div>
              <div className="flex flex-1 justify-center">
                <div className="flex flex-col items-center leading-tight">
                  <Image
                    src="/Images/Vector.png"
                    alt="ANANYA logo"
                    width={42}
                    height={42}
                    className="object-contain"
                  />
                  <span className="mt-0.5 text-center text-[18px] font-semibold tracking-[0.25em]">
                    ANANYA
                  </span>
                </div>
              </div>

              {/* Right: round cart button (no THB here) */}
              <div className="flex w-10 justify-end">
                <Link
                  href="/booking/cart"
                  aria-label="Cart"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-transparent"
                >
                  <Image
                    src="/Images/cart.png"
                    alt="Cart"
                    width={18}
                    height={18}
                    className="object-contain"
                  />
                </Link>
              </div>
            </div>

            {/* 🔹 DESKTOP HEADER (original layout) */}
            <div className="hidden items-center justify-between md:flex">
              {/* Logo */}
              <div className="flex flex-col items-center leading-tight">
                <Image
                  src="/Images/Vector.png"
                  alt="ANANYA logo"
                  width={60}
                  height={60}
                  className="object-contain"
                />
                <span className="mt-1 text-center text-4xl font-semibold tracking-[0.25em]">
                  ANANYA
                </span>
              </div>

              {/* NAVIGATION MENU (desktop) */}
              <nav className="ml-43 flex items-center gap-8 text-sm font-medium">
                <Link
                  href="/"
                  className="rounded-full px-4 py-2 text-xl transition-all hover:border hover:border-white/60 hover:bg-white/10"
                >
                  Home
                </Link>

                <Link
                  href="/booking/rooms"
                  className="rounded-full px-4 py-2 text-xl transition-all hover:border hover:border-white/60 hover:bg-white/10"
                >
                  Rooms
                </Link>

                <Link
                  href="/booking/my-bookings"
                  className="rounded-full px-4 py-2 text-xl transition-all hover:border hover:border-white/60 hover:bg-white/10"
                >
                  My Bookings
                </Link>

                {/* 🔹 CURRENCY DROPDOWN (desktop) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenCurrency(!openCurrency)}
                    className="flex items-center gap-2 rounded-full px-4 py-2 text-xl transition-all hover:border hover:border-white/60 hover:bg-white/10"
                  >
                    <Image
                      src={currency.flag}
                      alt={currency.label}
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                    <span>{currency.label}</span>
                    <span>▾</span>
                  </button>

                  {openCurrency && (
                    <div className="absolute right-0 z-50 mt-2 w-32 rounded-2xl border border-white/20 bg-[#1c1f24]/95 py-2 shadow-xl">
                      {CURRENCIES.map((c) => (
                        <button
                          key={c.code}
                          onClick={() => {
                            setCurrency(c);
                            setOpenCurrency(false);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-left hover:bg-white/10"
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
                <Link
                  href="/booking/signin"
                  className="rounded-full px-4 py-2 text-xl transition-all hover:border hover:border-white/60 hover:bg-white/10"
                >
                  Sign in
                </Link>

                <Link
                  href="/booking/cart"
                  className="rounded-full px-4 py-2 transition-all hover:border hover:border-white/60 hover:bg-white/10"
                  aria-label="Cart"
                >
                  <Image
                    src="/Images/cart.png"
                    alt="Cart"
                    width={22}
                    height={22}
                    className="object-contain"
                  />
                </Link>
              </nav>
            </div>
          </div>
        </header>

        {/* 🔹 MOBILE FULL-SCREEN MENU OVERLAY */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-lg md:hidden">
            <div className="flex h-full flex-col px-8 pt-8 pb-10">
              {/* Top row: back arrow + THB + cart (like your menu screenshot) */}
              <div className="flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="text-2xl text-white"
                >
                  ←
                </button>

                <div className="flex items-center gap-4 text-sm text-white">
                  <div className="flex items-center gap-2">
                    <Image
                      src={currency.flag}
                      alt={currency.label}
                      width={20}
                      height={20}
                      className="rounded-full object-cover"
                    />
                    <span>{currency.label}</span>
                  </div>

                  <Link
                    href="/booking/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Cart"
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70"
                  >
                    <Image
                      src="/Images/cart.png"
                      alt="Cart"
                      width={18}
                      height={18}
                      className="object-contain"
                    />
                  </Link>
                </div>
              </div>

              {/* Menu links */}
              <nav className="mt-16 flex flex-col items-start gap-6 text-lg text-white">
                <Link
                  href="/"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  Home
                </Link>

                <Link
                  href="/booking/rooms"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  Rooms
                </Link>

                <Link
                  href="/booking/my-bookings"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  My Bookings
                </Link>

                <Link
                  href="/booking/signin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block"
                >
                  Sign in
                </Link>
              </nav>
            </div>
          </div>
        )}

        {/* 🔹 PAGE CONTENT */}
        <main>{children}</main>
      </div>
    </div>
  );
}
