"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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

export type Chef = {
  id: string;
  name: string;
  description: string;
  image: string;
};

type ChefCardProps = {
  chef: Chef;
  isActive: boolean;
  onActivate: () => void;
  onDeactivate: () => void;
  // new: to force mobile style
  variant?: "desktop" | "mobile";
};

export default function ChefCard({
  chef,
  isActive,
  onActivate,
  onDeactivate,
  variant = "desktop",
}: ChefCardProps) {
  // desktop layout (unchanged)
  if (variant === "desktop") {
    return (
      <motion.div
        layout
        onMouseEnter={onActivate}
        onMouseLeave={onDeactivate}
        onClick={onActivate}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className={`
          relative rounded-[16px] overflow-hidden flex-shrink-0 cursor-pointer
          ${isActive ? "w-[700px] h-[594px] z-10" : "w-[236px] h-[594px]"}
        `}
      >
        {/* image */}
        <motion.div
          className="absolute inset-0"
          animate={{ scale: isActive ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <Image
            src={chef.image ?? "/placeholder.png"}
            alt={chef.name}
            width={360}
            height={594}
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* overlay */}
        <motion.div
          className={`
            absolute inset-x-0 bottom-0 bg-black/40 backdrop-blur text-white
            flex flex-col items-center justify-center text-center
            px-6
          `}
          animate={{ height: isActive ? 170 : 140 }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        >
          <p
            className={`font-bold md:text-[40px] ${poltawskiNowy.className}
              bg-gradient-to-b from-[#FCF9F6] to-[#969492]
              bg-clip-text text-transparent leading-tight`}
          >
            {chef.name}
          </p>

          {isActive && (
            <motion.p
              className={`mt-3 md:text-[18px] font-semibold text-left text-white/90 ${montserrat.className} w-full`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.25 }}
            >
              {chef.description}
            </motion.p>
          )}
        </motion.div>
      </motion.div>
    );
  }

  // MOBILE VARIANT
  return (
    <div
      className={`
        relative w-full h-[370px] rounded-[24px] overflow-hidden
      `}
    >
      {/* image */}
      <Image
        src={chef.image ?? "/placeholder.png"}
        alt={chef.name}
        width={800}
        height={470}
        className="w-full h-full object-cover"
        priority
      />

      {/* overlay exactly like your screenshot */}
      <div
        className="
          absolute inset-x-0 bottom-0
          bg-black/45 backdrop-blur-sm
          px-6 py-3
          flex flex-col items-center text-center gap-3
        "
      >
        <p
          className={`
            text-white text-[18px] font-bold ${poltawskiNowy.className}`}
        >
          {chef.name}
        </p>
        <p
          className={`
            text-white text-[12px] text-left
            ${montserrat.className}
          `}
        >
          {chef.description}
        </p>
      </div>
    </div>
  );
}
