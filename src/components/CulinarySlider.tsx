"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat, Poltawski_Nowy } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText?: string;
};

const slides: Slide[] = [
  {
    id: 1,
    title: "ANANADA Breakfast",
    description:
      "Start your day with our ANANADA breakfast buffet, featuring a wide selection of dishes from around the world. Enjoy fresh fruit, pastries, made-to-order omelets, and our signature waffles.",
    image: "/images/breakfast.jpg",
    buttonText: "Learn More",
  },
  {
    id: 2,
    title: "Buffet On The Shore",
    description:
      "Start your day with our ANANADA breakfast buffet, featuring a wide selection of dishes from around the world. Enjoy fresh fruit, pastries, made-to-order omelets, and our signature waffles.",
    image: "/images/buffett.jpg",
    buttonText: "Learn More",
  },
];

// counts split by breakpoint
const DOT_COUNT_DESKTOP = 5;
const DOT_COUNT_MOBILE = 4;

export default function CulinarySlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="bg-white text-[#463214] pt-10 md:pt-16">
      {/* Heading */}
      <div className="text-center mb-6 px-4 md:mb-10">
        <h2 className={`text-[28px] leading-tight mb-3 md:text-[40px] ${poltawskiNowy.className}`}>
          Culinary Experiences
        </h2>
        <p
          className={`text-[18px] leading-snug max-w-[32rem] mx-auto md:text-[32px] md:max-w-6xl ${poltawskiNowy.className}`}
        >
          Start your day with a bountiful breakfast and savor unique dining options throughout your stay.
        </p>
      </div>

      {/* Full-bleed slider */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="relative h-[420px] w-full overflow-hidden md:h-[540px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={slides[current].id}
              initial={{ opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={slides[current].image}
                alt={slides[current].title}
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-black/45 md:bg-gradient-to-r md:from-black/70 md:via-black/35 md:to-transparent" />

              {/* MOBILE CONTENT */}
              <div className="absolute inset-x-0 top-[50%] -translate-y-1/2 px-6 text-center text-white md:hidden">
                <h3 className={`text-[28px] mb-3 ${poltawskiNowy.className}`}>{slides[current].title}</h3>

                <div className="mx-auto mt-3 inline-block rounded-[15px] p-[0.5px] bg-gradient-to-r from-white/5 via-white/10 to-white/15 backdrop-blur-lg">
                  <button
                    className={`${poltawskiNowy.className} h-[45px] px-5 bg-[#FFFFFF]/2 border text-white backdrop-blur-lg rounded-[15px] text-[18px] font-semibold shadow-lg hover:bg-[#FFFFFF]/20 transition`}
                  >
                    {slides[current].buttonText ?? "Learn More"}
                  </button>
                </div>
              </div>

              {/* MOBILE controls */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-5 md:hidden">
                {/* prev */}
                <button
                  onClick={prevSlide}
                  className="w-12 h-12 flex items-center justify-center text-white hover:opacity-80 transition"
                  aria-label="Previous slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="m15 18-6-6 6-6" />
                  </svg>
                </button>

                <div className="flex items-center gap-3">
                  {Array.from({ length: DOT_COUNT_MOBILE }, (_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrent(idx % slides.length)}
                      className={`w-3.5 h-3.5 rounded-full transition ${
                        idx === current ? "bg-white shadow-md" : "bg-[#C69A7C] bg-opacity-80 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* next */}
                <button
                  onClick={nextSlide}
                  className="w-12 h-12 flex items-center justify-center text-white hover:opacity-80 transition"
                  aria-label="Next slide"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </button>
              </div>

              {/* DESKTOP CONTENT */}
              <div className="hidden md:block">
                <div className="absolute top-20 left-14 md:left-16 max-w-xl text-white drop-shadow-sm">
                  <h3 className={`text-4xl md:text-[40px] font-700 mb-5 leading-tight ${poltawskiNowy.className}`}>
                    {slides[current].title}
                  </h3>
                  <p
                    className={`text-sm md:text-[18px] font-600 md:text-base leading-relaxed ${montserrat.className}`}
                  >
                    {slides[current].description}
                  </p>
                </div>

                {/* controls */}
                <div className="absolute left-14 md:left-16 bottom-20 flex flex-col gap-10">
                  <div className="inline-block w-fit shrink-0 rounded-[25px] p-[0.5px] bg-gradient-to-r from-white/5 via-white/15 to-white/25 backdrop-blur-lg">
                    <button
                      className={`${poltawskiNowy.className} h-[60px] w-[180px] px-5 bg-[#ffffff0d] text-white backdrop-blur-xl rounded-[25px] md:text-[24px] font-semibold shadow-lg hover:bg-white/10 transition`}
                    >
                      {slides[current].buttonText ?? "Learn More"}
                    </button>
                  </div>


                  <div className="flex items-center gap-5">
                    <button
                      onClick={prevSlide}
                      className="w-[68px] h-[68px] flex items-center justify-center bg-white text-[#463214] rounded-full shadow-md border border-white/60 hover:scale-105 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m15 18-6-6 6-6" />
                      </svg>
                    </button>

                    <div className="flex items-center gap-3">
                      {Array.from({ length: DOT_COUNT_DESKTOP }, (_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setCurrent(idx % slides.length)}
                          className={`w-4 h-4 rounded-full transition ${
                            idx === current ? "bg-white shadow-md" : "bg-[#C69A7C] bg-opacity-80 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>

                    <button
                      onClick={nextSlide}
                      className="w-[68px] h-[68px] flex items-center justify-center bg-white text-[#463214] rounded-full shadow-md border border-white/60 hover:scale-105 transition"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="50"
                        height="50"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="m9 18 6-6-6-6" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
