"use client";

import React, { useEffect, useState } from "react";
import DesktopCartSummary from "../../../components/cart/DesktopCartSummary";

type CartItem = {
  id: string;
  title: string;
  image: string;
  beds: string[];
  extraBed: boolean;
  persons: number;
  quantity: number;
  pricePerNight: number;
  startDate: string;
  endDate: string;
  nights: number;
  location: string;
};

export default function RoomsPage() {
  const [data, setData] = useState<{
    items: CartItem[];
    summary: { totalGuests: string; totalCost: number };
  } | null>(null);

  useEffect(() => {
    let mounted = true;
    fetch("/api/cart")
      .then((r) => r.json())
      .then((json) => {
        if (mounted) setData(json);
      })
      .catch((e) => console.error(e));
    return () => {
      mounted = false;
    };
  }, []);

  if (!data) return <div className="p-8">Loading…</div>;

  return (
    <div className="w-full max-w-[1326px] mx-auto px-4 py-16 md:flex md:gap-6">
      <main className="flex-1"></main>

      <DesktopCartSummary
        items={data.items}
        summary={data.summary}
        onChange={(items, newSummary) =>
          setData({ items, summary: newSummary })
        }
      />
    </div>
  );
}
