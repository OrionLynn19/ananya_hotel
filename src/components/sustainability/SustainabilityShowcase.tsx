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
  cardWidthPx?: number;
  gapClass?: string;
};

const RADIUS = "rounded-[28px]";
const DESC_TARGET_HEIGHT = 96;

const EMOJIS = ["🌱", "🌍", "🌊"];
function splitFocusTitle(ft?: string) {
  if (!ft) return { text: "", emoji: "" };
  for (const e of EMOJIS) {
    if (ft.includes(e)) return { text: ft.replace(e, "").trim(), emoji: e };
  }
  return { text: ft, emoji: "" };
}

export default function SustainabilityShowcase({
  items,
  cardHeightPx = 550,
  cardWidthPx = 370,
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
    <section className={`w-full`}>
      <div className={`hidden md:flex md:justify-between md:gap-3`}>
        {items.map((item, i) => {
          const isActive = i === active;
          const focusCls = item.focus ?? "object-center";

          const { text: focusText, emoji: focusEmoji } = splitFocusTitle(item.focusTitle);

          return (
            <motion.div
              key={i}
              className={`relative overflow-hidden ${RADIUS} ring-1 ring-black/5 shadow-lg`}
              style={{
                height: `${cardHeightPx}px`,
                flex: "0 0 auto",
              }}
              animate={{
                width: isActive ? cardWidthPx + 100 : cardWidthPx,
              }}
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
                  <motion.div
                    className="bg-black/50 backdrop-blur-[1px]"
                    layout
                    transition={{ type: "spring", stiffness: 220, damping: 28 }}
                  >
                    <div className="mx-auto w-full px-8 pt-4 pb-5">
                      <div className="relative overflow-hidden min-h-[36px]">
                        <AnimatePresence mode="wait" initial={false}>
                          {isActive ? (
                            <motion.h3
                              key="title-active"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className={`relative text-[32px] font-[700] text-left whitespace-nowrap ${poltawskiNowy.className}`}
                            >
                              <span className="text-white">
                                {focusText || item.title}
                              </span>
                              {focusEmoji && (
                                <span className="ml-2 text-white align-[-2px]">{focusEmoji}</span>
                              )}
                            </motion.h3>
                          ) : (
                            <motion.h3
                              key="title-inactive"
                              initial={{ opacity: 0, y: 12 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -12 }}
                              transition={{ duration: 0.35, ease: "easeOut" }}
                              className={`relative text-[32px] font-[700] text-center whitespace-nowrap ${poltawskiNowy.className}`}
                            >
                              <span className="bg-gradient-to-b from-[#FCF9F6] to-[#969492] bg-clip-text text-transparent [-webkit-text-fill-color:transparent] [-webkit-background-clip:text]">
                                {item.title}
                              </span>
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
                                overflow: "visible",
                                display: "block",
                                WebkitLineClamp: "unset",
                                WebkitBoxOrient: "unset",
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

        <div className="md:hidden px-10"> 
        {(() => {
            const [mIndex, setMIndex] = useState(0);
            const total = items.length;
            const go = (i: number) => setMIndex(((i % total) + total) % total);
            const prev = () => go(mIndex - 1);
            const next = () => go(mIndex + 1);

            return (
            <div className="w-full">
                <div className={`relative mx-auto w-full ${RADIUS} overflow-hidden ring-1 ring-black/5 shadow-lg`}>
                <AnimatePresence mode="wait" initial={false}>
                    {total > 0 && (
                    <motion.div
                        key={mIndex}
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -40 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        className="relative"
                    >
                        <motion.div
                        className="relative w-full aspect-[3/4] overflow-hidden"
                        drag="x"
                        dragElastic={0.12}
                        dragConstraints={{ left: 0, right: 0 }}
                        onDragEnd={(_, info) => {
                            const T = 70;
                            if (info.offset.x < -T) next();
                            if (info.offset.x > T) prev();
                        }}
                        >
                        <Image
                            fill
                            priority
                            src={items[mIndex].imgSrc}
                            alt={items[mIndex].imgAlt}
                            className={`object-cover ${items[mIndex].focus ?? "object-center"}`}
                        />

                        <div className="absolute inset-x-0 bottom-0 z-20 bg-black/55 backdrop-blur-[1px] px-5 py-6">
                            <h3
                            className={`text-[14px] font-[600] text-left text-white ${poltawskiNowy.className}`}
                            >
                            {items[mIndex].title}
                            </h3>
                            <p
                            className={`mt-2 text-[12px] font-[500] text-white/90 text-left ${montserrat.className}`}
                            >
                            {items[mIndex].blurb}
                            </p>
                        </div>
                        </motion.div>
                    </motion.div>
                    )}
                </AnimatePresence>
                </div>

                {/* Pagination + arrows */}
                <div className="mt-6 flex items-center justify-center gap-6">
                <button
                    onClick={prev}
                    aria-label="Previous"
                    className="text-[#6A512E] text-[28px] active:scale-95"
                >
                    ‹
                </button>

                <div className="flex items-center gap-3">
                    {Array.from({ length: total }).map((_, i) => (
                    <button
                        key={i}
                        onClick={() => go(i)}
                        aria-label={`Go to slide ${i + 1}`}
                        className={`h-4 w-4 rounded-full transition ${
                        i === mIndex ? "bg-[#6A512E]" : "bg-[#CFC8BE]"
                        }`}
                    />
                    ))}
                </div>

                <button
                    onClick={next}
                    aria-label="Next"
                    className="text-[#6A512E] text-[28px] active:scale-95"
                >
                    ›
                </button>
                </div>
            </div>
            );
        })()}
        </div>


    </section>
  );
}
