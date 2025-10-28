"use client";
import React from "react";
import Image from "next/image";
import CtaButton from "./HeroButton";

export default function Hero() {
  return (
    <>
      <section className="relative w-full h-[calc(100vh-0px)] max-h-[568px] md:max-h-[1024px] flex items-center justify-center">
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
            "hero-content absolute z-20 left-1/2 -translate-x-1/2 top-[383px] md:translate-y-0 md:top-[clamp(383px,55vh,630px)] flex flex-col items-center justify-center text-center gap-3 md:gap-8 max-w-[190.93px] md:max-w-[744px]"
          }
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
          className="hidden md:block absolute"
          style={{
            width: "155.14px",
            height: "0px",
            bottom: "-1.5px",
            left: "calc(50% - 77.5677795410157px)",
            borderWidth: "3px",
            borderStyle: "solid",
            borderImageSource:
              "linear-gradient(-90deg, rgba(70, 50, 20, 0) 0%, #463214 100%)",
            borderImageSlice: 1,
            transform: "rotate(-90deg)",
            opacity: 1,
          }}
        />
      </section>
    </>
  );
}
