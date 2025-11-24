"use client";

import Image from "next/image";
import { Montserrat, Poltawski_Nowy } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type CriteriaItem = {
  id: string;
  title: string;
  description: string;
  iconSrc: string;
  iconAlt: string;
};

const CRITERIA: CriteriaItem[] = [
  {
    id: "storytelling",
    title: "Genuine Storytelling",
    description:
      "Creators who share real experiences and connect with their audience in a natural, trustworthy way.",
    iconSrc: "/images/bookIcon.png",
    iconAlt: "Open book with chat bubble",
  },
  {
    id: "engagement",
    title: "Meaningful Engagement",
    description:
      "Not just large followings, but active communities with authentic interaction and connection.",
    iconSrc: "/images/Group.png",
    iconAlt: "People with social icons",
  },
  {
    id: "aesthetic",
    title: "Shared Aesthetic & Values",
    description:
      "A style and outlook that complements our beachside luxury vibe, with a focus on travel, lifestyle, and content.",
    iconSrc: "/images/CircleGroup.png",
    iconAlt: "People in a circle with arrows",
  },
];

export default function LookingForSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* background image */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <Image
          src="/images/what-we-are-looking-for-bg.jpg"
          alt="Beachside content creator setup"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center py-10 md:px-8 md:py-16">
        {/* heading */}
        <h2
          className={`mb-8 text-center text-[18px] font-bold text-white md:mb-12 md:text-[48px] ${poltawskiNowy.className}`}
        >
          What We are Looking For
        </h2>

        {/* MOBILE SLIDER */}
        <div className="flex w-full gap-4 overflow-x-auto pb-4 md:hidden snap-x snap-mandatory px-6">
          {CRITERIA.map((item, index) => (
            <article
              key={item.id}
              className={`snap-center flex flex-none w-[190px] h-[270px] flex-col items-center rounded-[32px] bg-[#f9f4ed]/95 px-5 py-6 text-center shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-md ${
                montserrat.className
              } ${
                index === 0
                  ? "ml-4"
                  : index === CRITERIA.length - 1
                  ? "mr-4"
                  : ""
              }`}
            >
              <div className="mb-5 flex h-20 w-20 items-center justify-center">
                <Image
                  src={item.iconSrc}
                  alt={item.iconAlt}
                  width={80}
                  height={80}
                  className="h-auto w-auto"
                />
              </div>

              <h3
                className={`mb-2 text-[14px] font-semibold text-[#463214] ${poltawskiNowy.className}`}
              >
                {item.title}
              </h3>

              <p
                className={`text-[12px] font-medium text-[#463214] ${montserrat.className}`}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden w-[1200px] grid-cols-1 gap-8 place-items-center md:grid md:grid-cols-3 md:gap-10">
          {CRITERIA.map((item) => (
            <article
              key={item.id}
              className={`flex md:h-[540px] md:w-[390px] flex-col items-center rounded-[32px] bg-[#f9f4ed]/95 px-5 py-5 text-center shadow-[0_24px_60px_rgba(0,0,0,0.25)] backdrop-blur-md ${montserrat.className}`}
            >
              <div className="mb-5 flex h-24 w-24 items-center justify-center">
                <Image
                  src={item.iconSrc}
                  alt={item.iconAlt}
                  width={96}
                  height={96}
                  className="h-auto w-auto"
                />
              </div>

              <h3
                className={`mb-4 text-[28px] md:text-[40px] font-bold leading-snug text-[#463214] ${poltawskiNowy.className}`}
              >
                {item.title}
              </h3>

              <p
                className={`text-[18px] md:text-[24px] font-[500] leading-relaxed text-[#463214] ${montserrat.className}`}
              >
                {item.description}
              </p>
            </article>
          ))}
        </div>

        <button
          type="button"
          className={`mt-10 rounded-xl border border-white/30 backdrop-blur-[10px] bg-black/20 md:bg-white/20 px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10 ${montserrat.className}`}
        >
          Join Us
        </button>
      </div>
    </section>
  );
}
