"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Calendar, MapPin, Users, Check } from "lucide-react";

type Tab = "All" | "Tour Package" | "Dining Package" | "Family Package";

type Promo = {
  id: string;
  type: Exclude<Tab, "All">;
  title: string;
  img: string;
  discount?: string;
  category: string;
  price: number;
  original?: number;
  duration?: string;
  people?: number;
  location?: string;
  details: string[];
};

const DATA: Promo[] = [
  {
    id: "d1",
    type: "Dining Package",
    title: "Gourmet Dining Experience",
    img: "/Images/100.png",
    discount: "25% OFF",
    category: "Dining",
    price: 524,
    original: 699,
    duration: "2 Days / 1 Night",
    people: 2,
    location: "Resort",
    details: ["Chef’s Tasting Menu", "Wine Pairing", "Private Beach Dinner", "Cooking Class"],
  },
  {
    id: "t1",
    type: "Tour Package",
    title: "Ha Long Bay Tour",
    img: "/Images/200.png",
    discount: "20% OFF",
    category: "Tour",
    price: 599,
    original: 800,
    duration: "2 Days / 1 Night",
    people: 2,
    location: "Ha Long Bay",
    details: ["Private Boat", "Island Shuttle", "Meals Included", "Scuba Demo"],
  },
  {
    id: "t2",
    type: "Tour Package",
    title: "Bangkok City Explorer",
    img: "/Images/200.png",
    discount: "15% OFF",
    category: "Tour",
    price: 349,
    original: 420,
    duration: "1 Day Trip",
    people: 4,
    location: "Bangkok",
    details: ["Local Guide", "Temple Tour", "Lunch Included", "Boat Ride"],
  },
  {
    id: "f1",
    type: "Family Package",
    title: "Phuket Family Getaway",
    img: "/Images/100.png",
    discount: "30% OFF",
    category: "Family",
    price: 799,
    original: 1000,
    duration: "3 Days / 2 Nights",
    people: 4,
    location: "Resort",
    details: ["Breakfast", "Airport Transfer", "Resort Access", "Beach Dinner"],
  },
  {
    id: "f2",
    type: "Family Package",
    title: "Chiang Mai Adventure",
    img: "/Images/200.png",
    discount: "25% OFF",
    category: "Family",
    price: 899,
    original: 1150,
    duration: "4 Days / 3 Nights",
    people: 4,
    location: "Chiang Mai",
    details: ["Elephant Visit", "Trekking", "Breakfast", "City Tour"],
  },
];

const cx = (...c: (string | false | undefined)[]) => c.filter(Boolean).join(" ");

export default function PromotionSection2() {
  const tabs: Tab[] = ["All", "Tour Package", "Dining Package", "Family Package"];
  const [active, setActive] = useState<Tab>("All");

  const items = useMemo(
    () => (active === "All" ? DATA : DATA.filter((d) => d.type === active)),
    [active]
  );

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4 text-center">
        <h2 className="text-[24px] font-semibold tracking-tight text-neutral-900">
          Promotion you may like
        </h2>
        <p className="mt-2 max-w-3xl mx-auto text-[13px] text-neutral-700">
          Experience TOUR GUIDE. Discover extraordinary experiences with our curated selection of
          luxury packages, each designed to create unforgettable memories.
        </p>

        {/* Panel */}
        <div className="mt-6 rounded-3xl border border-neutral-200 bg-[#faf6f1] p-5 shadow-[0_10px_25px_rgba(0,0,0,0.04)]">
          {/* Tabs */}
          <div className="-mx-2 overflow-x-auto whitespace-nowrap px-2 md:mx-0 md:overflow-visible [scrollbar-width:none] [-ms-overflow-style:none]">
            <div className="inline-flex gap-2 md:w-full md:justify-center">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setActive(t)}
                  className={cx(
                    "inline-flex shrink-0 rounded-full border px-4 py-1.5 text-[12px] font-medium",
                    active === t
                      ? "bg-[#3a2a17] text-white border-[#3a2a17]"
                      : "bg-white text-neutral-800 border-neutral-200 hover:bg-neutral-50"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* Cards list */}
          {active === "All" ? (
            <div className="mt-5 max-h-[400px] overflow-y-auto pr-1 space-y-3">
              {items.map((p) => (
                <PromoCardOverlay key={p.id} data={p} />
              ))}
            </div>
          ) : (
            <div className="mt-5 grid gap-3">
              {items.map((p) => (
                <PromoCardOverlay key={p.id} data={p} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function PromoCardOverlay({ data }: { data: Promo }) {
  return (
    <article className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-md">
      <div className="relative h-[320px] md:h-[360px]">
        <Image
          src={data.img}
          alt={data.title}
          fill
          className="object-cover"
          priority
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        {/* Price badge */}
        <div className="absolute right-4 top-4 rounded-xl bg-white/90 px-4 py-1.5 text-right shadow">
          <div className="text-[18px] font-semibold text-neutral-900 leading-none">
            ${data.price}
          </div>
          {data.original && (
            <div className="text-[12px] text-neutral-400 line-through">${data.original}</div>
          )}
          <div className="text-[11px] text-neutral-600 mt-0.5">per person</div>
        </div>

        {/* Labels */}
        <div className="absolute left-4 top-4 flex items-center gap-2">
          {data.discount && (
            <span className="rounded-full bg-[#5a3a1a] px-2.5 py-0.5 text-[12px] font-semibold text-white">
              {data.discount}
            </span>
          )}
          <span className="rounded-full bg-white/90 px-2.5 py-0.5 text-[12px] font-medium text-neutral-900">
            {data.category}
          </span>
        </div>

        {/* Content */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-6 text-left">
          <h3 className="text-white text-[20px] font-semibold mb-2 leading-tight">
            {data.title}
          </h3>

          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-white/90 mb-2">
            {data.duration && (
              <span className="inline-flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {data.duration}
              </span>
            )}
            {data.people && (
              <span className="inline-flex items-center gap-1">
                <Users className="h-3.5 w-3.5" />
                {data.people} People
              </span>
            )}
            {data.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {data.location}
              </span>
            )}
          </div>

          <div className="text-white/90 text-[13px]">
            <p className="font-semibold mb-1">Package Includes:</p>
            <ul className="space-y-0.5">
              {data.details.slice(0, 3).map((d, i) => (
                <li key={i} className="flex items-center gap-1.5">
                  <Check className="h-3.5 w-3.5" />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-4 flex gap-2">
            <button className="rounded-md bg-white/90 px-4 py-1.5 text-[12px] font-medium text-neutral-900 hover:bg-white transition">
              Detail
            </button>
            <button className="rounded-md bg-[#3a2a17] px-4 py-1.5 text-[12px] font-medium text-white hover:bg-[#2c1f11] transition">
              Booking
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
