"use client";
import React from "react";
import Image from "next/image";

export default function GalleryHero() {
  return (
    <section
      className="relative w-full h-[568px] md:h-[1024px] overflow-hidden text-[#FCF9F6]"
      aria-label="Gallery hero"
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src="/Images/gallery/hero-gallery.png"
          alt="Ananya gallery hero"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(179.19deg, rgba(0, 0, 0, 0.08) 22.84%, rgba(0, 0, 0, 0.32) 99.3%)",
        }}
      />

      <div className="absolute z-10 left-1/2 -translate-x-1/2 top-[422px] md:top-[639px] w-full">
        <div className="flex flex-col items-center text-center gap-3 w-full max-w-[320px] box-border mx-auto md:gap-8 md:max-w-[1216px]">
          <h1 className="m-0 text-[18px] md:text-[48px] leading-[100%] font-poltawski font-bold text-[#FCF9F6] w-[288px] h-[23px] md:w-[1116px] md:h-[62px]">
            Gallery
          </h1>
          <p className="m-0 text-[14px] md:text-[32px] leading-[100%] font-poltawski font-semibold text-[#FCF9F6] w-[288px] h-9 md:w-[1116px] md:h-[42px]">
            A glimpse of Ananya’s charm — from ocean views to tranquil spaces.
          </p>
        </div>
      </div>
    </section>
  );
}
