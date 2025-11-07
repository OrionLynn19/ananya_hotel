"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Montserrat, Poltawski_Nowy } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type Benefit = {
  id: string;
  title: string;
  description: string;
  image: string;
};

const BENEFITS: Benefit[] = [
  {
    id: "free-stays",
    title: "Free Stays & Dining",
    description:
      "Enjoy complimentary stays and exquisite dining experiences at Avalon Shores. Indulge in luxury while we take care of every detail.",
    image: "/images/why-join/free-stays.jpg",
  },
  {
    id: "priority-access",
    title: "Priority Access",
    description:
      "Be the first to enjoy exclusive events, launches, and private experiences curated just for members.",
    image: "/images/why-join/priority-access.jpg",
  },
  {
    id: "vip-perks",
    title: "VIP Perks",
    description:
      "From spa credits to late check-outs, unlock elevated privileges every time you stay with us.",
    image: "/images/why-join/vip-perks.jpg",
  },
];

export default function OurService3A() {
  const [activeId, setActiveId] = useState<Benefit["id"]>("free-stays");

  const activeIndex = BENEFITS.findIndex((b) => b.id === activeId);

  const handlePrev = () => {
    const prevIndex = (activeIndex - 1 + BENEFITS.length) % BENEFITS.length;
    setActiveId(BENEFITS[prevIndex].id);
  };

  const handleNext = () => {
    const nextIndex = (activeIndex + 1) % BENEFITS.length;
    setActiveId(BENEFITS[nextIndex].id);
  };

  return (
    <section className="w-full bg-white py-16 md:py-20">
      <div className="mx-auto max-w-6xl px-4 md:px-8">
        <h2
          className={`mb-7 text-center text-[18px] md:text-[48px] font-bold text-[#463214] ${poltawskiNowy.className}`}
        >
          Why Join With Us?
        </h2>

        {/* Cards */}
        <motion.div
            layout
            className="flex flex-col items-center gap-4 md:flex-row md:items-stretch"
            transition={{ layout: { duration: 0.35, type: "spring" } }}
        >

          {BENEFITS.map((item) => {
            const isActive = item.id === activeId;

            return (
              <motion.button
                key={item.id}
                type="button"
                layout
                onFocus={() => setActiveId(item.id)}
                onClick={() => setActiveId(item.id)}
                transition={{ layout: { duration: 0.35, type: "spring" } }}
                className={`relative h-[386px] w-[320px] overflow-hidden rounded-[18px]
                  md:h-[594px] md:w-[600px]
                  shadow-[0_18px_40px_rgba(0,0,0,0.25)]
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C18B4A]
                  ${
                    isActive
                      ? "block md:flex-[2]" 
                      : "hidden md:block md:flex-[1]" 
                  }
                `}
              >
                {/* Background image */}
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 33vw, 100vw"
                  priority={item.id === "free-stays"}
                />

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.6)] via-[rgba(0,0,0,0.1)] to-transparent" />

                {/* Bottom black overlay panel */}
                <motion.div
                  layout
                  className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end"
                >
                  <div
                    className={`w-full bg-black/25 backdrop-blur-sm ${
                      isActive
                        ? "px-6 pb-6 pt-4 text-left md:px-8 md:pb-7 md:pt-5"
                        : "px-4 pb-4 pt-3 text-center md:px-5 md:pb-5 md:pt-4 md:text-left"
                    }`}
                  >
                    <motion.h3
                      layout
                      className={`${poltawskiNowy.className} text-white text-center font-bold text-[18px] md:text-[40px]`}
                    >
                      {item.title}
                    </motion.h3>

                    {isActive && (
                      <motion.p
                        layout
                        className={`mt-3 font-medium text-[12px] md:text-base md:text-[18px] leading-relaxed text-white/80 ${montserrat.className}`}
                      >
                        {item.description}
                      </motion.p>
                    )}
                  </div>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Mobile-only slider controls */}
        <div className="mt-6 flex items-center justify-center gap-6 md:hidden">
          {/* Prev */}
          <button
            type="button"
            onClick={handlePrev}
            aria-label="Previous benefit"
            className="text-[#463214] text-3xl font-bold leading-none"
          >
            &#8249;
          </button>

          {/* Dots */}
          <div className="flex items-center gap-3">
            {BENEFITS.map((item) => {
              const isActiveDot = item.id === activeId;
              return (
                <button
                  key={item.id}
                  type="button"
                  aria-label={item.title}
                  onClick={() => setActiveId(item.id)}
                  className={`h-3 w-3 rounded-full transition-all duration-200 ${
                    isActiveDot ? "bg-[#463214]" : "bg-[#C8C2B6]"
                  }`}
                />
              );
            })}
          </div>

          {/* Next */}
          <button
            type="button"
            onClick={handleNext}
            aria-label="Next benefit"
            className="text-[#463214] text-3xl font-bold leading-none"
          >
            &#8250;
          </button>
        </div>
      </div>
    </section>
  );
}
