"use client";
import Image from "next/image";
import React from "react";
import Discover4 from "../components/Discover4";
import WhatsNearbyMobile from "@/components/WhatsNearbyMobile";
import WhatsNearbyDesktop from "@/components/WhatsNearbyDesktop";
export default function Discover() {
    return (
        <>
            <div className="image-container1 relative w-full h-auto">
                <Image
                    src="/images/discover1.png"
                    alt="Room 1"
                    width={1440}
                    height={1024}
                    className="z-0 w-full md:h-[1024px] h-[560px] object-cover"
                />
                <div className="absolute inset-0 z-10 bg-linear-to-b from-white/5 to-[#463214]/40"></div>
                <div className="flex flex-col justify-end items-center absolute inset-0 z-20 text-[#fcf9f6] font-poltawski py-15 md:py-25 mx-auto">
                    <h1 className=" text-[20px] md:text-[35px] text-center md:w-3xl w-xs font-bold mb-2">Discover</h1>
                    <p className=" text-center md:w-3xl w-xs font-medium md:text-[24px] text-[16px]">
                        Discover our beachfront locations, each with its own unique charm and scenery.
                    </p>
                </div>
            </div>
            <div className="container w-full h-auto mx-auto mt-10">
                <div className=" hidden md:flex flex-col text-center items-center font-poltawski text-[#463214]">
                    <h1 className="md:text-[32px] text-[20px] mb-2 font-bold">Find Us by the Shore</h1>
                    <p className="md:text-[24px] text-[16px] max-w-3xl font-medium">
                        Discover our beachfront locations, each with its own unique charm and scenery. Find the perfect view that matches you
                    </p>
                </div>
               

                <div className="relative flex md:justify-center justify-start pl-5 md:mt-10 mt-0">
                    <Image
                        src="/images/discover2.png"
                        alt="Room 1"
                        width={600}
                        height={300}
                        className="z-0 md:w-[600px] w-[300px] h-auto max-h-[500px] object-cover rounded-xl"
                    />

                    <div className="absolute top-[12%] right-0 md:top-[10%] md:right-[14%] flex items-center gap-3 md:w-xs w-[140px] bg-[#fcf9f6] shadow-lg shadow-[#000000]/15 md:py-4 py-2 px-2 md:px-3 rounded-xl z-10">
                        <Image
                            src="/images/discover3.png"
                            alt="Room 1"
                            width={60}
                            height={60}
                            className="md:w-15 md:h-15 w-12 h-12 object-cover "
                        />
                        <div>
                            <h1 className="text-[9px] md:text-[15px] font-bold font-poltawski">ANANAYA Pattaya</h1>
                            <p className="text-[7px] md:text-[12px] font-montserrat font-medium">
                                46/24 Pattaya Sai 1 Road, Nong Pe, Bang Lag, Chon Buri 2050, Thailand
                            </p>
                        </div>
                    </div>

                    <div className="absolute bottom-[18%] left-[5%] md:bottom-[20%] md:left-[20%] flex items-center md:w-xs w-[145px] gap-3 bg-[#fcf9f6] shadow-lg shadow-[#000000]/12 md:py-4 py-2 px-2 md:px-3 rounded-xl z-10">
                        <Image
                            src="/images/discover3.png"
                            alt="Room 1"
                            width={60}
                            height={60}
                            className="md:w-15 md:h-15 w-12 h-12 object-cover "
                        />
                        <div>
                            <h1 className="text-[9px] md:text-[15px] font-bold font-poltawski">ANANAYA Hua Hin</h1>
                            <p className="text-[7px] md:text-[12px] font-montserrat font-medium">
                                46/24 Pattaya Sai 1 Road, Nong Pe, Bang Lag, Chon Buri 2050, Thailand
                            </p>
                        </div>
                    </div>

                    <div className="absolute bottom-[2%] right-[5%] md:bottom-[3%] md:right-[18%] flex items-center md:w-xs w-[140px] gap-3 bg-[#fcf9f6] shadow-lg shadow-[#000000]/12 md:py-4 py-2 px-2 md:px-3 rounded-xl z-10">
                        <Image
                            src="/images/discover3.png"
                            alt="Room 1"
                            width={60}
                            height={60}
                            className="md:w-15 w-12 md:h-15 h-12 object-cover "
                        />
                        <div>
                            <h1 className="text-[9px] md:text-[15px] font-bold font-poltawski">ANANAYA Phuket</h1>
                            <p className="text-[7px] md:text-[12px] font-montserrat font-medium">
                                46/24 Pattaya Sai 1 Road, Nong Pe, Bang Lag, Chon Buri 2050, Thailand
                            </p>
                        </div>
                    </div>
                </div>
                <div className=" md:hidden flex flex-col text-center items-center font-poltawski text-[#463214] mt-7 px-5">
                    <h1 className="md:text-[32px] text-[20px] mb-2 font-bold">Find Us by the Shore</h1>
                    <p className="md:text-[24px] text-[16px] max-w-3xl font-medium">
                        Discover our beachfront locations, each with its own unique charm and scenery. Find the perfect view that matches you
                    </p>
                </div>

            </div>
             <div className="w-full lg:hidden">
                    <WhatsNearbyMobile />
                </div>
                <div className="hidden lg:block w-full">
                    <WhatsNearbyDesktop />
                </div>

            <Discover4 />
        </>
    )
}