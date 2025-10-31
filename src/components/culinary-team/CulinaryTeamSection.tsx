"use client";

import { useState } from "react";
import ChefCard, { Chef } from "./ChefCard";

const chefs: Chef[] = [
  {
    id: "joseph",
    name: "Chef Joseph",
    description:
      "Chef Joseph crafts unforgettable culinary experiences. With a focus on local ingredients and innovative techniques, he brings a unique flavor to every event.",
    image: "/images/chef-joseph.jpg",
  },
  {
    id: "xua",
    name: "Chef Xua",
    description:
      "Chef Xua blends classic techniques with modern presentation to create memorable desserts and signature menus.",
    image: "/images/chef-xua.jpg",
  },
  {
    id: "nat",
    name: "Chef Nat",
    description:
      "Chef Nat ensures every plate leaves the kitchen with precision, balance, and authentic taste.",
    image: "/images/chef-nat.jpg",
  },
];

export default function CulinaryTeamSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="w-full bg-[#fdfaf4] py-12 md:py-16">
      <div className="mx-auto w-full flex flex-col items-center gap-10">
        <div className="text-center max-w-3xl">
          <h2 className="text-[28px] md:text-[36px] leading-tight font-semibold text-[#463214]">
            Our Culinary Team
          </h2>
            <p className="mt-4 text-base md:text-lg text-[#463214]/80">
              Get to know the talented chefs dedicated to making your dining experience unforgettable.
            </p>
        </div>

        <div className="flex flex-col items-center gap-5 md:flex-row md:justify-center w-full">
          {chefs.map((chef) => (
            <ChefCard
              key={chef.id}
              chef={chef}
              isActive={activeId === chef.id}
              onActivate={() => setActiveId(chef.id)}
              onDeactivate={() => setActiveId(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
