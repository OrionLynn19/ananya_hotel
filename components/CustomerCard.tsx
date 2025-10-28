"use client";

import Image from "next/image";
import { Customer } from "./customersData";

type Props = {
  item: Customer;
};

export default function CustomerCard({ item }: Props) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Avatar floating on top */}
      <div className="absolute -top-[48px] z-20 left-1/2 -translate-x-1/2">
        <div className="w-[72px] h-[72px] rounded-full overflow-hidden bg-white shadow-[0_16px_32px_rgba(0,0,0,0.28)] ring-[4px] ring-[#FFFCF1] border border-[#d9d7cf]">
          <Image
            src={item.avatar}
            alt={item.name}
            width={72}
            height={72}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Card body */}
      <div className="relative w-[260px] md:w-[300px] bg-white text-[#0f0f0f] shadow-[0_24px_60px_rgba(0,0,0,0.07)] rounded-[20px] border border-[#E2E0D8] pt-14 pb-8 px-5 text-center">
        {/* top quote marks */}
        <div className="absolute left-5 top-5 text-black/80 text-xl leading-none select-none">
          &#8220;&#8220;
        </div>

        {/* message */}
        <p className="text-[13px] leading-relaxed text-[#1a1a1a]">
          {item.quote}
        </p>

        {/* name */}
        <p className="mt-5 text-[13px] font-semibold text-[#1a1a1a]">
          {item.name}
        </p>

        {/* lil bottom curve illusion */}
        <div className="absolute left-0 right-0 -bottom-[10px] mx-auto h-[20px] w-[90%] rounded-b-[24px] border-x border-b border-[#E2E0D8] bg-white shadow-[0_18px_24px_rgba(0,0,0,0.06)]" />
      </div>
    </div>
  );
}
