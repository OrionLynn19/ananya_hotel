"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function BookingConfirmed() {
  const router = useRouter();

  return (
    <div className="flex items-center justify-center p-6">
      <div
        className="max-w-[272px] md:max-w-[1010px] bg-[rgba(255,255,255,0.06)] backdrop-blur-md rounded-[18px] md:rounded-[35px] p-[15px] md:p-8 text-center shadow-lg"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
        }}
      >
        <div className="flex justify-center mb-4 md:mb-6">
          <div className="w-[50px] h-[50px] md:w-[120px] md:h-[120px] rounded-full flex items-center justify-center">
            <Image
              src="/Images/cartIcons/Check.png"
              alt="Confirmed"
              width={90}
              height={90}
            />
          </div>
        </div>

        <div className="text-[18px] md:text-[40px] font-poltawski font-bold text-white pt-5 md:pt-0 mb-2.5 md:mb-2 whitespace-nowrap">
          Your booking is confirmed
        </div>
        <div className="text-[18px] md:text-[40px] font-poltawski font-bold text-white pb-11 md:pb-0 md:mb-16 whitespace-nowrap">
          Thanks For Choosing ANAYA
        </div>

        <div className="flex px-2.5 md:px-0md:gap-[191px] justify-center">
          <button
            onClick={() => router.push("/booking/rooms")}
            className="min-w-[116px] md:min-w-[250px] text-[12px] md:text-[24px] font-poltawski md:font-montserrat font-medium px-3 py-[5px] md:px-2 md:py-2 rounded-[20px] hover:bg-white/5 cursor-pointer"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
            }}
          >
            Explore Rooms
          </button>

          <button
            onClick={() => (window.location.href = "/")}
            className="min-w-[116px] md:min-w-[250px] text-[12px] md:text-[24px] font-poltawski md:font-montserrat font-medium px-3 py-[5px] md:px-2 md:py-2 rounded-[20px] hover:bg-white/5 cursor-pointer"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
            }}
          >
            Back To Website
          </button>
        </div>
      </div>
    </div>
  );
}
