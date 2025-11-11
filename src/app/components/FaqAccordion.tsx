"use client";

import { useState } from "react";
import { FAQ_DATA } from "../data/faq.data";

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-[#FFFBF3] py-10 md:py-14">
      <div className="mx-auto max-w-3xl text-center px-4">
        <h2 className="font-serif text-[#3b2a16] text-[22px] md:text-[28px] font-semibold">
          Got Questions? We’ve Got Answers
        </h2>
        <p className="mt-2 text-[#6b5a42] text-[14px] md:text-[15px]">
          Find quick answers to the most common inquiries.
        </p>
      </div>

      <div className="mx-auto mt-8 md:mt-10 max-w-4xl px-4">
        <div className="rounded-[18px] bg-[#fff7ea] border border-[#ecdcc6] shadow-[0_8px_28px_rgba(0,0,0,0.06)]">
          {FAQ_DATA.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left px-6 md:px-8 py-5 md:py-6 flex items-center gap-4"
                >
                  <span className="flex-1 font-serif text-[#3b2a16] text-[17px] md:text-[20px]">
                    {item.question}
                  </span>

                  <svg
                    className={`h-5 w-5 text-[#6b5a42] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                {/* Divider */}
                {i < FAQ_DATA.length - 1 && (
                  <div className="px-6 md:px-8">
                    <div className="h-px bg-[#d9cbb5]" />
                  </div>
                )}

                {isOpen && (
                  <div className="px-6 md:px-8 pb-6 md:pb-7 text-[#4a3a24] text-[14.5px] leading-relaxed">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
