"use client";

import { useState } from "react";
import ChefCard, { Chef } from "./ChefCard";
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
      "Chef Xua crafts unforgettable culinary experiences. With a focus on local ingredients and innovative techniques, he brings a unique flavor to every event.",
    image: "/images/chef-xua.jpg",
  },
  {
    id: "nat",
    name: "Chef Nat",
    description:
      "Chef Nat crafts unforgettable culinary experiences. With a focus on local ingredients and innovative techniques, he brings a unique flavor to every event.",
    image: "/images/chef-nat.jpg",
  },
];

export default function CulinaryTeamSection() {
  const [activeId, setActiveId] = useState<string | null>(null);

  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto w-full flex flex-col items-center gap-10">
        <div className={`text-center ${poltawskiNowy.className} max-w-6xl`}>
          <h2 className="text-[28px] md:text-[40px] font-bold text-[#463214]">
            Our Culinary Team
          </h2>
            <p className="mt-4 font-semibold md:text-[32px] text-[#463214]">
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
