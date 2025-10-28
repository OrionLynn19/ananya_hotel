"use client";

import Image from "next/image";
import { Customer } from "./customersData";

type Props = {
  item: Customer;
};

export default function CustomerCard({ item }: Props) {
  return (
    <div className="w-[240px] sm:w-[260px] md:w-[300px]">
      <div
        className="
          relative flex flex-col items-center justify-between
          rounded-xl
          border border-[rgba(184,151,94,0.18)]
          bg-[linear-gradient(to_bottom,#FFFFFF_0%,#FFFCF8_70%,#FBF8ED_100%)]
          shadow-[0_20px_60px_rgba(0,0,0,0.12)]
          text-center
          overflow-visible
          h-[260px] sm:h-[270px] md:h-[280px]
        "
      >
        {/* Avatar */}
        <div
          className="
            absolute left-1/2 -translate-x-1/2
            -top-[28px]
            w-[56px] h-[56px] sm:w-[60px] sm:h-[60px]
            rounded-full overflow-hidden
            bg-white
            ring-[3px] ring-[#FFFCF1]
            border border-[rgba(184,151,94,0.4)]
            shadow-[0_14px_24px_rgba(0,0,0,0.25)]
            flex items-center justify-center
          "
        >
          <Image
            src={item.avatar}
            alt={item.name}
            width={60}
            height={60}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div
          className="
            flex flex-col items-center justify-between
            px-5 pt-[44px] pb-5
            flex-1
            text-center
          "
        >
          {/* Quote mark */}
          <div className="text-black/70 text-[16px] leading-none self-start mb-3 sm:text-[18px]">
            &#8220;
          </div>

          {/* Quote text */}
          <p className="text-[13px] leading-relaxed text-[#2b2b2b] max-w-[220px] sm:max-w-[240px] sm:text-[13.5px] md:text-[13.5px] flex-1">
            {item.quote}
          </p>

          {/* Name + label */}
          <div className="mt-4 text-[#3b2a16]">
            <p className="text-[12.5px] font-semibold sm:text-[13px]">
              {item.name}
            </p>
            <p className="text-[11px] text-[rgba(60,45,20,0.6)] italic">
              Verified Guest
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
