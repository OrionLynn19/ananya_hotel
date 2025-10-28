"use client";

import CustomerCard from "./CustomerCard";
import { customers } from "./customersData";

export default function CustomerSection() {
 
  const lane = [...customers, ...customers];

  return (
    <section className="w-full bg-[#FFFCF1] text-[#3b2a16] py-14 md:py-20 overflow-hidden">
     
      <div className="px-4 flex flex-col items-center text-center">
        <div className="w-full max-w-[800px]">
         
          <h2 className="text-[#3b2a16] text-[28px] md:text-[36px] font-serif font-semibold leading-tight">
            Waves of Happy Guests
          </h2>

          
          <p className="mt-4 text-[#4a3a24] text-[16px] md:text-[20px] leading-relaxed font-serif">
            See what travelers loved about their stay by the sea.
          </p>
        </div>
      </div>

      
      <div className="relative mt-12 md:mt-16 w-full overflow-hidden">
       
        <div className="pointer-events-none absolute left-0 top-0 h-full w-16 bg-[linear-gradient(to_right,#FFFCF1_0%,rgba(255,252,241,0)_100%)] z-20" />
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-[linear-gradient(to_left,#FFFCF1_0%,rgba(255,252,241,0)_100%)] z-20" />

       
        <div
          className="flex gap-6 md:gap-10 animate-[marquee_20s_linear_infinite]"
          style={{
            minWidth: "max-content",
          }}
        >
          {lane.map((c, i) => (
            <div
              key={i}
              className="pt-10 pb-12 flex justify-center items-start"
              style={{
                width: "260px",
              }}
            >
              <CustomerCard item={c} />
            </div>
          ))}
        </div>
      </div>

      
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>
    </section>
  );
}
