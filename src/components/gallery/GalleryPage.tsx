"use client";

import React, { useState } from "react";
import GalleryGrid from "./GalleryGrid";

const CATEGORIES = [
  "All",
  "Dining",
  "Facilities",
  "Meetings & Events",
  "Services",
];

const IMAGES: Record<string, string[]> = {
  All: [
    "rest1.png",
    "fac1.png",
    "events.jpg",
    "rest2.png",
    "fac2.png",
    "weddings.jpg",
  ],
  Dining: [
    "rest1.png",
    "rest2.png",
    "rest3.png",
    "rest4.png",
    "buffett.jpg",
    "breakfast.jpg",
  ],
  Facilities: [
    "fac1.png",
    "fac2.png",
    "fac3.png",
    "fac4.png",
    "pool.png",
    "gym.png",
  ],
  "Meetings & Events": [
    "events.jpg",
    "weddings.jpg",
    "roof.png",
    "UniqueArchitecture.png",
    "headimage11.png",
    "headimage22.png",
  ],
  Services: [
    "spa1.png",
    "spa2.png",
    "spa3.png",
    "spa4.png",
    "spa.png",
    "sauna.png",
  ],
};

export default function GalleryPage() {
  const [active, setActive] = useState<string>("All");

  const imgs = IMAGES[active] ?? IMAGES.All;

  return (
    <main>
      <section className="max-w-[301px] md:max-w-[1216px] mx-auto py-[29px] md:py-32">
        {/* Buttons row */}
        <div className="relative flex items-center justify-center gap-1.5 pb-6 md:gap-8 md:pb-16">
          {CATEGORIES.map((cat) => {
            const isActive = cat === active;
            return (
              <button
                key={cat}
                onClick={() => setActive(cat)}
                className={`flex items-center justify-center rounded-lg px-1.5 h-[19px] text-[10px] md:h-[57px] md:rounded-2xl md:px-6 md:text-[24px] font-bold font-poltawski select-none transition-colors duration-150 cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 whitespace-nowrap ${
                  isActive
                    ? "bg-[#463214] text-[#FCF9F6] hover:bg-[#3f2910]"
                    : "bg-white/5 text-[rgba(70,50,20,1)] backdrop-blur-2xl border border-white/10 hover:bg-[#463214]/20 hover:shadow-sm"
                }`}
                style={{
                  boxShadow: "0px 0px 12px 0px rgba(124, 109, 88, 0.2) inset",
                }}
                aria-pressed={isActive}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <GalleryGrid imgs={imgs} />
      </section>
    </main>
  );
}
