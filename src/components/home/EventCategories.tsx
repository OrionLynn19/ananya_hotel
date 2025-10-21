"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { ComponentPropsWithoutRef } from "react";

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
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 ${className}`} {...rest}>
      <header className="mx-auto max-w-3xl text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary">{heading}</h2>
        <p className="mt-4 text-lg leading-7 text-muted-foreground">{subheading}</p>
      </header>

      <div className="flex flex-nowrap justify-center gap-6 overflow-hidden">
        {items.map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </section>
  );
}

function Card({ title, blurb, href = "#", imgSrc, imgAlt }: Item) {
  return (
    <motion.div
      layout
      className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-lg h-[594px]"
      style={{ flex: "0 0 auto", flexBasis: "18%" }}
      initial="rest"
      animate="rest"
      whileHover="hover"
      variants={{
        rest: { scale: 1, flexBasis: "18%" },
        hover: { scale: 1.03, flexBasis: "26%" },
      }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
    >
      <Link href={href} aria-label={title} className="block h-full w-full focus:outline-none">
        {/* Image scales with hover */}
        <motion.div
          className="relative h-full w-full"
          variants={{ rest: { scale: 1 }, hover: { scale: 1.08 } }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <img src={imgSrc} alt={imgAlt} className="object-cover w-full h-full" />
        </motion.div>

        {/* Bottom overlay: auto-fit via padding + maxHeight (no jitter) */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 z-20 bg-black/55 backdrop-blur-sm text-white"
          variants={{
            rest: { paddingTop: 16, paddingBottom: 16 },
            hover: { paddingTop: 24, paddingBottom: 24 },
          }}
          transition={{ duration: 0.28, ease: "easeOut" }} 
        >
          <div className="flex flex-col items-center justify-center text-center px-6">
            <motion.h3
              className="text-3xl font-extrabold leading-tight tracking-wide text-white"
              variants={{ rest: { opacity: 1, y: 0 }, hover: { opacity: 1, y: 0 } }}
            >
              {title}
            </motion.h3>

            {/* Blurb container: doesn't affect layout at rest */}
            <motion.div
              className="overflow-hidden w-full"
              variants={{
                rest: { maxHeight: 0, marginTop: 0, opacity: 0, y: 6 },
                hover: { maxHeight: 112, marginTop: 8, opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.32, ease: "easeOut" }}
            >
              <p className="text-sm leading-6 text-white/90">{blurb}</p>
            </motion.div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
