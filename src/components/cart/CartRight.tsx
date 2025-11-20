"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Props = {
  summary: { totalGuests: string; totalCost: number };
  continueHref?: string;
  items?: Array<{ beds: string[]; pricePerNight: number; nights: number }>;
};

export default function CartRight({
  summary,
  continueHref = "payment",
  items = [],
}: Props) {
  const router = useRouter();

  // ✅ Calculate extra bed breakdown
  const extraBedItems = items.filter((item) => 
    item.beds && item.beds[0] === "Extra Bed"
  );
  
  const extraBedCount = extraBedItems.length;
  
  const extraBedCost = extraBedItems.reduce((sum, item) => {
    return sum + (800 * item.nights);
  }, 0);
  
  const baseCost = summary.totalCost - extraBedCost;

  return (
    <aside
      className="w-full md:w-[441px] md:h-fit shrink-0 bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-[35px] p-4 md:p-6"
      style={{
        boxShadow:
          "inset 0 2px 0 rgba(255,255,255,0.4), inset 0 -2px 0 rgba(255,255,255,0.4)",
      }}
    >
      <h3 className="text-[24px] font-poltawski font-bold text-white mb-6">
        Booking Summary
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-[18px] text-white/90">
          <div>Total Guests</div>
          <div>{summary.totalGuests}</div>
        </div>

        <hr className="border-white/20 my-4" />

        {/* ✅ Show breakdown if there are extra beds */}
        {extraBedCount > 0 && (
          <div className="space-y-3">
            <div className="flex justify-between text-[16px] text-white/80">
              <div>Room Packages</div>
              <div>THB {baseCost.toLocaleString()}</div>
            </div>
            
            <div className="flex justify-between text-[16px] text-yellow-300 font-medium">
              <div>Extra Bed × {extraBedCount}</div>
              <div>+ THB {extraBedCost.toLocaleString()}</div>
            </div>
            
            <hr className="border-white/20 my-3" />
          </div>
        )}

        <div className="flex justify-between items-end">
          <div className="text-[20px] font-medium text-white">Total Cost</div>
          <div className="text-[28px] font-bold text-white">
            THB {summary.totalCost.toLocaleString()}
          </div>
        </div>

        <div className="text-[12px] text-white/60 mt-2">
          Including taxes and fees
        </div>
      </div>

      <button
        onClick={() => router.push(`/booking/${continueHref}`)}
        className="w-full mt-8 bg-white text-black py-3.5 rounded-full text-[16px] font-semibold hover:bg-white/90 transition-all shadow-lg"
      >
        Continue to Payment
      </button>
    </aside>
  );
}
