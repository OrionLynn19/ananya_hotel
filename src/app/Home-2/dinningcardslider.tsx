"use client";
import RoomCards from "./cards";
import { diningData } from "../data/cardbranchdata";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

export default function DinningSlider() {
    return (
        <div className="relative w-full overflow-hidden">
            <Swiper
                modules={[Navigation]}
                slidesPerView="auto"
                spaceBetween={15}
                breakpoints={{
                    640: {
                        spaceBetween: 20,
                    },
                    768: {
                        spaceBetween: 30,
                    },
                }}
                navigation={{
                    nextEl: '.swiper-button-next-custom',
                    prevEl: '.swiper-button-prev-custom',
                }}
               
                className="slider"
            >
                {diningData.map((data, index) => (
                    <SwiperSlide key={index} className="w-auto!">
                        <RoomCards
                            image={data.image}
                            name={data.name}
                            description={data.description}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
            
            <div className="flex justify-center md:justify-start gap-4 md:gap-8 mt-5 md:mt-8">
                <button className="swiper-button-prev-custom w-8 h-8 md:w-12 md:h-12 rounded-full bg-white hover:bg-[#463214] border-[#463214] border-2 flex items-center justify-center shadow-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#463214" className="w-4 h-4 md:w-6 md:h-6 hover:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                </button>
                <button className="swiper-button-next-custom w-8 h-8 md:w-12 md:h-12 rounded-full border-[#463214] border-2 bg-white hover:bg-[#463214] flex items-center justify-center shadow-lg transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="#463214" className="w-4 h-4 md:w-6 md:h-6 hover:stroke-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                    </svg>
                </button>
            </div>
        </div>
    );
}