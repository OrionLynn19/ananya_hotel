"use client";

import CustomerCard from "./CustomerCard";
import { customers } from "./customersData";

export default function CustomerSection() {
  // We duplicate the data so it can loop seamlessly
  const lane = [...customers, ...customers];

  return (
    <section className="w-full bg-[#FFFCF1] text-[#3b2a16] py-12 md:py-16 overflow-hidden">
      {/* Heading */}
      <div className="px-4 flex flex-col items-center text-center">
        <div className="w-full max-w-[320px] md:max-w-none">
          <h2 className="text-[15px] font-semibold text-[#3b2a16] md:text-[20px] lg:text-[24px]">
            Waves of Happy Guests
          </h2>

          <p className="mt-2 text-[12px] leading-relaxed text-[#4a3a24] md:text-[14px] md:mt-3">
            See what travelers loved about their stay by the sea.
          </p>
        </div>
      </div>

      {/* Marquee row */}
      <div className="relative mt-10 md:mt-12 w-full overflow-hidden">
        {/* gradient fade edges for elegance */}
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-[linear-gradient(to_right,#FFFCF1_0%,rgba(255,252,241,0)_100%)] z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-[linear-gradient(to_left,#FFFCF1_0%,rgba(255,252,241,0)_100%)] z-20" />

        {/* The track that moves */}
        <div
          className="flex gap-6 md:gap-10 animate-[marquee_20s_linear_infinite]"
          style={{
            // we use CSS var fallback so Tailwind doesn't purge the keyframes
            minWidth: "max-content",
          }}
        >
          {lane.map((c, i) => (
            <div
              key={i}
              className="pt-10 pb-12 flex justify-center items-start"
              style={{
                width: "260px",
              }}
            >
              <CustomerCard item={c} />
            </div>
          ))}
        </div>
      </div>

      {/* Custom keyframes (inline in a style tag) */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
