"use client";
import React, { useState } from "react";
import HeroLearnButton from "./HeroLearnButton";

type Service = {
  id: number;
  title: string;
  description: string;
  image?: string;
};

const SERVICES: Service[] = [
  {
    id: 1,
    title: "Weddings",
    description:
      "Celebrate your love with a seaside wedding that’s as breathtaking as the view. From elegant venues to curated menus and personalized details, our team ensures your special day is seamless and unforgettable. Let us create the perfect setting for the beginning of your forever.",
    image: "/images/weddings.jpg",
  },
  {
    id: 2,
    title: "Events",
    description:
      "Host your next event with us. From conferences to holiday parties, our expert staff will take care of every detail. We'll help you create an event that your guests will remember for years to come. Enjoy every minute that you have with us.",
    image: "/images/events.jpg",
  },
  {
    id: 3,
    title: "Workshops",
    description:
      "Join skilled artisans in our studio. Learn the basics of pottery, glass blowing, and jewelry making. All materials provided. Sign up today! Discover your inner artist with guidance from experienced instructors. Our workshops cater to all skill levels.",
    image: "/images/workshops.jpg",
  },
];

export default function OurServicesHeroMobile() {
  const [index, setIndex] = useState(0);

  const prev = () =>
    setIndex((i) => (i - 1 + SERVICES.length) % SERVICES.length);
  const next = () => setIndex((i) => (i + 1) % SERVICES.length);

  const s = SERVICES[index];

  return (
    <div className="sm:hidden w-full mx-auto h-[568px] relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(180deg, rgba(21,21,21,0.34) 45.1%, rgba(21,21,21,0.85) 68.24%), url(${s.image})`,
        }}
      />

      <button
        aria-label="Previous"
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center z-50 text-white"
      >
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 1 L7 4 L11 7"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <button
        aria-label="Next"
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 flex items-center justify-center z-50 text-white"
      >
        <svg
          width="14"
          height="8"
          viewBox="0 0 14 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 1 L7 4 L3 7"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div className="absolute left-8 right-8 bottom-6 w-[256px] h-[232px] flex flex-col items-start gap-6 z-20">
        <div className="w-[256px] h-[140px]">
          <div className="font-poltawski text-white font-bold text-[18px] leading-[100%] h-[23px]">
            {s.title}
          </div>
          <p className="font-mont text-white text-[12px] leading-[100%] mt-3">
            {s.description}
          </p>
        </div>

        <HeroLearnButton
          label="See Detail"
          height={28}
          padding="6px"
          borderRadius={8}
          fontSize={12}
          width={82}
          onClick={() => {}}
        />

        <div className="flex gap-1.5 items-center">
          {SERVICES.map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 rounded-full"
              style={{
                background: i === index ? "#FFFFFF" : "rgba(252,249,246,0.7)",
                opacity: i === index ? 1 : 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
