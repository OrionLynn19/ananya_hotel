"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

type Card = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

const cardsByCity: Record<string, Card[]> = {
  "Hua Hin": [
    {
      id: 1,
      title: "Sanctuary of Truth",
      desc: "Experience Thailand’s most beautiful sights",
      img: "/Images/exp1.png",
    },
    {
      id: 2,
      title: "Lighthouse View",
      desc: "Experience Thailand’s most beautiful sights",
      img: "/Images/exp2.png",
    },
    {
      id: 3,
      title: "Seaside Park",
      desc: "Experience Thailand’s most beautiful sights",
      img: "/Images/exp3.png",
    },
    {
      id: 4,
      title: "Island View",
      desc: "Experience Thailand’s most beautiful sights",
      img: "/Images/exp4.png",
    },
  ],
  Pattaya: [
    {
      id: 1,
      title: "Coral Beach",
      desc: "Sunset views and local markets",
      img: "/Images/exp2.png",
    },
    {
      id: 2,
      title: "Central Pier",
      desc: "Vibrant seafront and dining",
      img: "/Images/exp1.png",
    },
    {
      id: 3,
      title: "Seafood Bay",
      desc: "Fresh catches and beachside grills",
      img: "/Images/exp4.png",
    },
    {
      id: 4,
      title: "Market Lane",
      desc: "Shops, crafts and nightlife",
      img: "/Images/exp3.png",
    },
  ],
  Phuket: [
    {
      id: 1,
      title: "Big Buddha",
      desc: "Panoramic island views",
      img: "/Images/exp3.png",
    },
    {
      id: 2,
      title: "Patong Beach",
      desc: "Vibrant beach clubs",
      img: "/Images/exp4.png",
    },
    {
      id: 3,
      title: "Old Phuket Town",
      desc: "Historic streets and cafes",
      img: "/Images/exp1.png",
    },
    {
      id: 4,
      title: "Phi Phi Tours",
      desc: "Boat trips and snorkeling",
      img: "/Images/exp2.png",
    },
  ],
};

export default function WhatsNearbyDesktop() {
  const [selectedCity, setSelectedCity] = useState<string>("Hua Hin");
  const [cards, setCards] = useState<Card[]>(cardsByCity["Hua Hin"]);

  useEffect(() => {
    setCards(cardsByCity[selectedCity] ?? cardsByCity["Hua Hin"]);
  }, [selectedCity]);

  const CityButton: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void;
    width?: string;
  }> = ({ label, active, onClick, width = "w-[134px]" }) => {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={active}
        className={`relative ${width} h-[57px] rounded-[20px] flex items-center justify-center cursor-pointer overflow-hidden backdrop-blur-xl`}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            padding: "0.5px",
            borderRadius: 20,
            pointerEvents: "none",
            zIndex: 1,
            background:
              "linear-gradient(251.08deg, rgba(255,255,255,0.05) 3.46%, #FFFFFF 51.73%, rgba(255,255,255,0.5) 100%)",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
          }}
        />

        <div
          className={`absolute inset-0 rounded-[20px] ${
            active ? "bg-[rgba(70,50,20,0.7)]" : "bg-[rgba(70,50,20,0.12)]"
          }`}
        />

        <span className="relative z-10 font-poltawski font-bold text-[24px] leading-[57px] text-[#FCF9F6]">
          {label}
        </span>
      </button>
    );
  };

  return (
    <section className="hidden lg:block w-full min-h-[1024px] relative">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url("/Images/What%27sNearby/bgForNearby.png")`,
        }}
        aria-hidden
      />

      <div className="absolute inset-0 bg-linear-to-b from-[rgba(70,50,20,0.95)] to-transparent pointer-events-none" />

      <div className="relative z-10 max-w-[1221px] mx-auto pt-[75px] text-center">
        <h2 className="mx-auto w-[335px] text-[48px] font-poltawski font-bold text-white">
          What’s Nearby
        </h2>

        <p className="mx-auto mt-[11.7px] w-[1216px] text-[32px] font-poltawski font-semibold text-white">
          Your beach escape doesn’t end at the water’s edge. Explore the
          attractions that make each location unforgettable.
        </p>

        <div className="mt-24 w-full flex flex-col items-start">
          <div className="w-[1221px] flex items-start justify-between gap-[23px]">
            {cards.slice(0, 4).map((c) => (
              <div
                key={c.id}
                className="w-[288px] h-[455px] rounded-4xl p-[15px] pb-[30px] bg-[rgba(70,50,20,0.15)] backdrop-blur-xl relative"
              >
                <div className="w-[258px] h-[299px] mx-auto rounded-2xl overflow-hidden backdrop-blur-sm">
                  <Image
                    src={c.img}
                    alt={c.title}
                    width={258}
                    height={299}
                    className="w-[258px] h-[299px] object-cover"
                  />
                </div>

                <div className="w-[258px] h-[87px] mx-auto mt-6 text-center">
                  <p className="text-[24px] font-poltawski font-bold text-[#FCF9F6] leading-[31px]">
                    {c.title}
                  </p>
                  <p className="mt-3 text-[18px] font-mont font-medium text-[#FCF9F6] leading-[22px]">
                    {c.desc}
                  </p>
                </div>

                <div
                  aria-hidden
                  style={{
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.20), inset 1px 0 0 rgba(255,255,255,0.12)",
                  }}
                  className="pointer-events-none absolute inset-0 rounded-4xl"
                />
              </div>
            ))}
          </div>

          <div className="mt-30 w-[469px] flex items-center justify-center gap-8">
            <CityButton
              label="Hua Hin"
              active={selectedCity === "Hua Hin"}
              onClick={() => setSelectedCity("Hua Hin")}
              width="w-[143px]"
            />
            <CityButton
              label="Pattaya"
              active={selectedCity === "Pattaya"}
              onClick={() => setSelectedCity("Pattaya")}
              width="w-[134px]"
            />
            <CityButton
              label="Phuket"
              active={selectedCity === "Phuket"}
              onClick={() => setSelectedCity("Phuket")}
              width="w-[134px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
