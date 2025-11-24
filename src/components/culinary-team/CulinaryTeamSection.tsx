"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChefCard, { Chef } from "./ChefCard";
import { Montserrat, Poltawski_Nowy } from "next/font/google";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

const chefs: Chef[] = [
  {
    id: "joseph",
    name: "Chef Joseph",
    description:
      "Chef Joseph crafts unforgettable culinary experiences. With a focus on local ingredients and innovative techniques, he brings a unique flavor to every event.",
    image: "/images/chef-joseph.jpg",
  },
  {
    id: "xua",
    name: "Chef Xua",
    description:
      "Chef Xua crafts unforgettable culinary experiences. With a focus on local ingredients and innovative techniques, he brings a unique flavor to every event.",
    image: "/images/chef-xua.jpg",
  },
  {
    id: "nat",
    name: "Chef Nat",
    description:
      "Chef Nat crafts unforgettable culinary experiences. With a focus on local ingredients and innovative techniques, he brings a unique flavor to every event.",
    image: "/images/chef-nat.jpg",
  },
];

export default function CulinaryTeamSection() {
  // desktop active
  const [activeId, setActiveId] = useState<string | null>(null);

  // mobile slider
  const [mobileIndex, setMobileIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);

  const handlePrev = () => {
    setDirection(-1);
    setMobileIndex((prev) => (prev === 0 ? chefs.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setMobileIndex((prev) => (prev === chefs.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto w-full flex flex-col items-center gap-10">
        {/* heading */}
        <div className={`text-center ${poltawskiNowy.className} max-w-6xl px-6`}>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[#463214]">
            Our Culinary Team
          </h2>
          <p className="mt-4 font-semibold md:text-[32px] text-[#463214]">
            Get to know the talented chefs dedicated to making your dining experience unforgettable.
          </p>
        </div>

        {/* MOBILE */}
        <div className="w-full flex flex-col items-center gap-5 md:hidden px-6">
          <div className="w-full relative h-[370px] overflow-hidden">
            <AnimatePresence initial={false} custom={direction}>
              {chefs.map((chef, index) =>
                index === mobileIndex ? (
                  <motion.div
                    key={chef.id}
                    custom={direction}
                    variants={{
                      enter: (dir: 1 | -1) => ({
                        x: dir === 1 ? 40 : -40,
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                      }),
                      center: {
                        x: 0,
                        opacity: 1,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                      },
                      exit: (dir: 1 | -1) => ({
                        x: dir === 1 ? -40 : 40,
                        opacity: 0,
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                      }),
                    }}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{ duration: 0.22, ease: "easeOut" }}
                  >
                    <ChefCard
                      chef={chef}
                      isActive={true}
                      onActivate={() => {}}
                      onDeactivate={() => {}}
                      variant="mobile"
                    />
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* controls */}
          <div className="flex items-center gap-6 mt-2">
            {/* left arrow */}
            <button
              onClick={handlePrev}
              className="text-[#79551B] hover:text-[#4F360F] transition"
              aria-label="Previous chef"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* dots */}
            <div className="flex items-center gap-3">
              {chefs.map((chef, index) => (
                <button
                  key={chef.id}
                  onClick={() => {
                    setDirection(index > mobileIndex ? 1 : -1);
                    setMobileIndex(index);
                  }}
                  className={`h-[14px] w-[14px] rounded-full transition ${
                    index === mobileIndex ? "bg-[#4F360F]" : "bg-[#C4BEAF]"
                  }`}
                  aria-label={`Go to ${chef.name}`}
                />
              ))}
            </div>

            {/* right arrow */}
            <button
              onClick={handleNext}
              className="text-[#79551B] hover:text-[#4F360F] transition"
              aria-label="Next chef"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="hidden md:flex md:flex-row md:justify-center w-full gap-5">
          {chefs.map((chef) => (
            <ChefCard
              key={chef.id}
              chef={chef}
              isActive={activeId === chef.id}
              onActivate={() => setActiveId(chef.id)}
              onDeactivate={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
