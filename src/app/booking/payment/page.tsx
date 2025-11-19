"use client";
import React from "react";
import PaymentCartSummary from "@/components/cart/PaymentCartSummary";

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

type Summary = { totalGuests: string; totalCost: number };

export default function PaymentPage() {
  const [items, setItems] = React.useState<CartItem[]>([]);
  const [summary, setSummary] = React.useState<Summary>({
    totalGuests: "0 Adults",
    totalCost: 0,
  });

  React.useEffect(() => {
    // fetch mock API /api/cart
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setSummary(data.summary || { totalGuests: "0 Adults", totalCost: 0 });
      })
      .catch(() => {});
  }, []);

  return (
    <main>
      <div className="w-full max-w-[1326px] mx-auto px-4 py-16 md:flex md:gap-6">
        <section className="flex-1"></section>

        <PaymentCartSummary
          items={items}
          summary={summary}
          onChange={(it, s) => {
            setItems(it);
            setSummary(s);
          }}
        />
      </div>
    </main>
  );
}
