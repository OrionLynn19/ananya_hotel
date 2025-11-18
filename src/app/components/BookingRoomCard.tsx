"use client";

import React, { useState } from "react";
import Image from "next/image";
import { FiWifi } from "react-icons/fi";
import {
  FaCarAlt,
  FaSwimmingPool,
  FaDog,
  FaSmokingBan,
  FaUserFriends,
  FaBed,
} from "react-icons/fa";
import type { JSX } from "react";

type Package = {
  name: string;
  originalPrice?: string;
  price: string;
  points: string;
  bullets: string[];
};

type Room = {
  id: number;
  name: string;
  sizeLabel: string;
  image: string;
  maxOccupancy: string;
  amenities: { icon: JSX.Element; label: string }[];
  packages: Package[];
};

const ROOMS: Room[] = [
  {
    id: 1,
    name: "Superior Comfort",
    sizeLabel: "23–29m²",
    image: "/images/Ocean.jpg",
    maxOccupancy: "2 Adult & 1 Children  MAX",
    amenities: [
      { icon: <FiWifi />, label: "Free Wifi" },
      { icon: <FaCarAlt />, label: "Parking Available" },
      { icon: <FaSwimmingPool />, label: "Swimming Pool" },
      { icon: <FaDog />, label: "Pet Friendly" },
      { icon: <FaSmokingBan />, label: "Smoking Prohibited" },
    ],
    packages: [
      {
        name: "Tropic Wonders:",
        originalPrice: "THB 2900",
        price: "THB 2100",
        points: "23450",
        bullets: [
          "Exclusively for Gold Members only",
          "15% off dining & drink",
          "Can early check-in or late check-out",
          "Including taxes and fees",
        ],
      },
      {
        name: "Breakfast Lover:",
        price: "THB 2900",
        points: "23450",
        bullets: [
          "Include western Breakfast",
          "15% off dining & drink",
          "Can early check-in or late check-out",
          "Including taxes and fees",
        ],
      },
    ],
  },
  {
    id: 2,
    name: "Ocean View Deluxe",
    sizeLabel: "30–35m²",
    image: "/images/Deluxe Room2.jpg",
    maxOccupancy: "2 Adult & 2 Children  MAX",
    amenities: [
      { icon: <FiWifi />, label: "Free Wifi" },
      { icon: <FaSwimmingPool />, label: "Infinity Pool" },
      { icon: <FaDog />, label: "Pet Friendly" },
      { icon: <FaSmokingBan />, label: "Smoking Prohibited" },
    ],
    packages: [
      {
        name: "Sunrise Escape:",
        originalPrice: "THB 3500",
        price: "THB 2800",
        points: "28700",
        bullets: [
          "Ocean-view breakfast for two",
          "Welcome drink on arrival",
          "Late check-out (subject to availability)",
          "Including taxes and fees",
        ],
      },
      {
        name: "Seaside Indulgence:",
        price: "THB 3200",
        points: "29800",
        bullets: [
          "Daily cocktail at rooftop bar",
          "20% off spa treatments",
          "Early check-in or late check-out",
          "Including taxes and fees",
        ],
      },
    ],
  },
  {
    id: 3,
    name: "Family Suite",
    sizeLabel: "40–48m²",
    image: "/images/Ocean1.jpg",
    maxOccupancy: "3 Adult & 2 Children  MAX",
    amenities: [
      { icon: <FiWifi />, label: "Free Wifi" },
      { icon: <FaCarAlt />, label: "Parking Available" },
      { icon: <FaSwimmingPool />, label: "Kids Pool" },
      { icon: <FaDog />, label: "Pet Friendly" },
    ],
    packages: [
      {
        name: "Family Retreat:",
        originalPrice: "THB 4200",
        price: "THB 3900",
        points: "31200",
        bullets: [
          "Daily breakfast for 4",
          "Kids stay & eat free (under 12)",
          "Early check-in & late check-out",
          "Including taxes and fees",
        ],
      },
      {
        name: "Play & Stay:",
        price: "THB 4400",
        points: "33600",
        bullets: [
          "Kids club access for 2 children",
          "One complimentary family activity",
          "Welcome snacks for kids",
          "Including taxes and fees",
        ],
      },
    ],
  },
];

export default function BookingRoomCard() {
  return (
    <section className="w-full flex justify-start px-4 md:px-8 py-10">
      {/* 70% on desktop, full width on mobile */}
      <div className="w-full md:w-[70%] max-h-[720px] overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        {ROOMS.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}

function RoomCard({ room }: { room: Room }) {
  const [bedChoice, setBedChoice] = useState<string>("Single Bed");

  return (
    <article
      className="
        w-full
        rounded-[28px]
        border border-white/30
        bg-gradient-to-br from-white/18 via-white/8 to-black/30
        backdrop-blur-2xl
        shadow-[0_30px_80px_rgba(0,0,0,0.75)]
        text-white
        p-6 md:p-8
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,2fr)] gap-6 md:gap-8">
        {/* LEFT: image + amenities */}
        <div className="flex flex-col gap-5">
          <div className="relative rounded-[22px] overflow-hidden aspect-[4/3]">
            <Image
              src={room.image}
              alt={room.name}
              fill
              className="object-cover"
            />
          </div>

          <ul className="space-y-2 text-sm">
            {room.amenities.map((a, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-[13px] md:text-[14px]"
              >
                <span className="flex h-5 w-5 items-center justify-center">
                  {a.icon}
                </span>
                <span>{a.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: details + packages */}
        <div className="flex flex-col">
          {/* header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">
                {room.name}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-xs md:text-sm opacity-90">
                <FaUserFriends className="text-sm" />
                <span>{room.maxOccupancy}</span>
              </div>

              {/* bed options */}
              <div className="mt-3 flex flex-wrap gap-4 text-xs md:text-sm">
                <BedOption
                  label="Single Bed"
                  selected={bedChoice === "Single Bed"}
                  onSelect={() => setBedChoice("Single Bed")}
                />
                <BedOption
                  label="Twin Bed"
                  twin
                  selected={bedChoice === "Twin Bed"}
                  onSelect={() => setBedChoice("Twin Bed")}
                />
                <BedOption
                  label="Extra Bed"
                  selected={bedChoice === "Extra Bed"}
                  onSelect={() => setBedChoice("Extra Bed")}
                />
              </div>

              <button
                type="button"
                className="mt-3 text-xs md:text-sm underline underline-offset-2"
              >
                Room Details
              </button>
            </div>

            <div className="text-right text-xs md:text-sm opacity-80">
              {room.sizeLabel}
              <span className="align-super text-[9px] md:text-[10px]">²</span>
            </div>
          </div>

          {/* divider */}
          <div className="my-4 h-px w-full bg-white/20" />

          {/* PACKAGES */}
          <div className="flex-1 flex flex-col gap-6 text-[13px] md:text-[14px]">
            {room.packages.map((pkg, idx) => (
              <div key={idx} className={idx > 0 ? "pt-4" : ""}>
                {/* main row: left = text, right = price + Add */}
                <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-4 md:gap-6">
                  {/* left content */}
                  <div className="flex-1">
                    <h4 className="font-semibold">{pkg.name}</h4>

                    <div className="mt-1 text-[12px] md:text-[13px]">
                      <span className="text-white/80">or </span>
                      <span className="text-[#23b54a] font-semibold">
                        {pkg.points} points
                      </span>
                      <span className="text-white/80"> per night</span>
                    </div>

                    <ul className="mt-2 space-y-1.5 list-disc list-inside leading-relaxed">
                      {pkg.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  {/* right side: price + Add (desktop aligned with last bullet, mobile row with button on right) */}
                  <div
                    className="
                      mt-4 flex w-full items-center justify-between
                      md:mt-0 md:flex-col md:w-auto md:items-end md:justify-between
                      gap-3 md:gap-0
                    "
                  >
                    <div className="text-left md:text-right whitespace-nowrap">
                      {pkg.originalPrice && (
                        <div className="text-[12px] md:text-[13px] line-through opacity-70">
                          {pkg.originalPrice}
                        </div>
                      )}
                      <div className="text-[13px] md:text-[14px] text-[#e23c2c] font-semibold">
                        {pkg.price}
                      </div>
                    </div>

                    <button
                      type="button"
                      className="
                        rounded-full border border-white 
                        px-8 py-2 text-sm font-medium 
                        hover:bg-white hover:text-black 
                        transition
                      "
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* divider between packages */}
                {idx !== room.packages.length - 1 && (
                  <div className="mt-5 h-px w-full bg-white/18" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

function BedOption({
  label,
  twin,
  selected,
  onSelect,
}: {
  label: string;
  twin?: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="inline-flex items-center gap-1.5 text-xs md:text-sm"
    >
      <span
        className={`h-3 w-3 rounded-full mr-1 border ${
          selected ? "bg-white border-white" : "border-white/70"
        }`}
      />
      <FaBed className="text-[11px]" />
      {twin && <FaBed className="text-[11px]" />}
      <span>{label}</span>
    </button>
  );
}
