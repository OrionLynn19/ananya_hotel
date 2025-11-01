"use client";
import Image from "next/image";

export default function Room1() {
    return (
        <div className="image-container relative w-full h-auto">
            <Image
                src="/images/room.png"
                alt="Room 1"
                width={1440}
                height={1024}
                className="z-0 w-full md:h-[1024px] h-[560px] object-cover"
            />
            <div className="absolute inset-0 z-10 bg-[#000000]/30"></div>
            <div className="flex flex-col justify-end items-center absolute inset-0 z-20 text-[#fcf9f6] font-poltawski py-8 md:py-30 mx-auto">
                <h1 className=" text-[20px] md:text-[35px] text-center md:w-3xl w-xs font-bold mb-4 md:mb-5">Luxury Ocean View Accommodations</h1>
                <p className=" text-center md:w-3xl w-2xs font-medium md:text-[24px] text-[16px]">
                    Experience unparalleled comfort in our premium accommodations
                    with breathtaking ocean views
                </p>
            </div>

        </div>
    );
}