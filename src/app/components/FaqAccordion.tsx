"use client";

import { useState } from "react";
import type { FaqRow } from "@/app/data/faq.data";

export default function FaqAccordion({ items }: { items: FaqRow[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="w-full bg-white py-14 md:py-20">
      
      <div className="mx-auto max-w-5xl text-center px-5">
        <h2 className="font-serif text-[#3b2a16] text-[26px] sm:text-[32px] md:text-[38px] font-semibold">
          Got Questions? We’ve Got Answers
        </h2>
        <p className="mt-3 text-[#6b5a42] text-[15px] sm:text-[16px] md:text-[18px]">
          Find quick answers to the most common inquiries.
        </p>
      </div>

      
      <div className="mx-auto mt-8 md:mt-12 max-w-[92rem] px-4 sm:px-6">
        <div className="rounded-[22px] bg-[#fff7ea] border border-[#ecdcc6] shadow-[0_12px_40px_rgba(0,0,0,0.06)]">
          {items.map((item, i) => {
            const isOpen = openIndex === i;

            return (
              <div key={i}>
                
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full text-left flex items-center gap-3 sm:gap-4
                             px-5 sm:px-8 lg:px-12 py-5 sm:py-7 lg:py-8"
                >
                  <span className="flex-1 font-serif text-[#3b2a16]
                                   text-[17px] sm:text-[20px] lg:text-[24px] leading-snug">
                    {item.question}
                  </span>

                  
                  <svg
                    className={`h-5 w-5 sm:h-6 sm:w-6 lg:h-7 lg:w-7 shrink-0 text-[#6b5a42]
                                transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>

                
                {i < items.length - 1 && (
                  <div className="px-5 sm:px-8 lg:px-12">
                    <div className="h-px bg-[#d9cbb5]" />
                  </div>
                )}

                
                <div
                  id={`faq-panel-${i}`}
                  className={`grid transition-[grid-template-rows] duration-300 ease-out
                              px-5 sm:px-8 lg:px-12 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <div className="pb-5 sm:pb-7 lg:pb-9 text-[#4a3a24]
                                    text-[15px] sm:text-[17px] lg:text-[18px] leading-relaxed">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
