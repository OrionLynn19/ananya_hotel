"use client";
import React from "react";
import { useRouter } from "next/navigation";

type Summary = {
  totalGuests: string;
  totalCost: number;
};

type Props = {
  summary: Summary;
  continueHref?: string;
};

export default function CartRight({
  summary,
  continueHref = "payment",
}: Props) {
  const router = useRouter();
  return (
    <aside
      className="w-full md:w-[441px] md:h-[279px] shrink-0 bg-linear-to-br from-white/5 to-white/10  backdrop-blur-lg rounded-[35px] p-4 md:p-6"
      style={{
        boxShadow:
          "inset 0 2px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(255,255,255,1)",
      }}
    >
      <h3 className="text-[24px] font-poltawski font-bold text-white mb-4">
        Booking Summary
      </h3>

      <div className="space-y-4">
        <div className="flex justify-between text-[18px] text-white/90">
          <div>Total Guests</div>
          <div>{summary.totalGuests}</div>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-[18px] text-white/90">Total Costs</div>
          <div className="text-[22px] font-medium text-white">
            THB {summary.totalCost}
          </div>
        </div>

        <div className="text-[12px] text-white/60">
          Including taxes and fees
        </div>

        <button
          type="button"
          onClick={() => router.push(continueHref)}
          disabled={summary.totalCost === 0}
          className={`mt-4 mx-auto block w-[139px] bg-[#463214]/25  text-white px-6 py-3 rounded-[20px] text-center ${
            summary.totalCost === 0
              ? "opacity-50 cursor-not-allowed"
              : "cursor-pointer"
          }`}
          style={{
            boxShadow:
              "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
          }}
        >
          Continue
        </button>
      </div>
    </aside>
  );
}
