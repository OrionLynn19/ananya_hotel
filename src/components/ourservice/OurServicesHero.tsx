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
      "Join skilled artisans in our studio. Learn the basics of pottery, glass blowing, and jewelry making. All materials provided. Sign up today! Discover your inner artist with guidance from experienced instructors. Our workshops cater to all skill levels, from beginner to advanced.",
    image: "/images/workshops.jpg",
  },
];

export default function OurServicesHero() {
  const [active, setActive] = useState<number>(1);

  return (
    <section className="w-full flex justify-center">
      <div className="relative" style={{ width: 1440, height: 1038 }}>
        <div className="flex h-full overflow-hidden rounded">
          {SERVICES.map((s) => {
            const isActive = s.id === active;
            const collapsedWidth = 271;
            const expandedWidth = 898;
            const cardWidth = isActive ? expandedWidth : collapsedWidth;

            return (
              <div
                key={s.id}
                role="button"
                tabIndex={0}
                onClick={() => setActive(s.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") setActive(s.id);
                }}
                className={`relative flex-none text-left focus:outline-none transition-all duration-500 ease-in-out`}
                style={{
                  width: cardWidth,
                  height: 1038,
                  paddingTop: 64,
                  paddingBottom: 64,
                  paddingLeft: 48,
                  paddingRight: 48,
                  borderRight: "2px solid var(--text-color, #463214)",
                }}
              >
                <div
                  className={`absolute inset-0 -z-10 bg-cover bg-center`}
                  style={{
                    backgroundImage: isActive
                      ? `linear-gradient(180deg, rgba(21,21,21,0.28) 55.63%, rgba(21,21,21,0.7) 70.32%), url(${s.image})`
                      : `linear-gradient(rgba(21,21,21,0.6), rgba(21,21,21,0.6)), url(${s.image})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />

                {isActive ? (
                  <div className="relative h-full flex flex-col justify-end items-start">
                    <div
                      className="mb-0"
                      style={{ width: 802, gap: 32, height: 320 }}
                    >
                      <div style={{ width: 802, height: 231, gap: 24 }}>
                        <div
                          className="font-poltawski text-white font-bold"
                          style={{
                            fontSize: 48,
                            lineHeight: "100%",
                            width: 227,
                            height: 62,
                          }}
                        >
                          {s.title}
                        </div>
                        <p
                          className="font-mont text-white"
                          style={{
                            fontSize: 24,
                            lineHeight: "100%",
                            marginTop: 24,
                          }}
                        >
                          {s.description}
                        </p>
                      </div>

                      <div className="mt-4">
                        <HeroLearnButton />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <div
                        className="font-poltawski text-white font-bold"
                        style={{ fontSize: 40, lineHeight: "100%" }}
                      >
                        {s.title}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
