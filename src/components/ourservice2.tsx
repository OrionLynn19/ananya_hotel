"use client";

import Image from "next/image";
import { useState } from "react";

// --- Data Definitions ---
const services = [
  { src: "/images/service1.png", alt: "Service 1" },
  { src: "/images/service3.png", alt: "Service 2" },
  { src: "/images/service11.png", alt: "Service 3" },
  { src: "/images/service33.png", alt: "Service 4" },
];

export default function OurService2() {
  const [index, setIndex] = useState(0);

  // same font/text styling as NavBar.tsx
  const navTextStyle: React.CSSProperties = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
    fontWeight: 600,
    fontSize: "40px",
    lineHeight: "100%",
    letterSpacing: "0px",
    textAlign: "left",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
  };

  const prev = () =>
    setIndex((i) => (i - 1 + services.length) % services.length);
  const next = () => setIndex((i) => (i + 1) % services.length);
  const goTo = (i: number) => setIndex(i);

  // Content mapping based on current image index:
  // indices 0 and 2 -> "Hotel Heaven" content
  // indices 1 and 3 -> "5 things to Enjoy in Ananya" content
  const isHotelHeaven = index === 0 || index === 2;
  const title = isHotelHeaven ? "Hotel Heaven" : "5 things to Enjoy in Ananya";
  const description = isHotelHeaven
    ? `Join Avalon Shores for a deep dive into hotel vlogging. Learn how to capture the perfect shot, review like a pro, and turn your travel experiences into captivating content. With insider tips and hands-on sessions, elevate your channel and share the art of hospitality.`
    : `Embark on a journey into the world of hotel vlogging at Avalon Shores. Discover the secrets to filming stunning visuals, crafting compelling reviews, and transforming your adventures into engaging stories. Gain expert advice and practical experience to enhance your channel and showcase the beauty of hospitality.`;

  return (
    <div className="hidden md:block">
      {/* Header: centered, now wider to match requested screenshot */}
      <div className="mx-auto w-[1440px] max-w-full 2xl:w-full py-12 px-8 flex flex-col items-center">
        <div className="w-full max-w-full mx-auto text-center">
          <h1
            className="text-[48px] mx-auto leading-tight"
            style={{
              fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
              color: "#3b2a1f",
              lineHeight: 1.1,
              fontWeight: 800,
            }}
          >
            Creators by the Coast
          </h1>
          <p
            className="text-[32px] mt-6 "
            style={{
              fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
              color: "#3b2a1f",
              lineHeight: 1.8,
              fontWeight: 700,
            
            }}
          >
            Creators by the Coast is a unique opportunity for content creators
            to immerse themselves in coastal luxury, enjoy exclusive
            experiences, and craft stories worth sharing. With tailored packages
            and access to our most scenic spaces, every moment is designed to
            spark inspiration. From sunrise views to curated dining, your stay
            becomes the perfect canvas for unforgettable content.
          </p>
        </div>
      </div>

      {/* Main slider + content */}
      <div className="mx-auto w-[1440px] max-w-full 2xl:w-full h-[900px] py-12 px-8">
        <div className="w-full gap-9 flex justify-between">
          {/* LEFT: image display (fixed width) */}
          <div style={{ width: 572.52 }} className="relative ">
            {services.map((s, i) => (
              <div
                key={i}
                className={`absolute inset-0 transition-all duration-400 ease-in-out`}
                style={{
                  width: 572.52,
                  height: 521.61,
                  opacity: i === index ? 1 : 0,
                  transform: `scale(${i === index ? 1 : 0.94})`,
                  pointerEvents: i === index ? "auto" : "none",
                }}
              >
                <div className="relative w-full h-full overflow-hidden rounded-[16px] shadow-lg">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    width={572.52}
                    height={521.61}
                    className="object-cover w-full h-full"
                    priority={i === index}
                  />

                  {/* youtube icon centered */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
                    <Image
                      src="/images/youtube.png"
                      alt="Play"
                      width={120}
                      height={80}
                      className="object-contain"
                    />
                    {/* vector on top of youtube */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                      <Image
                        src="/images/vector.png"
                        alt="Vector"
                        width={36}
                        height={36}
                        className="object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT: heading + text (flex-1) */}
          <div className="flex-1 pl-9 2xl:pl-54 pt-30">
            <h3
              style={navTextStyle}
              className="text-3xl md:text-4xl font-serif"
            >
              {title}
            </h3>

            <p
              className="mt-6 text-base md:text-lg"
              style={{
                fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
                color: "#3b2a1f",
                maxWidth: 920,
                lineHeight: 1.8,
                fontWeight: 500,
              }}
            >
              {description}
            </p>

            {/* indicator / controls */}
          </div>
        </div>
        {/* moved indicator/controls: centered beneath the two-column section */}
        <div className="mt-58 flex justify-center">
          <div className="flex items-center gap-6">
            {/* prev button */}
            <button
              onClick={prev}
              aria-label="Previous"
              className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <span className="text-[#4a3a2b] text-2xl select-none">‹</span>
            </button>

            {/* bullets */}
            <div className="flex items-center gap-3">
              {services.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to ${i + 1}`}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    i === index
                      ? "bg-[#4a3a2b] scale-100"
                      : "bg-[#A38F79] opacity-70"
                  }`}
                />
              ))}
            </div>

            {/* next button */}
            <button
              onClick={next}
              aria-label="Next"
              className="w-14 h-14 rounded-full bg-white shadow-md flex items-center justify-center"
            >
              <span className="text-[#4a3a2b] text-2xl select-none">›</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
