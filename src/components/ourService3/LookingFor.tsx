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
        <div className="absolute inset-0 bg-[#f5f2ec]/30" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 py-10 md:px-8 md:py-16">
        {/* heading */}
        <h2
          className={`mb-12 text-center text-[40px] font-bold text-white md:text-[48px] ${poltawskiNowy.className}`}
        >
          What We are Looking For
        </h2>

        <div className="grid w-[1200px] grid-cols-1 gap-8 md:grid-cols-3 md:gap-10 place-items-center">
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
          className={`mt-10 rounded-xl border border-white/30 backdrop-blur-[10px] bg-transparent px-4 py-2 text-lg font-semibold text-white transition-all duration-300 hover:bg-white/10 ${montserrat.className}`}
        >
          Join Us
        </button>
      </div>
    </section>
  );
}
