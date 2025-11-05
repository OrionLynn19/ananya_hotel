"use client";

import { useMemo, useState } from "react";
import Image from "next/image";

// ---------- Types ----------
type City = "Hua Hin" | "Pattaya" | "Phu Ket";

type Card = {
  image: string;
  title: string;        // allow \n for line breaks
  description: string;  // expanded/overlay body
};

type CityData = Record<City, Card[]>;

// ---------- Data (replace image paths as needed) ----------
const DATA: CityData = {
  "Hua Hin": [
    {
      image: "/Images/1.png",
      title: "Rooftop\nDinning",
      description:
        "Chef Joseph crafts unforgettable culinary experiences. With a focus on local ingredients and innovative techniques, he brings a unique flavor to every event.",
    },
    {
      image: "/Images/2.png",
      title: "Pool View\nDinning",
      description:
        "A serene poolside ambiance paired with bright, refreshing flavors designed for sunny afternoons and golden sunsets.",
    },
    {
      image: "/Images/3.png",
      title: "Sea-side\nView",
      description:
        "Dine by the shoreline with candlelights and the sound of waves—our coastal menu celebrates the day’s freshest catch.",
    },
  ],
  Pattaya: [
    {
      image: "/Images/1.png",
      title: "Rooftop\nDinning",
      description:
        "Inventive plates, skyline breezes, and seasonal produce: our rooftop experience brings Pattaya’s nights to life.",
    },
    {
      image: "/Images/2.png",
      title: "Pool View\nDinning",
      description:
        "Relaxed plates, spritzes, and a mirror-calm pool—perfect for long lunches and easy evenings with friends.",
    },
    {
      image: "/Images/3.png",
      title: "Sea-side\nView",
      description:
        "A romantic seaside setting with lantern lights and a menu inspired by coastal classics and spice-kissed herbs.",
    },
  ],
  "Phu Ket": [
    {
      image: "/Images/1.png",
      title: "Rooftop\nDinning",
      description:
        "A coastal symphony of flavors paired with sweeping views—crafted with artisan techniques and local treasures.",
    },
    {
      image: "/Images/2.png",
      title: "Pool View\nDinning",
      description:
        "Lush palms, shimmering water, and bright island plates—poolside dining with a modern tropical twist.",
    },
    {
      image: "/Images/3.png",
      title: "Sea-side\nView",
      description:
        "Salt air, soft strings of lights, and a menu that leans into the ocean’s daily rhythm—elegant yet effortless.",
    },
  ],
};

// ---------- Component ----------
export default function DiningShowcase() {
  const [city, setCity] = useState<City>("Hua Hin");
  const [active, setActive] = useState(0); // 0..2

  const cards = DATA[city];
  const bg = useMemo(() => cards[active]?.image, [cards, active]);

  const goPrev = () => setActive((i) => (i - 1 + cards.length) % cards.length);
  const goNext = () => setActive((i) => (i + 1) % cards.length);

  // Precomputed flex bases for desktop (md+) so we don’t reference window
  const basisFor = (i: number) => (i === active ? "55%" : "22.5%");

  return (
    <section className="w-full py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4">
        {/* ---------- Heading ---------- */}
        <div className="mb-8 text-center">
          <h2 className="font-semibold md:text-[29px] text-4xl sm:text-4xl text-[#3a2a18]">
            Dine with a View
          </h2>
          <p className="mt-3 font-semibold md:text-[29px] text-[#5b4936] leading-relaxed">
            From ocean horizons to garden serenity, every setting offers a unique way to savor
            your meal.
          </p>
        </div>

        {/* ---------- Frosted Container ---------- */}
        <div className="relative overflow-hidden rounded-[28px] border border-white/15 bg-white/10 shadow-2xl backdrop-blur-xl">
          {/* Dynamic blurred background */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-black/25" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={bg}
              alt=""
              className="absolute inset-0 h-full w-full scale-110 object-cover blur-[15px] opacity-80"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-transparent to-black/20" />
          </div>

          {/* ---------- Tabs ---------- */}
          <div className="relative z-10 flex flex-wrap gap-3 px-5 pt-5">
            {(["Hua Hin", "Pattaya", "Phu Ket"] as City[]).map((name) => {
              const isActiveCity = name === city;
              return (
                <button
                  key={name}
                  onClick={() => {
                    setCity(name);
                    setActive(0);
                  }}
                  className={[
                    "rounded-full px-5 py-2 text-sm font-semibold transition",
                    isActiveCity
                      ? "bg-[#7b5d44] text-white shadow"
                      : "bg-white/20 text-white hover:bg-white/30",
                  ].join(" ")}
                >
                  {name}
                </button>
              );
            })}
          </div>

          {/* ---------- Desktop (md+) – Expanding Cards ---------- */}
          <div className="relative z-10 hidden gap-4 px-5 pb-6 pt-4 md:flex">
            {cards.map((card, i) => {
              const isActiveCard = i === active;
              return (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="group relative overflow-hidden rounded-[22px] bg-black/30 shadow-xl ring-1 ring-white/10"
                  style={{
                    flex: `0 0 ${basisFor(i)}`,
                    transition: "flex-basis 420ms ease, transform 420ms ease",
                  }}
                >
                  {/* Image */}
                  <div className="relative h-[300px] lg:h-[360px]">
                    <Image
                      src={card.image}
                      alt={card.title.replace(/\n/g, " ")}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      priority={i === 0}
                    />
                    <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-black/5" />
                  </div>

                  {/* Bottom overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0">
                    <div
                      className={[
                        "rounded-b-[22px] px-5 text-white",
                        isActiveCard
                          ? "bg-linear-to-t from-black/80 via-black/50 to-transparent pb-5 pt-5"
                          : "bg-linear-to-t from-black/70 via-black/45 to-transparent pb-4 pt-4",
                      ].join(" ")}
                    >
                      <h3 className="whitespace-pre-line font-serif text-2xl lg:text-3xl font-semibold leading-tight">
                        {card.title}
                      </h3>
                      <p
                        className={[
                          "mt-3 text-sm leading-relaxed text-white/90 transition-opacity duration-300",
                          isActiveCard ? "opacity-100" : "opacity-0",
                        ].join(" ")}
                      >
                        {card.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ---------- Mobile (<md) – Single Card with Overlay & Arrows ---------- */}
          <div className="relative z-10 block md:hidden">
            <div className="relative mx-4 mb-5 mt-4 overflow-hidden rounded-[22px] bg-black/30 shadow-xl ring-1 ring-white/10">
              <div className="relative h-[380px]">
                <Image
                  src={cards[active].image}
                  alt={cards[active].title.replace(/\n/g, " ")}
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Centered glass content card */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-6">
                <div className="max-w-[86%] rounded-[18px] bg-black/45 px-5 py-5 text-white shadow-lg backdrop-blur-md ring-1 ring-white/10">
                  <h3 className="mb-3 whitespace-pre-line text-center font-serif text-xl font-semibold">
                    {cards[active].title}
                  </h3>
                  <p className="text-center text-[13px] leading-relaxed text-white/95">
                    {cards[active].description}
                  </p>
                </div>
              </div>

              {/* Arrows */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-3">
                <button
                  onClick={goPrev}
                  aria-label="Previous"
                  className="rounded-full bg-white/80 p-2 shadow hover:bg-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#3a2a18]"
                  >
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next"
                  className="rounded-full bg-white/80 p-2 shadow hover:bg-white"
                >
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-[#3a2a18]"
                  >
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          {/* ---------- /Mobile ---------- */}
        </div>
      </div>
    </section>
  );
}
