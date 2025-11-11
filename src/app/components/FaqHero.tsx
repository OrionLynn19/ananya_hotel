"use client";

import Image from "next/image";
import heroImg from "@/public/images/Contact.png";

export default function FaqHero() {
  return (
    <section
      className="relative isolate w-full min-h-[72vh] md:min-h-[78vh] lg:min-h-[86vh]"
      aria-label="FAQ Hero"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src={heroImg}
          alt="Beach resort at sunset"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Top haze to blend with navbar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black/35 via-black/20 to-transparent" />

      {/* Bottom vignette for text readability */}
      <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_50%_70%,rgba(0,0,0,0.25),rgba(0,0,0,0.55))]" />

      {/* Content */}
      <div className="relative mx-auto flex h-full max-w-5xl flex-col items-center justify-center px-6 text-center">
        <h1 className="text-[30px] leading-tight text-white drop-shadow md:text-[40px] lg:text-[52px]">
          Frequently Asked Questions
        </h1>

        <p className="mt-4 max-w-3xl text-base text-white/90 md:text-lg">
          Everything U need to know about our beach paradise.
        </p>

        <button
          type="button"
          className="mt-8 inline-flex items-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-medium text-white backdrop-blur transition hover:bg-white/20 md:text-base md:px-7 md:py-3.5"
        >
          Get Direction
        </button>
      </div>
    </section>
  );
}
