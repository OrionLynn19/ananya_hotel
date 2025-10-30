"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CtaButton from "./HeroButton";

export default function Hero() {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const baseHeight = 1024;
    const minScale = 0.7;

    function updateScale() {
      if (typeof window === "undefined") return;
      const w = window.innerWidth || 0;
      if (w < 768) {
        setScale(1);
        return;
      }
      const h = window.innerHeight || 0;
      if (h >= baseHeight) {
        setScale(1);
        return;
      }
      const aggressiveOffset = 94;
      const adjusted = Math.max(0, h - aggressiveOffset);
      const s = Math.max(minScale, adjusted / baseHeight);
      setScale(Number(s.toFixed(3)));
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <>
      <section className="relative w-full h-[calc(100vh-0px)] flex items-center justify-center overflow-visible">
        <video
          className="absolute top-1/2 left-1/2 h-full min-w-full w-auto -translate-x-1/2 -translate-y-1/2 object-cover z-0"
          autoPlay
          muted
          loop
          playsInline
          poster="/images/videoImage.png"
          aria-hidden="true"
        >
          <source src="/videos/Home-Hero.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="absolute inset-0 bg-white/25 z-10" />

        <div
          className={
            "hero-content absolute z-20 left-1/2 top-[67.4%] md:top-[61.5%] flex flex-col items-center justify-center text-center gap-3 md:gap-8 max-w-[190.93px] md:max-w-[744px] max-h-[90vh]"
          }
          style={{
            transform: `translateX(-50%) scale(${scale})`,
            transformOrigin: "top center",
            transition: "transform 160ms ease",
          }}
        >
          <div className="flex flex-col items-center w-[190.93px] h-[105.33px] md:h-[106.13px]">
            <Image
              src="/images/logo.png"
              alt="Ananya Hotel Logo"
              width={190.93}
              height={106.13}
              className="w-[190.93px] h-[105.33px] md:h-[106.13px]"
            />
          </div>

          <h1 className="hidden md:block text-[#463214] leading-[100%] w-full md:w-[744px] md:h-[62px] font-poltawski font-bold text-[48px]">
            Your Oceanfront Paradise Awaits
          </h1>

          <CtaButton>Discover Our Rooms</CtaButton>
        </div>

        <div
          className="hidden md:block absolute pl-[53.43px]"
          style={{
            width: "155.14px",
            height: "0px",
            top: "100%",
            left: "50%",
            borderWidth: "3px",
            borderStyle: "solid",
            borderImageSource:
              "linear-gradient(-90deg, rgba(70, 50, 20, 0) 0%, #463214 100%)",
            borderImageSlice: 1,
            transform: "translate(-50%,-50%) rotate(-90deg)",
            transformOrigin: "center",
            opacity: 1,
          }}
        />
      </section>
    </>
  );
}
