"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [langOpen, setLangOpen] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const langRef = useRef<HTMLDivElement | null>(null);
  const pathname = usePathname();

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

  // prevent body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileOpen]);

  // trigger transient transparent/blur style on navigation
  useEffect(() => {
    if (!pathname) return;
    setIsBlurred(true);
    const t = setTimeout(() => setIsBlurred(false), 900);
    return () => clearTimeout(t);
  }, [pathname]);

  // blur on scroll (set when scrolled past threshold) and make header fixed on scroll
  useEffect(() => {
    let rafId = 0;
    const threshold = 24; // px to start blurring; adjust as needed

    function onScroll() {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        setIsBlurred(scrolled > threshold);
        setIsFixed(scrolled > 0); // header becomes fixed when user scrolls
      });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    // initialize state based on current scroll position
    setIsBlurred(window.scrollY > threshold);
    setIsFixed(window.scrollY > 0);

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // font settings to apply to all text elements in the nav
  const navTextStyle: React.CSSProperties = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "100%",
    letterSpacing: "0px",
    textAlign: "center",
    verticalAlign: "middle",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  const dynamicNavStyle: React.CSSProperties = {
    width: "100%", // made responsive — control actual container width with Tailwind classes
    height: 152.76,
    padding: "20px 40px",
    gap: 10,
    background: isBlurred ? "rgba(255,255,255,0.18)" : "transparent",
    backdropFilter: isBlurred ? "blur(8px)" : "none",
    WebkitBackdropFilter: isBlurred ? "blur(8px)" : "none",
    borderRadius: 8,
    border: isBlurred ? "1px solid rgba(255,255,255,0.15)" : "none",
    transition:
      "background-color 300ms ease, backdrop-filter 300ms ease, border 300ms ease",
  };

  // mobile nav style (unchanged)
  const dynamicMobileStyle: React.CSSProperties = {
    width: 365,
    height: 122.25,
    padding: "0px 0px",
    background: isBlurred ? "rgba(255,255,255,0.18)" : "transparent",
    backdropFilter: isBlurred ? "blur(8px)" : "none",
    WebkitBackdropFilter: isBlurred ? "blur(8px)" : "none",
    borderRadius: 8,
    border: isBlurred ? "1px solid rgba(255,255,255,0.15)" : "none",
    transition:
      "background-color 300ms ease, backdrop-filter 300ms ease, border 300ms ease",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };

  return (
    <>
      {/* desktop header */}
      <header
        className="hidden md:block"
        style={{
          position: isFixed ? "fixed" : "relative",
          top: isFixed ? 0 : undefined,
          left: isFixed ? 0 : undefined,
          right: isFixed ? 0 : undefined,
          zIndex: 50,
        }}
      >
        <div
          style={{
            position: "relative",
            left: "-3px",
          }}
        >
          <div
            className="mx-auto w-[1440px] max-w-full 2xl:w-full flex items-center justify-between gap-2"
            style={dynamicNavStyle}
          >
            {/* Left nav */}
            <nav className="flex items-center gap-6 text-[20px] text-[#4a3a2b] font-semibold">
              <Link href="/menu" className="px-4" style={navTextStyle}>
                Menu
              </Link>

              <div className="h-6 w-px bg-[#4a3a2b]/60" aria-hidden />

              <Link
                href="/faqandcontactus"
                className="px-4"
                style={navTextStyle}
              >
                Contact us
              </Link>
            </nav>

            {/* Center logo - absolute positioned */}
            <div
              style={{
                position: "absolute",
                top: 20,
                left: "50%",
                transform: "translateX(-50%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 8,
                width: 120,
                height: 112.76,
                pointerEvents: "none",
              }}
              aria-hidden
            >
              <Link href="/">
                <Image
                  src="/images/nav-head.png"
                  alt="ANANYA"
                  width={120}
                  height={112}
                  style={{ objectFit: "contain", pointerEvents: "auto" }}
                  priority
                />
              </Link>
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
                  <Image
                    src="/images/TablerWorld.png"
                    alt="Language"
                    width={27}
                    height={27}
                    className="object-contain"
                    priority
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

      {/* spacer to prevent content jump when header is fixed */}
      {isFixed && (
        <div className="hidden md:block" style={{ height: 152.76 }} />
      )}

      {/* mobile header (unchanged) */}
      <header
        className="md:hidden flex justify-around "
        style={{
          position: isFixed ? "fixed" : "relative",
          top: isFixed ? 0 : undefined,
          left: isFixed ? 0 : undefined,
          right: isFixed ? 0 : undefined,
          zIndex: 50,
        }}
      >
        <div style={{ position: "relative", left: "-3px" }}>
          <div className="gap-9" style={dynamicMobileStyle}>
            {/* TOGGLE: hamburger <-> back arrow */}
            {mobileOpen ? (
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="bg-transparent"
                style={{
                  width: 49,
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  lineHeight: 1,
                }}
              >
                ‹
              </button>
            ) : (
              <button
                onClick={() => setMobileOpen(true)}
                aria-label="Open menu"
                className="bg-transparent"
                style={{
                  width: 49,
                  height: 22,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div
                  style={{
                    width: 28,
                    height: 16,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      height: 2,
                      background: "#4a3a2b",
                      borderRadius: 2,
                    }}
                  />
                  <span
                    style={{
                      display: "block",
                      height: 2,
                      background: "#4a3a2b",
                      borderRadius: 2,
                    }}
                  />
                  <span
                    style={{
                      display: "block",
                      height: 2,
                      background: "#4a3a2b",
                      borderRadius: 2,
                    }}
                  />
                </div>
              </button>
            )}

            {/* Center logo (nav-head) */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                width: 100,
                height: 70.25,
              }}
            >
              <Link href="/" onClick={() => setMobileOpen(false)}>
                <Image
                  src="/images/nav-head.png"
                  alt="ANANYA"
                  width={100}
                  height={60}
                  style={{ objectFit: "contain" }}
                  priority
                />
              </Link>
            </div>

            {/* Booking button */}
            <div>
              <Link href="/booking" onClick={() => setMobileOpen(false)}>
                <button
                  className="bg-[#FCF9F6] text-[#4a3a2b] shadow-sm"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    borderRadius: 8,
                    padding: "5px 10px",
                    minWidth: 49,
                    height: 26,
                  }}
                  aria-label="Book"
                >
                  <span style={navTextStyle}>Book</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* spacer for mobile when fixed */}
      {isFixed && <div className="md:hidden" style={{ height: 122.25 }} />}

      {/* mobile menu panel (opens when hamburger tapped) */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex right-0"
        >
          {/* overlay */}
          <div
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/30"
            aria-hidden
          />

          {/* panel: full-height with provided background image */}
          <aside
            className="relative ml-auto h-full shadow-lg"
            style={{
              width: "100%",
              maxWidth: 420,
              backgroundImage: "url('/images/mobile-b-nav-hamburger.png')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              gap: 22,
            }}
          >
            {/* top row: back (left) + language (right) */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Back"
                className="rounded-full p-2"
                style={{
                  background: "transparent",
                  fontSize: 22,
                  lineHeight: 1,
                }}
              >
                <Image
                  src="/images/backarrow.png"
                  alt="Back"
                  className="pb-7"
                  width={33}
                  height={33}
                  priority
                />
              </button>

              <div
                className="pb-8"
                style={{ display: "flex", alignItems: "center", gap: 8 }}
              >
                <div className="relative" ref={langRef}>
                  <button
                    onClick={() => setLangOpen((s) => !s)}
                    className="flex items-center gap-2 rounded-full px-3 py-2 bg-[#FCF9F666] text-[#4a3a2b] shadow-sm"
                    aria-haspopup="menu"
                    aria-expanded={langOpen}
                    aria-label="Language selector"
                    style={{
                      ...navTextStyle,
                      fontSize: 14,
                      lineHeight: "100%",
                    }}
                  >
                    <Image
                      src="/images/TablerWorld.png"
                      alt="Language"
                      width={26.67}
                      height={26.67}
                      priority
                    />
                    <span style={{ fontSize: 19 }}>EN</span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
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
                        onClick={() => setLangOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                        style={navTextStyle}
                      >
                        English (En)
                      </Link>
                      <Link
                        href="#"
                        onClick={() => setLangOpen(false)}
                        className="block px-4 py-2 hover:bg-gray-100"
                        style={navTextStyle}
                      >
                        ไทย (Thai)
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* vertical nav list (left-aligned, spaced) */}
            <nav
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 24,
                marginTop: 4,
              }}
            >
              <Link
                href="/membership"
                onClick={() => setMobileOpen(false)}
                style={{
                  ...navTextStyle,
                  textAlign: "left",
                  color: "#463214",
                  fontSize: "1.6rem",
                }}
              >
                Membership
              </Link>

              <Link
                href="/faqandcontactus"
                onClick={() => setMobileOpen(false)}
                style={{
                  ...navTextStyle,
                  textAlign: "left",
                  color: "#463214",
                  fontSize: "1.6rem",
                }}
              >
                Contact Us
              </Link>

              <Link
                href="/aboutus"
                onClick={() => setMobileOpen(false)}
                style={{
                  ...navTextStyle,
                  textAlign: "left",
                  color: "#463214",
                  fontSize: "1.6rem",
                }}
              >
                About Us
              </Link>

              <div
                style={{
                  ...navTextStyle,
                  textAlign: "left",
                  color: "#463214",
                  fontSize: "1.6rem",
                }}
              >
                Rooms
              </div>
              <div
                style={{
                  ...navTextStyle,
                  textAlign: "left",
                  color: "#463214",
                  fontSize: "1.6rem",
                }}
              >
                Promotions
              </div>
              <div
                style={{
                  ...navTextStyle,
                  textAlign: "left",
                  color: "#463214",
                  fontSize: "1.6rem",
                }}
              >
                Gallary
              </div>

              <div>
                <div
                  style={{
                    ...navTextStyle,
                    textAlign: "left",
                    color: "#463214",
                    fontSize: "1.6rem",
                    marginTop: 6,
                  }}
                >
                  Discover
                </div>
                <ul style={{ marginTop: 8, paddingLeft: 18, color: "#2f2218" }}>
                  <li
                    style={{
                      ...navTextStyle,
                      color: "#463214",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    <Link href="/about" onClick={() => setMobileOpen(false)}>
                      Resturant
                    </Link>
                  </li>
                  <li
                    style={{
                      ...navTextStyle,
                      color: "#463214",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    <Link href="/about" onClick={() => setMobileOpen(false)}>
                      Spa
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <div
                  style={{
                    ...navTextStyle,
                    textAlign: "left",
                    color: "#2f2218",
                    marginTop: 6,
                  }}
                >
                  <Link href="/ourservice" onClick={() => setMobileOpen(false)}>
                    Our Services
                  </Link>
                  
                </div>
                <ul style={{ marginTop: 8, paddingLeft: 18, color: "#2f2218" }}>
                  <li
                    style={{
                      ...navTextStyle,
                      color: "#463214",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    <Link href="/about" onClick={() => setMobileOpen(false)}>
                      Wedding
                    </Link>
                  </li>
                  <li
                    style={{
                      ...navTextStyle,
                      color: "#463214",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    <Link href="/about" onClick={() => setMobileOpen(false)}>
                      Events
                    </Link>
                  </li>
                  <li
                    style={{
                      ...navTextStyle,
                      color: "#463214",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    <Link href="/about" onClick={() => setMobileOpen(false)}>
                      Workshop
                    </Link>
                  </li>
                  <li
                    style={{
                      ...navTextStyle,
                      color: "#463214",
                      fontSize: "1.3rem",
                      fontWeight: 500,
                      textAlign: "left",
                    }}
                  >
                    <Link href="/about" onClick={() => setMobileOpen(false)}>
                      Creators' Program
                    </Link>
                  </li>
                </ul>
              </div>
            </nav>
          </aside>
        </div>
      )}
    </>
  );
}
