"use client";

import { Suspense } from "react";
import Roomsbar from "../../components/Roomsbar";
import BookingRoomCard from "../../components/BookingRoomCard";
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

    async function fetchCart() {
      try {
        const r = await fetch("/api/cart");
        const json = await r.json();
        if (mounted) setData(json);
      } catch (e) {
        console.error(e);
      }
    }

    fetchCart();

    // listen for cart updates from other components
    const onCartUpdated = () => {
      fetchCart();
    };
    window.addEventListener("cart-updated", onCartUpdated);

    return () => {
      mounted = false;
      window.removeEventListener("cart-updated", onCartUpdated);
    };
  }, []);

  if (!data) return <div className="p-8">Loading…</div>;
  return (
    <div className="w-full max-w-[1326px] mx-auto px-4 py-16">
      {/* Search bar / header full width */}
      <div>
        <Suspense fallback={<div>Loading search bar...</div>}>
          <Roomsbar />
        </Suspense>
      </div>

      {/* Content row: rooms (left) and cart summary (right) */}
      <div className="mt-6 md:flex md:gap-6">
        <main className="flex-1">
          <div>
            <Suspense fallback={<div>Loading rooms...</div>}>
              <BookingRoomCard />
            </Suspense>
          </div>
        </main>

        <DesktopCartSummary
          items={data.items}
          summary={data.summary}
          onChange={(items, newSummary) =>
            setData({ items, summary: newSummary })
          }
        />
      </div>
    </div>
  );
}
