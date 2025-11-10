"use client";
import { useState } from "react";
import Image from "next/image";

interface LocationInfo {
    contactNumber: string;
    email: string;
    address: string;
}

 const locations: Record<string, LocationInfo> = {
        'Hua Hin': {
            contactNumber: '08-9765098',
            email: 'AnayaHuahin@hos.ca.cc',
            address: '123 Seashore Drive, Hua Hin'
        },
        'Pattaya': {
            contactNumber: '08-9765099',
            email: 'AnayaPattaya@hos.ca.cc',
            address: '123 Seashore Drive, Pattaya'
        },
        'Phuket': {
            contactNumber: '08-9765011',
            email: 'AnayaPhuket@hos.ca.cc',
            address: '123 Seashore Drive, Phuket'
        }
    };
export default function FAQ2() {
    const [selectedLocation, setSelectedLocation] = useState<keyof typeof locations>('Hua Hin');

    return (
        <div className="relative w-full h-auto max-h-[1024px]">
            <Image src="/images/faq1.png"
                alt="FAQ Image"
                width={1440}
                height={1024}
                className="z-0 md:h-[1024px] h-[500px] object-cover"
            />
            <div className="absolute inset-0 z-10 bg-linear-to-b from-[#463214]/90 to-[#463214]/0 "></div>
            <div className="absolute inset-0 z-20 font-poltawski ">
                <h1 className="flex justify-center text-white font-bold md:text-5xl  text-xl md:mt-30 mt-12">Get In Touch</h1>
                <div className="flex md:justify-start justify-center md:gap-8 gap-4 md:mt-20 mt-5 max-w-[80%] md:px-10 px-0 mx-auto"> 
                    {Object.keys(locations).map((location) => (
                        <button
                            key={location}
                            onClick={() => setSelectedLocation(location)}
                            className={`cursor-pointer text-white font-medium md:text-xl text-sm rounded-xl py-2 px-4 backdrop-blur-3xl
                            ${selectedLocation === location
                                    ? "bg-[#463214]/60 scale-105 border border-[#8B5E3C] shadow-[0_0_15px_rgba(139,94,60,0.5)]"
                                    : "bg-[#463214]/20 border border-transparent hover:bg-[#6b4726]/30 hover:scale-105"
                                }`}
                            >
                            {location}
                        </button>
                    ))}
                </div>
                <div className="grid md:grid-cols-2 grid-cols-1 md:mt-15 mt-5 max-w-[80%] mx-auto md:px-10 px-0 gap-30"> 
                    <div className="font-poltawski ">
                        <div>
                            <h3 className="text-white font-semibold md:text-3xl text-base">Contact Number</h3>
                            <p className="text-white font-medium md:text-2xl text-sm md:mt-5 mt-2">{locations[selectedLocation].contactNumber}</p>
                            <hr className="border-t border-white max-w-[450px] md:my-10 my-3" />
                        </div>

                        <div className="block md:hidden">
                            <h3 className="text-white font-semibold text-base">Email Address</h3>
                            <p className="text-white font-medium text-sm mt-2">{locations[selectedLocation].email}</p>
                            <hr className="border-t border-white max-w-[450px] my-3" />
                        </div>

                        <div>
                            <h3 className="text-white font-semibold md:text-3xl text-base">Address</h3>
                            <p className="text-white font-medium md:text-2xl text-sm md:mt-5 mt-2">{locations[selectedLocation].address}</p>
                            <hr className="border-t border-white max-w-[450px] md:my-10 my-3" />
                        </div>
                        <div className="flex md:justify-start justify-center md:gap-0 gap-2 ">
                            <Image 
                            src="/images/faq2.png" 
                            alt="tiktok" 
                            height={90}
                            width={90}
                            className="md:w-[90px] w-15 md:h-[90px] h-15"/>
                            <Image 
                            src="/images/faq3.png" 
                            alt="facebook" 
                            height={90}
                            width={90}
                            className="md:w-[90px] w-15 md:h-[90px] h-15"/>
                            <Image 
                            src="/images/faq4.png" 
                            alt="X" 
                            height={90}
                            width={90}
                            className="md:w-[90px] w-15 md:h-[90px] h-15"/>
                            <Image 
                            src="/images/faq5.png" 
                            alt="instagram" 
                            height={90}
                            width={90}
                            className="md:w-[90px] w-15 md:h-[90px] h-15"/>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        <h3 className="text-white font-semibold text-3xl ">Email Address</h3>
                        <p className="text-white font-medium text-2xl mt-5">{locations[selectedLocation].email}</p>
                        <hr className="border-t border-white max-w-[450px] my-10 " />
                    </div>
                </div>


            </div>
        </div>

    )
}