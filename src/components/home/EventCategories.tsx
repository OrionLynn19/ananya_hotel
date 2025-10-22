"use client";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, ComponentPropsWithoutRef } from "react";
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

type Item = {
  title: string;
  blurb: string;
  href?: string;
  imgSrc: string;
  imgAlt: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  items?: Item[];
  className?: string;
} & ComponentPropsWithoutRef<"section">;

export default function EventCategories({
  heading = "From ‘I Do’ to Business Breakthroughs",
  subheading = "We host it all — weddings, social celebrations, and corporate events — with beachfront style and service that guarantees satisfaction.",
  items = [],
  className = "",
  ...rest
}: Props) {
  const [index, setIndex] = useState(0);
  const total = items.length;
  const go = (i: number) => setIndex(((i % total) + total) % total);
  const prev = () => go(index - 1);
  const next = () => go(index + 1);

  return (
    <section className={`mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-16 ${className}`} {...rest}>
      {/* Heading */}
      <header className="text-center mb-8 md:mb-12">
        <h2
          className={`text-[28px] leading-tight font-[700] text-[#463214] md:text-[48px] md:leading-[54px] ${poltawskiNowy.className}`}
        >
          {heading}
        </h2>
        <p
          className={`mt-3 text-[16px] leading-7 font-[600] text-[#463214] md:mt-4 md:text-[32px] md:leading-[40px] ${poltawskiNowy.className}`}
        >
          {subheading}
        </p>
      </header>

      {/* ----- MOBILE VIEW ----- */}
      <div className="md:hidden">
        <div className="relative mx-auto w-full max-w-[700px]">
          <AnimatePresence mode="wait">
            {total > 0 && (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-2xl shadow-xl ring-1 ring-black/5 overflow-hidden"
              >
                {/* Image with overlay */}
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    fill
                    src={items[index].imgSrc}
                    alt={items[index].imgAlt}
                    className="object-cover"
                    priority
                  />
                  {/* black overlay */}
                  <div className="absolute inset-0 bg-black/40 z-10" />

                  {/* text overlay */}
                  <div className="absolute inset-x-0 bottom-0 z-20 bg-black/35 backdrop-blur-xs text-white box-border px-6 py-8 min-h-[140px]">
                    <h3
                      className={`text-[26px] text-center font-extrabold leading-tight tracking-wide mb-3 ${poltawskiNowy.className}`}
                    >
                      {items[index].title}
                    </h3>
                    <p
                      className={`text-[15px] leading-6 text-white/90 text-left ${montserrat.className}`}
                    >
                      {items[index].blurb}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Pager */}
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
                    i === index ? "bg-[#6A512E]" : "bg-[#CFC8BE]"
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
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden md:flex md:flex-nowrap md:justify-center md:gap-6 md:overflow-hidden">
        {items.map((item, i) => (
          <DesktopCard key={i} {...item} />
        ))}
      </div>
    </section>
  );
}

/* Desktop Hover Card */
function DesktopCard({ title, blurb, href = "#", imgSrc, imgAlt }: Item) {
  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-lg h-[594px]"
      style={{ flex: "0 0 auto", flexBasis: "22%" }}
      animate="rest"
      whileHover="hover"
      variants={{
        rest: { scale: 1, flexBasis: "22%" },
        hover: { scale: 1.03, flexBasis: "30%" },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <Link href={href} aria-label={title} className="block h-full w-full focus:outline-none">
        <motion.div
          className="relative h-full w-full"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="absolute inset-0 bg-black/40 z-10" />
          <Image fill src={imgSrc} alt={imgAlt} className="object-cover w-full h-full" />
        </motion.div>

        <motion.div
          className="absolute inset-x-0 bottom-0 z-20 bg-black/35 backdrop-blur-xs text-white box-border"
          variants={{
            rest: { paddingTop: 24, paddingBottom: 24 },
            hover: { paddingTop: 32, paddingBottom: 32 },
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <div className="w-full max-w-[520px] mx-auto px-8">
            <motion.h3
              className={`text-[28px] text-center font-extrabold leading-tight tracking-wide bg-gradient-to-b from-[#FCF9F6] to-[#969492] bg-clip-text text-transparent ${poltawskiNowy.className}`}
              variants={{
                rest: {
                  backgroundImage: "linear-gradient(to bottom,#FCF9F6,#969492)",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                },
                hover: { backgroundImage: "none", color: "#ffffff" },
              }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {title}
            </motion.h3>

            <motion.div
              className="overflow-hidden w-full"
              variants={{
                rest: { maxHeight: 0, marginTop: 0, opacity: 0, y: 6 },
                hover: { maxHeight: 180, marginTop: 16, opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              <p className={`text-base leading-6 text-white/90 text-left ${montserrat.className}`}>
                {blurb}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
