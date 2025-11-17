"use client";

import React, { useEffect, useState } from "react";
import CartLeft from "../../../components/cart/CartLeft";
import CartRight from "../../../components/cart/CartRight";

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
      <div className="w-[1326px] mx-auto flex flex-col py-16 md:flex-row gap-6 md:gap-[18px] justify-center">
        <CartLeft items={data.items} />
        <CartRight summary={summary} />
      </div>
    </div>
  );
}
