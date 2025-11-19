"use client";

import React, { useEffect, useState } from "react";
import CartLeft from "../../../components/cart/CartLeft";
import CartRight from "../../../components/cart/CartRight";
import MobileCartSummary from "../../../components/cart/MobileCartSummary";

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

export default function CartPage() {
  const [data, setData] = useState<{
    items: CartItem[];
    summary: { totalGuests: string; totalCost: number } | null;
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

  if (!data) return <div className="p-8">Loading cart…</div>;

  const summary = data.summary ?? { totalGuests: "0", totalCost: 0 };

  return (
    <div>
      <MobileCartSummary
        items={data.items}
        summary={summary}
        onChange={(items, newSummary) =>
          setData({ items, summary: newSummary })
        }
      />

      <div className="hidden md:flex w-full max-w-[1326px] mx-auto box-border flex-col py-16 md:flex-row md:gap-[18px] justify-center">
        <CartLeft items={data.items} />
        <CartRight summary={summary} />
      </div>
    </div>
  );
}
