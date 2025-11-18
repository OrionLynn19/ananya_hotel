// components/FAQHero.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

export default function FAQHero() {
  return (
    
    <section className="relative w-full overflow-hidden" style={{ paddingTop: "71.111%" }}>
      
      <Image
        src="/Images/Contact.png"            
        alt="Beach Resort Sunset"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Top haze to blend under navbar */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/15 to-black/55 pointer-events-none" />

      {/* Content – pushed lower to match your ref */}
      <div className="absolute inset-0 flex items-end justify-center px-4">
        <div className="w-full text-center max-w-[1100px] mx-auto pb-16 md:pb-24 lg:pb-28">
          <h1 className="font-serif text-white font-semibold leading-tight
                         text-[30px] md:text-[44px] lg:text-[52px] drop-shadow-[0_3px_12px_rgba(0,0,0,0.65)]">
            Frequently Asked Questions
          </h1>

          <p className="mt-3 md:mt-4 text-white/90 text-[15px] md:text-[18px] lg:text-[20px]
                        drop-shadow-[0_2px_8px_rgba(0,0,0,0.55)]">
            Everything U need to know about our beach paradise.
          </p>

          <Link
            href="/discover"
            className="inline-block mt-6 md:mt-8 px-7 py-3 md:px-8 md:py-3.5
                        rounded-[12px] text-white text-[14px] md:text-[15px] font-medium
                        border border-white/35 bg-white/10 backdrop-blur-sm
                        hover:bg-white/20 hover:border-white/55
                        shadow-[0_6px_20px_rgba(0,0,0,0.35)] transition"
            >
            Get Direction
            </Link>

        </div>
      </div>
    </section>
  );
}
