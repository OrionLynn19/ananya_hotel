"use client";

import Image from "next/image";
import { useCallback } from "react";

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
};

export default function ChefCard({
  chef,
  isActive,
  onActivate,
  onDeactivate,
}: ChefCardProps) {
  const handleClick = useCallback(() => {
    onActivate();
  }, [onActivate]);

  return (
    <article
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onClick={handleClick}
      className={`
        relative overflow-hidden rounded-[16px] bg-black/30 cursor-pointer
        transition-all duration-300 ease-out
        /* mobile: fixed size from Figma */
        w-[236px] h-[594px] flex-shrink-0
        /* center image nicely on mobile */
        md:w-auto md:h-auto md:flex-1 md:rounded-2xl md:flex-shrink
        ${isActive ? "md:flex-[1.8]" : "md:flex-[0.45]"}
      `}
    >
      {/* image */}
      <Image
        src={chef.image}
        alt={chef.name}
        fill
        className={`
          object-cover transition-all duration-300
          ${isActive ? "md:scale-[1.02]" : "md:scale-100"}
        `}
        priority={isActive}
      />

      {/* overlay */}
      <div
        className={`
          absolute inset-x-0 bottom-0
          bg-gradient-to-t from-black/70 via-black/40 to-transparent
          text-white flex flex-col transition-all duration-300
          h-[120px] px-4 py-4 justify-end
          ${isActive ? "md:h-[48%] md:px-6 md:py-6 md:gap-3 md:justify-end" : ""}
        `}
      >
        <h3
          className={`
            font-semibold tracking-tight drop-shadow-md
            text-center text-2xl
            ${isActive ? "md:text-left md:text-2xl" : ""}
          `}
        >
          {chef.name}
        </h3>

        {/* show description only on md+ when active */}
        {isActive && (
          <p className="hidden md:block text-sm md:text-base leading-relaxed text-white/90">
            {chef.description}
          </p>
        )}
      </div>
    </article>
  );
}
