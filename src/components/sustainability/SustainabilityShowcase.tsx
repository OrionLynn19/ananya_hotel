"use client";

import Image from "next/image";
import { useCallback, useId, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Montserrat, Poltawski_Nowy } from "next/font/google";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });
const poltawskiNowy = Poltawski_Nowy({ subsets: ["latin"], weight: ["400", "600", "700"], display: "swap" });

export type SustainabilityItem = {
  title: string;
  focusTitle?: string;
  blurb: string;
  imgSrc: string;
  imgAlt: string;
  focus?: "object-top" | "object-bottom" | "object-left" | "object-right" | "object-center";
};

type Props = {
  items: SustainabilityItem[];
  className?: string;
  cardHeightPx?: number;
  gapClass?: string;
};

const RADIUS = "rounded-[28px]";
const DESC_TARGET_HEIGHT = 96; 

export default function SustainabilityShowcase({
  items,
  className = "",
  cardHeightPx = 594,
  gapClass = "md:gap-8",
}: Props) {
  const [active, setActive] = useState(0);
  const gid = useId();

  const onArrowNav = useCallback(
    (e: React.KeyboardEvent<HTMLButtonElement>, idx: number) => {
      if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
      e.preventDefault();
      const dir = e.key === "ArrowRight" ? 1 : -1;
      const next = (idx + dir + items.length) % items.length;
      setActive(next);
      (document.getElementById(`${gid}-card-${next}`) as HTMLButtonElement | null)?.focus();
    },
    [items.length, gid]
  );

  return (
    <section className={`w-full ${className}`}>
      <div className={`hidden md:flex md:justify-center ${gapClass}`}>
        {items.map((item, i) => {
          const isActive = i === active;
          const focusCls = item.focus ?? "object-center";

          return (
            <motion.div
              key={i}
              className={`relative overflow-hidden ${RADIUS} ring-1 ring-black/5 shadow-lg`}
              style={{ height: `${cardHeightPx}px`, flexBasis: 0, minWidth: 0 }}
              animate={{ flexGrow: isActive ? 2.2 : 1.3 }}
              initial={false}
              transition={{ type: "spring", stiffness: 240, damping: 26 }}
            >
              <button
                id={`${gid}-card-${i}`}
                role="tab"
                aria-selected={isActive}
                aria-controls={`${gid}-panel-${i}`}
                onClick={() => setActive(i)}
                onFocus={() => setActive(i)}
                onKeyDown={(e) => onArrowNav(e, i)}
                className="group absolute inset-0 z-10 flex h-full w-full flex-col justify-end focus:outline-none focus-visible:ring-4 focus-visible:ring-[#463214]/30"
              >
                <Image
                  fill
                  src={item.imgSrc}
                  alt={item.imgAlt}
                  className={`object-cover ${focusCls}`}
                  sizes="(min-width: 1024px) 33vw, 100vw"
                  priority={i === 0}
                />

                <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10">
                  <motion.div className="bg-black/50 backdrop-blur-[1px]" layout transition={{ type: "spring", stiffness: 220, damping: 28 }}>
                    <div className="mx-auto w-full max-w-[560px] px-8 py-6">
                      <div className="relative overflow-hidden min-h-[36px]">
                        <AnimatePresence mode="wait" initial={false}>
                          {isActive ? (
                            <motion.h3
                              key="title-active"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className={`relative text-[32px] leading-snug font-[800] tracking-wide text-white text-left md:text-center ${poltawskiNowy.className}`}
                            >
                              {item.focusTitle || item.title}
                            </motion.h3>
                          ) : (
                            <motion.h3
                              key="title-inactive"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className={`relative text-[32px] leading-snug font-[700] tracking-wide text-white text-left md:text-center ${poltawskiNowy.className}`}
                            >
                              {item.title}
                            </motion.h3>
                          )}
                        </AnimatePresence>
                      </div>

                      <motion.div
                        className="relative mt-3 overflow-hidden"
                        animate={{ height: isActive ? DESC_TARGET_HEIGHT : 0 }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                      >
                        <AnimatePresence initial={false} mode="wait">
                          {isActive && (
                            <motion.p
                              id={`${gid}-panel-${i}`}
                              role="tabpanel"
                              aria-labelledby={`${gid}-card-${i}`}
                              key="desc"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                              className={`text-base leading-6 text-white/90 text-left ${montserrat.className}`}
                              style={{
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {item.blurb}
                            </motion.p>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              </button>
            </motion.div>
          );
        })}
      </div>

      <div className="md:hidden space-y-7">
        {items.map((item, i) => (
          <div key={i} className={`relative overflow-hidden ${RADIUS} ring-1 ring-black/5 shadow-lg`}>
            <div className="relative w-full aspect-[3/4]">
              <Image
                fill
                src={item.imgSrc}
                alt={item.imgAlt}
                className={`object-cover ${item.focus ?? "object-center"}`}
                priority={i === 0}
              />
            </div>
            <div className="bg-black/50 text-white px-6 py-6">
              <h3 className={`text-[28px] font-[800] leading-tight tracking-wide ${poltawskiNowy.className}`}>
                {item.title}
              </h3>
              <p
                className={`mt-3 text-[15px] leading-6 text-white/90 ${montserrat.className}`}
                style={{
                  display: "-webkit-box",
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                }}
              >
                {item.blurb}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
