"use client";

import Image from "next/image";
import { useState } from "react";
import { useReveal } from "./useReveal";
import { Room } from "../data/room.data";

/* ---------- small helpers ---------- */
function Bullet({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <li
      className={`flex items-start gap-2.5 md:gap-3 text-[13.5px] md:text-[15px] leading-relaxed text-[#2d1f0f] ${className}`}
    >
      <span className="mt-[7px] inline-block h-[6px] w-[6px] rounded-full bg-[#3b2a16]" />
      <span>{children}</span>
    </li>
  );
}

function Amenity({ label, icon }: { label: string; icon: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 md:gap-2 rounded-full bg-[#fffaf1] border border-[#d8c8ae] px-3.5 md:px-4 py-1.5 md:py-2 text-[12.5px] md:text-[14px] font-medium text-[#3b2a16] shadow-[inset_0_-2px_0_rgba(0,0,0,0.03)]">
      {icon}
      {label}
    </span>
  );
}

/* 🔥 Glassmorphic “liquid” tag */
function Tag({ text }: { text: string }) {
  return (
    <span
      className="
        absolute left-3.5 top-3.5 md:left-5 md:top-5 z-10
        inline-flex items-center
        px-5 md:px-6 py-2
        rounded-[18px]
        font-serif text-[14px] md:text-[16px] font-semibold text-[#2b1d0e]

        /* liquid glass */
        bg-white/25
        backdrop-blur-md
        supports-[backdrop-filter]:bg-white/25
        border border-white/60
        shadow-[inset_0_0_6px_rgba(255,255,255,0.4),_0_4px_14px_rgba(0,0,0,0.18)]
      "
    >
      {text}
    </span>
  );
}

const Icon = {
  Parking: (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M7 20V4h7a4 4 0 0 1 0 8H10v8H7zm3-11h4a2 2 0 0 0 0-4h-4v4z" fill="currentColor" />
    </svg>
  ),
  Wifi: (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M12 18a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3zm-6-4a10 10 0 0 1 12 0l-1.5 1.8a8 8 0 0 0-9 0L6 14zM2 10a16 16 0 0 1 20 0l-1.6 1.9a14 14 0 0 0-16.8 0L2 10z" fill="currentColor" />
    </svg>
  ),
  Sea: (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M3 17c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2v2c-2 0-2-2-4-2s-2 2-4 2-2-2-4-2-2 2-4 2v-2z" fill="currentColor" />
    </svg>
  ),
  Breakfast: (
    <svg viewBox="0 0 24 24" className="h-4 w-4">
      <path d="M3 10h13a3 3 0 1 0 0-6H3v6zm0 2h14a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5z" fill="currentColor" />
    </svg>
  ),
};

const BLUR =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYwMCIgaGVpZ2h0PSIxMjAwIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxyZWN0IHdpZHRoPSIxNjAwIiBoZWlnaHQ9IjEyMDAiIGZpbGw9IiNlZWUzZDUiLz48L3N2Zz4=";

/* ---------- CARD ---------- */
export function RoomCard({ room }: { room: Room }) {
  const revealRef = useReveal<HTMLDivElement>();
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <article
      ref={revealRef}
      className="reveal opacity-0 translate-y-3 rounded-[20px] md:rounded-[28px] bg-white border border-[#efe7db] shadow-sm overflow-hidden"
    >
      <div className="md:flex md:items-stretch">
        {/* IMAGE: stacked on mobile, column on md+ */}
        <div className="relative md:flex-none md:w-[560px]">
          <Tag text={room.wingLabel} />
          {!imgLoaded && (
            <div className="absolute inset-0 rounded-t-[20px] md:rounded-none md:rounded-l-[28px] bg-[#f6efe2] shimmer" />
          )}

          {/* Mobile: 3/2 gives a bit more height than 16:9; feels less “letterboxed” */}
          <div className="relative w-full aspect-[3/2] md:aspect-auto md:h-full">
            <Image
              src={room.image}
              alt={room.title}
              width={1600}
              height={1066}
              sizes="(min-width:1024px) 560px, (min-width:768px) 560px, 100vw"
              className="h-full w-full object-cover"
              quality={95}
              placeholder="blur"
              blurDataURL={BLUR}
              loading="lazy"
              onLoadingComplete={() => setImgLoaded(true)}
            />
          </div>
        </div>

        <div className="p-4 md:p-8 pb-6 md:pb-8 md:flex-1 md:border-l md:border-[#efe7db]/80">
          <h3 className="font-serif text-[18px] sm:text-[20px] md:text-[28px] font-semibold text-[#3b2a16]">
            {room.title}
          </h3>

          <ul className="mt-3 md:mt-4 space-y-2">
            <Bullet>Room Size: {room.size}.</Bullet>
            <Bullet>Ideal For: {room.idealFor}</Bullet>
            <Bullet>Bed Type(s): {room.bedTypes}</Bullet>
            {room.interconnect && (
              <Bullet className="hidden md:flex">Inter-connecting Rooms: Available</Bullet>
            )}
          </ul>

          <div className="mt-4 -mx-4 md:mx-0">
            <div className="px-4 md:px-0 flex gap-2.5 md:gap-3 overflow-x-auto no-scrollbar md:flex-wrap md:overflow-visible">
              {room.amenities.includes("Parking") && <Amenity label="Parking" icon={Icon.Parking} />}
              {room.amenities.includes("Wifi") && <Amenity label="Wifi" icon={Icon.Wifi} />}
              {room.amenities.includes("Sea View") && <Amenity label="Sea View" icon={Icon.Sea} />}
              {room.amenities.includes("Breakfast") && <Amenity label="Breakfast" icon={Icon.Breakfast} />}
            </div>
          </div>

          <div className="mt-5 md:mt-6 h-px w-full max-w-[340px] bg-[#d8c8ae]" />

          <div className="mt-4 flex items-center justify-between gap-3 flex-wrap">
            <p className="font-serif text-[20px] md:text-[30px] font-extrabold text-[#3b2a16]">
              ${room.price}
              <span className="ml-1 align-middle text-[12px] md:text-[14px] font-normal text-[#6c5845]">
                /night
              </span>
            </p>

            {/* keep buttons tight; no full-width on mobile */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                className="rounded-full border border-[#d6c7ad] bg-white text-[#3b2a16] px-4 py-2 text-[13px] font-medium shadow-sm hover:bg-[#fff8ee] transition"
                type="button"
              >
                Detail
              </button>
              <button
                className="rounded-full bg-[#3b2a16] text-white px-5 py-2 text-[13px] font-semibold shadow-[0_6px_16px_rgba(59,42,22,0.25)] hover:translate-y-[-1px] active:translate-y-0 transition"
                type="button"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default RoomCard;
