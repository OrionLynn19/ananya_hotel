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

    async function fetchCart() {
      try {
        const res = await fetch("/api/cart");
        const json = await res.json();
        if (mounted) {
          setData(json);
        }
      } catch (err) {
        console.error("Failed to fetch cart", err);
      }
    }

    fetchCart();

    const handleCartUpdate = () => {
      fetchCart();
    };

    window.addEventListener("cart-updated", handleCartUpdate);

    return () => {
      mounted = false;
      window.removeEventListener("cart-updated", handleCartUpdate);
    };
  }, []);

  if (!data || !data.summary) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-white text-xl">Loading cart...</div>
      </div>
    );
  }

  if (data.items.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white">
          <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
          <p className="text-white/70">Add some rooms to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row gap-6">
          <CartLeft items={data.items} />
          <CartRight 
            summary={data.summary} 
            items={data.items}
            continueHref="payment"
          />
        </div>

        <div className="md:hidden mt-6">
          <MobileCartSummary summary={data.summary} />
        </div>
      </div>
    </main>
  );
}
