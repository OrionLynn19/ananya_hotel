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

const DOT_COUNT = 5; 

export default function CulinarySlider() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => setCurrent((p) => (p + 1) % slides.length);
  const prevSlide = () => setCurrent((p) => (p - 1 + slides.length) % slides.length);

  return (
    <section className="bg-white text-[#463214] pt-16">
      {/* Heading */}
      <div className="text-center mb-10 px-4">
        <h2 className={`text-[40px] font-700 mb-4 ${poltawskiNowy.className}`}>Culinary Experiences</h2>
        <p className={`text-[32px] max-w-6xl font-600 mx-auto ${poltawskiNowy.className}`}>
          Start your day with a bountiful breakfast and savor unique dining options throughout your stay.
        </p>
      </div>

      {/* Slider */}
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
        <div className="relative h-[540px] w-full overflow-hidden">
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
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />

              {/* title & desc */}
              <div className="absolute top-20 left-14 md:left-16 max-w-xl text-white drop-shadow-sm">
                <h3 className={`text-4xl md:text-[40px] font-700 mb-5 leading-tight ${poltawskiNowy.className}`}>
                  {slides[current].title}
                </h3>
                <p className={`text-sm md:text-[18px] font-600 md:text-base leading-relaxed ${montserrat.className}`}>
                  {slides[current].description}
                </p>
              </div>

              {/* CTA + controls */}
              <div className="absolute left-14 md:left-16 bottom-20 flex flex-col gap-10">
                {/* button */}
                <button className={`${poltawskiNowy.className} h-[60px] w-[180px] px-5 bg-[#FFFFFF]/2 border-1 text-white backdrop-blur-xl rounded-[25px] md:text-[24px] font-semibold shadow-lg hover:bg-[#FFFFFF]/5 transition`}>
                  {slides[current].buttonText ?? "Learn More"}
                </button>

                {/* controls row */}
                <div className="flex items-center gap-5">
                  {/* prev */}
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

                  {/* dots */}
                  <div className="flex items-center gap-3">
                    {Array.from({ length: DOT_COUNT }, (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrent(idx % slides.length)}
                        className={`w-4 h-4 rounded-full transition ${
                          idx === current
                            ? "bg-white shadow-md"
                            : "bg-[#C69A7C] bg-opacity-80 hover:bg-white/80"
                        }`}
                      />
                    ))}
                  </div>

                  {/* next */}
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
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
