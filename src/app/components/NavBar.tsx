"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);

  // close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // font settings to apply to all text elements in the nav
  const navTextStyle: React.CSSProperties = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "100%", // 1
    letterSpacing: "0px",
    textAlign: "center",
    verticalAlign: "middle",
    // vertical trim (cap height) approximation
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  return (
    // desktop-only
    <header className="hidden md:block">
      <div
        // nav container: fixed width, offsets & padding per spec, transparent + blur
        style={{
          position: "relative",
          left: "-3px",
        }}
      >
        <div
          className="mx-auto flex items-center justify-between gap-2"
          style={{
            width: 1443,
            height: 152.76,
            padding: "20px 40px",
            gap: 10,
            // visual: semi-transparent + blur to match mock
            background: "rgba(255,255,255,0.18)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          {/* Left nav */}
          <nav className="flex items-center gap-6 text-[20px] text-[#4a3a2b] font-semibold">
            <Link href="/menu" className="px-4" style={navTextStyle}>
              Menu
            </Link>

            <div className="h-6 w-px bg-[#4a3a2b]/60" aria-hidden />

            <Link href="/contact" className="px-4" style={navTextStyle}>
              Contact us
            </Link>
          </nav>

          {/* Center logo - absolute positioned to match exact offsets */}
          <div
            style={{
              position: "absolute",
              top: 20, // top offset
              left: 663.38, // left offset for logo placement
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 8,
              width: 120,
              height: 112.76,
              pointerEvents: "none", // allow clicks to pass to nearby controls if needed
            }}
            aria-hidden
          >
            <Image
              src="/images/nav-head.png"
              alt="ANANYA"
              width={120}
              height={112}
              style={{ objectFit: "contain", pointerEvents: "auto" }}
              priority
            />
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-6">
            {/* Language dropdown */}
            <div className="relative" ref={langRef}>
              <button
                onClick={() => setLangOpen((s) => !s)}
                className="flex items-center gap-2 rounded-full px-4 py-2 bg-[#FCF9F6] text-[#4a3a2b] shadow-sm"
                aria-haspopup="menu"
                aria-expanded={langOpen}
                aria-label="Language selector"
                style={navTextStyle}
              >
                <img
                  src="/images/TablerWorld.png"
                  alt="Language"
                  className="w-[26.67px] h-[26.67px] object-contain"
                />
                <span>En</span>
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-1"
                >
                  <path
                    d="M7 10l5 5 5-5"
                    stroke="#4a3a2b"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {langOpen && (
                <div
                  className="absolute right-0 mt-2 w-40 rounded-md bg-white/90 shadow-lg text-[#4a3a2b] z-50"
                  role="menu"
                >
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setLangOpen(false)}
                    style={navTextStyle}
                  >
                    English (En)
                  </Link>
                  <Link
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100"
                    onClick={() => setLangOpen(false)}
                    style={navTextStyle}
                  >
                    ไทย (Thai)
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/membership"
              className="text-[#4a3a2b] font-medium"
              style={navTextStyle}
            >
              Membership
            </Link>

            <Link href="/booking">
              <button
                className="rounded-full px-5 py-2 bg-[#FCF9F666] text-[#4a3a2b] shadow-sm"
                style={navTextStyle}
              >
                Booking
              </button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
