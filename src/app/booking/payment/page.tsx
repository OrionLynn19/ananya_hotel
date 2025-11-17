"use client";
import Image from "next/image";
import { useState } from "react";

export default function PaymentPage() {
    const [prefix, setPrefix] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [passportNumber, setPassportNumber] = useState("");
    const [email, setEmail] = useState("");
    const [phNumber, setPhNumber] = useState("");
    const [couponCode, setCouponCode] = useState("");
    const [arrivedBy, setArrivedBy] = useState("");
    const [specialRequest, setSpecialRequest] = useState("");

    const inputClass = "text-white placeholder-white/70 w-full h-10 rounded-lg mt-5 bg-[#7c6d58]/12 border backdrop-blur-lg border-[#ffffff]/20 px-3";

    return (
        <>
            <div className="w-full max-w-4xl h-screen md:py-15 py-10 md:px-10 px-5 text-white bg-[#463214]/6 backdrop-blur-2xl inset-shadow-xs inset-shadow-white/50 rounded-3xl overflow-y-scroll scrollbar-hide">
                <div className="w-full">
                    <h1 className="font-poltawski font-bold md:text-3xl text-xl ">Enter Your Details</h1>

                    <div className="block md:hidden mb-5 mt-8 w-1/2">
                        <label className="font-poltawski text-base">Prefix</label>
                        <input
                            value={prefix}
                            onChange={(e) => setPrefix(e.target.value)}
                            placeholder="Prefix"
                            className={inputClass}
                        />
                    </div>

                    <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-5">
                        <div className="hidden md:block ">
                            <div className="mb-5">
                                <label className="font-poltawski text-xl">Prefix</label>
                                <input
                                    value={prefix}
                                    onChange={(e) => setPrefix(e.target.value)}
                                    placeholder="Prefix"
                                    className={inputClass}
                                />
                            </div>
                            <div className="mb-10">
                                <label className="font-poltawski text-xl">Passport Number</label>
                                <input
                                    value={passportNumber}
                                    onChange={(e) => setPassportNumber(e.target.value)}
                                    placeholder="Passport Number"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="mb-5">
                                <label className="font-poltawski md:text-xl text-base">First Name</label>
                                <input
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    placeholder="First Name"
                                    className={inputClass}
                                />
                            </div>

                            <div className="block md:hidden mb-10">
                                <label className="font-poltawski text-base">Passport Number</label>
                                <input
                                    value={passportNumber}
                                    onChange={(e) => setPassportNumber(e.target.value)}
                                    placeholder="Passport Number"
                                    className={inputClass}
                                />
                            </div>

                            <div className="hidden md:block mb-10">
                                <label className="font-poltawski text-xl">Email Address</label>
                                <input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Email Address"
                                    className={inputClass}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="hidden md:block mb-5">
                                <label className="font-poltawski text-xl">Last Name</label>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    className={inputClass}
                                />
                            </div>
                            <div className="block md:hidden mb-5">
                                <label className="font-poltawski text-base">Last Name</label>
                                <input
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    placeholder="Last Name"
                                    className={inputClass}
                                />
                            </div>

                            <div className="md:mb-10 mb-5">
                                <label className="font-poltawski md:text-xl text-base">Ph Number</label>
                                <input
                                    value={phNumber}
                                    onChange={(e) => setPhNumber(e.target.value)}
                                    placeholder="Ph Number"
                                    className={inputClass}
                                />
                            </div>
                        </div>
                    </div>
                    
                    <div className="block md:hidden mb-10">
                        <label className="font-poltawski text-base">Email Address</label>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email Address"
                            className={inputClass}
                        />
                    </div>

                    <hr className="border-t w-full border-[#c2c2c2] mb-10" />

                    <h1 className="font-poltawski md:text-3xl text-xl mb-5">Coupon Code</h1>
                    <div className="flex items-center gap-5">
                        <input
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            placeholder="Enter Coupon Code"
                            className="text-white placeholder-white/70 md:w-1/2 w-full h-10 rounded-lg bg-[#7c6d58]/12 border backdrop-blur-lg border-[#ffffff]/20 px-3"
                        />
                        <button className="bg-[#7c6d58]/30 active:scale-95 transition-transform  inset-shadow-xs inset-shadow-white/50 border backdrop-blur-lg border-[#ffffff]/20 text-white/80 font-medium py-2 px-6 rounded-2xl">
                            Apply
                        </button>
                    </div>

                    <hr className="border-t w-full border-[#c2c2c2] my-10" />

                    <h1 className="font-poltawski font-bold md:text-3xl text-xl mb-5">Select a Payment Method</h1>
                    <div className="flex items-end md:gap-30 gap-3 md:px-8 px-0">
                        <div className="flex flex-col gap-4 w-1/2">
                            {[
                                { src: "/images/card1.png", label: "Credit Card" },
                                { src: "/images/card2.png", label: "Bank Transfer" },
                                { src: "/images/card3.png", label: "Mobile Banking" },
                            ].map((item, idx) => (
                                <div key={idx} className="flex items-center md:gap-3 gap-2">
                                    <Image src={item.src} alt={item.label} width={50} height={50} />
                                    <label className="text-white md:font-medium font-normal md:text-lg text-xs">{item.label}</label>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-col w-1/2">
                            <h1 className="md:font-medium font-normal text-center md:text-lg text-xs">We accept the following payment methods.</h1>
                            <div className="flex gap-3 justify-center mt-3">
                                {["/images/card4.png", "/images/card5.png", "/images/card6.png"].map((src, idx) => (
                                    <Image key={idx} src={src} alt="payment method" width={50} height={50} />
                                ))}
                            </div>
                        </div>
                    </div>

                    <hr className="border-t w-full border-[#c2c2c2] my-10" />
                    <h1 className="font-poltawski font-bold md:text-3xl text-xl mb-5">Optional Information</h1>
                    <div>
                        <div className="mb-5 w-1/2">
                            <label className="font-poltawski md:text-xl text-base">Arrived by</label>
                            <input
                                value={arrivedBy}
                                onChange={(e) => setArrivedBy(e.target.value)}
                                placeholder="Enter your arrival time"
                                className={inputClass}
                            />
                        </div>
                        <div className="mb-5">
                            <label className="font-poltawski md:text-xl text-base">Your special request</label>
                            <textarea
                                value={specialRequest}
                                onChange={(e) => setSpecialRequest(e.target.value)}
                                placeholder="eg. bed preference"
                                className="text-white placeholder-white/70 w-full h-40 rounded-lg mt-5 bg-[#7c6d58]/12 border backdrop-blur-lg border-[#ffffff]/20 p-3"
                            >
                            </textarea>
                        </div>
                    </div>

                </div>
            </div>

            <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
        </>
    );
}
