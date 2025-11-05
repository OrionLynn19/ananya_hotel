"use client";
import { useState } from "react";
import RoomSlider from "./roomcardslider";
import DinningSlider from "./dinningcardslider";
import HealthSlider from "./healthcardslider";
import Image from "next/image";

export default function HomeSection2() {
    const [activeTab, setActiveTab] = useState("room");
    const [isTransitioning, setIsTransitioning] = useState(false);

    const handleTabChange = (tab: string) => {
        if (activeTab === tab) return; 

        setIsTransitioning(true);
        setTimeout(() => {
            setActiveTab(tab);
            setTimeout(() => {
                setIsTransitioning(false);
            }, 100);
        }, 300);
    };

    const getSlider = () => {
        switch (activeTab) {
            case "room":
                return <RoomSlider />;
            case "dinning":
                return <DinningSlider />;
            case "health":
                return <HealthSlider />;
            default:
                return <RoomSlider />;
        }
    };

    const getHeading = () => {
        switch (activeTab) {
            case "room":
                return "Cozy Rooms with Spacious and Breathtaking Views";
            case "dinning":
                return "Exquisite Dining Experiences in Stunning Settings";
            case "health":
                return "Health & Wellness Services";
            default:
                return "Cozy Rooms with Spacious and Breathtaking Views";
        }
    };

    const getButtonText = () => {
        switch (activeTab) {
            case "room":
                return "See All Rooms";
            case "dinning":
                return "See Details";
            case "health":
                return "See All Services";
            default:
                return "See All Rooms";
        }
    };

    const getBackgroundImage = () => {
        switch (activeTab) {
            case "room":
                return "/Images/home2-bg1.png";
            case "dinning":
                return "/Images/home2-bg2.png";
            case "health":
                return "/Images/home2-bg3.png";
            default:
                return "/Images/home2-bg1.png";
        }
    };

    return (
        <div className="bg-white p-3 md:p-5">
            <div className="flex justify-center p-2 md:p-4 text-[#463214] font-poltawski flex-wrap gap-2 md:gap-0">
                <h1
                    onClick={() => handleTabChange("room")}
                    className={`px-4 md:px-10 cursor-pointer transition-opacity ${activeTab === "room" ? "text-[20px] md:text-[28px] font-bold " : " text-[16px] md:text-[22px] font-semibold"}`}
                >
                    Room
                </h1>
                <h1
                    onClick={() => handleTabChange("dinning")}
                    className={`px-4 md:px-10 cursor-pointer transition-opacity ${activeTab === "dinning" ? "text-[20px] md:text-[28px] font-bold " : " text-[16px] md:text-[24px] font-semibold"}`}
                >
                    Dinning
                </h1>
                <h1
                    onClick={() => handleTabChange("health")}
                    className={`px-4 md:px-10 cursor-pointer transition-opacity ${activeTab === "health" ? "text-[20px] md:text-[28px] font-bold " : " text-[16px] md:text-[24px] font-semibold"}`}
                >
                    Health
                </h1>
            </div>
            <div className="image-container relative max-w-[95%] md:max-w-[85%] h-auto min-h-[400px] md:h-[700px] rounded-3xl overflow-hidden mx-auto">
                <Image
                    src={getBackgroundImage()}
                    alt="bg1"
                    fill
                    style={{ objectFit: 'cover' }}
                    className={`z-0 rounded-3xl transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}
                    key={activeTab}
                />
                <div className="absolute inset-0 bg-[#3c3c3c]/50 z-10"></div>

                <div className="relative z-20 h-full grid grid-cols-1 md:grid-cols-[0.8fr_1.2fr] gap-4 md:p-0 p-8">
                    <div className="flex flex-col justify-center px-4 md:px-10 min-w-0 ">
                        <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                            <h1 className="text-white text-center md:text-left text-[20px] font-bold md:text-[30px] font-poltawski leading-tight">{getHeading()}</h1>
                            <div className="hidden md:block w-fit mt-5 rounded-2xl border" style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 5%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 50%)'}}>
                                <button className="px-4 py-2 rounded-2xl bg-[#463214]/12 hover:bg-[#463214]/30 text-[#fcf9f6] font-semibold text-[18px] font-poltawski">
                                    {getButtonText()}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center overflow-hidden min-w-0 md:mt-0 mt-3 ">
                        <div className={`transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                            {getSlider()}
                        </div>
                        <div className={`flex justify-center transition-opacity duration-500 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
                            <div className="block md:hidden w-fit mt-4 rounded-3xl border" style={{
                                background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 5%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.05) 50%)'}}>
                                <button className="px-3 py-2 rounded-3xl bg-[#463214]/12 hover:bg-[#463214]/30 text-[#fcf9f6] font-bold text-[14px] font-poltawski">
                                    {getButtonText()}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}