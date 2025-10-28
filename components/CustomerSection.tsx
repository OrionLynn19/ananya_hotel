"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

import CustomerCard from "./CustomerCard";
import { customers } from "./customersData";

export default function CustomerSection() {
  return (
    <section className="w-full bg-[#FFFCF1] py-16 px-4 text-center text-[#3b2a16]">
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <h2 className="text-[20px] md:text-[24px] font-semibold text-[#3b2a16]">
          Waves of Happy Guests
        </h2>
        <p className="mt-3 text-[14px] md:text-[15px] text-[#4a3a24]">
          See what travelers loved about their stay by the sea.
        </p>

        {/* Slider */}
        <div className="mt-12">
          <Swiper
            modules={[Autoplay]}
            loop
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            speed={600}
            slidesPerView={1.15}
            spaceBetween={20}
            breakpoints={{
              480: { slidesPerView: 1.4, spaceBetween: 24 },
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
            className="!overflow-visible"
          >
            {customers.map((c) => (
              <SwiperSlide
                key={c.id}
                className="flex justify-center pb-12 pt-10"
              >
                <CustomerCard item={c} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
