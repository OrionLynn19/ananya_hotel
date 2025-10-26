"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const steps = [
  {
    title: "Weddings",
    desc: "Celebrate your special day with us. Our dedicated team ensures every detail is perfect from beach front ceremonies to elegant receptions.",
    img: "/images/wedding.jpg",
  },
  {
    title: "Events",
    desc: "Celebrate your special day with us. Our dedicated team ensures every detail is perfect from beach front ceremonies to elegant receptions.",
    img: "/images/events.png",
  },
  {
    title: "Workshops",
    desc: "Celebrate your special day with us. Our dedicated team ensures every detail is perfect from beach front ceremonies to elegant receptions.",
    img: "/images/workshop.png",
  },
  {
    title: "Creators",
    desc: "Celebrate your special day with us. Our dedicated team ensures every detail is perfect from beach front ceremonies to elegant receptions.",
    img: "/images/creators.png",
  },
];

export default function JourneySection() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section className="w-full flex flex-col items-center text-center bg-white pb-8 md:pb-8">
      {/* Section Heading */}
      <div className="max-w-6xl px-4 md:px-2 mb-8 md:mb-[70px] mt-8 md:mt-12">
        <h2 
          className="font-bold text-center mb-4 md:mb-6 text-[32px] md:text-[48px] leading-tight"
          style={{
            fontFamily: "'Poltawski Nowy', serif",
            fontWeight: 700,
            letterSpacing: "0px",
            color: "rgba(70, 50, 20, 1)",
          }}
        >
          From 'I Do' to Business Breakthroughs
        </h2>
        <p 
          className="text-center text-[18px] md:text-[32px] leading-[140%] md:leading-[100%] px-4 md:px-0"
          style={{
            fontFamily: "'Poltawski Nowy', serif",
            fontWeight: 200,
            letterSpacing: "0px",
            color: "rgba(70, 50, 20, 1)",
            marginTop: "16px",
            marginBottom: "0px",
          }}
        >
          We host it all — weddings, social celebrations, and corporate events — with<br className="hidden md:block" /> beachfront style and service that guarantees satisfaction.
        </p>
      </div>

      {/* Desktop Layout */}
      <div
        className="hidden md:flex justify-center items-center gap-[5px] mx-auto"
        style={{ width: "1217px", height: "auto" }}
      >
        {steps.map((step, i) => (
          <motion.div
            key={i}
            onHoverStart={() => setHovered(i)}
            onHoverEnd={() => setHovered(null)}
            animate={{ width: hovered === i ? 391 : 258 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="h-[594px] relative rounded-[16px] overflow-hidden cursor-pointer"
            style={{ background: "rgba(21, 21, 21, 0.35)" }}
          >
            {/* Image with overlay */}
            <div className="relative w-full h-full">
              <img
                src={step.img}
                alt={step.title}
                className="w-full h-full object-cover opacity-100"
              />
              <div 
                className="absolute inset-0" 
                style={{ background: "rgba(21, 21, 21, 0.35)" }}
              />
            </div>

            {/* Overlay with Content */}
            <motion.div 
              className="absolute bottom-0 left-0 right-0 p-4" 
              style={{ 
                background: hovered === i ? "rgba(21, 21, 21, 0.5)" : "rgba(21, 21, 21, 0.35)",
                borderTop: hovered === i ? "1px solid rgba(128, 128, 128, 0.5)" : "none",
              }}
              animate={{
                backdropFilter: hovered === i ? "blur(10px)" : "blur(2px)",
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              <motion.h3 
                className="text-3xl font-bold"
                style={{
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  display: "inline-block",
                }}
                animate={{
                  backgroundImage: hovered === i 
                    ? "linear-gradient(180deg, rgba(252, 249, 246, 1) 0%, rgba(252, 249, 246, 1) 100%)" 
                    : "linear-gradient(180deg, rgba(252, 249, 246, 0.75) 50%, rgba(150, 148, 146, 0.75) 100%)",
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                {step.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hovered === i ? 1 : 0,
                  height: hovered === i ? "170px" : 0,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                style={{
                  color: "rgba(252, 249, 246, 1)",
                  fontWeight: "bold",
                  textAlign: "left",
                }}
                className="text-xl overflow-hidden mt-2"
              >
                {step.desc}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden w-full px-4 pb-24 bg-white">
        <style jsx global>{`
          .swiper-container {
            background: white !important;
          }
          .swiper {
            overflow: visible !important;
            padding-bottom: 60px !important;
            background: white !important;
          }
          .swiper-wrapper {
            overflow: visible !important;
          }
          .swiper-slide {
            overflow: visible !important;
          }
          .swiper-slide > div {
            overflow: hidden !important;
          }
          .swiper-button-next,
          .swiper-button-prev {
            top: auto !important;
            bottom: 25px !important;
            width: 9px !important;
            height: 15px !important;
            color: black  !important;
            font-weight: bold !important;
            transform: none !important;
          }
          .swiper-button-next::after,
          .swiper-button-prev::after {
            font-size: 20px !important;
          }
          .swiper-button-next {
            right: calc(50% - 70px) !important;
          }
          .swiper-button-prev {
            left: calc(50% - 70px) !important;
          }
          .swiper-pagination {
            position: absolute !important;
            bottom: 17px !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            width: auto !important;
          }
          .swiper-pagination-bullet {
            width: 16px !important;
            height: 16px !important;
            background: rgba(70, 50, 20, 0.5) !important;
            opacity: 1 !important;
            margin: 0 4px !important;
          }
          .swiper-pagination-bullet-active {
            background: rgba(70, 50, 20, 1) !important;
          }
        `}</style>
        <div style={{ overflow: 'hidden' }}>
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            spaceBetween={16}
            slidesPerView={1}
            centeredSlides={true}
            className="w-full bg-white"
          >
            {steps.map((step, i) => (
              <SwiperSlide key={i}>
                <div 
                  className="w-full max-w-[320px] h-[480px] mx-auto relative rounded-[16px] overflow-hidden"
                  style={{ background: "rgba(21, 21, 21, 0.35)" }}
                >
                  {/* Image with overlay */}
                  <div className="relative w-full h-full">
                    <img
                      src={step.img}
                      alt={step.title}
                      className="w-full h-full object-cover opacity-80"
                    />
                    <div 
                      className="absolute inset-0" 
                      style={{ background: "rgba(21, 21, 21, 0.35)" }}
                    />
                  </div>

                  {/* Overlay with Content */}
                  <div 
                    className="absolute bottom-0 left-0 right-0 p-6" 
                    style={{ 
                      background: "rgba(21, 21, 21, 0.4)",
                      borderTop: "1px solid rgba(128, 128, 128, 0.5)",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <h3 
                      className="text-xl font-bold mb-3"
                      style={{
                        background: "linear-gradient(180deg, rgba(252, 249, 246, 0.75) 50%, rgba(150, 148, 146, 0.75) 100%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        textAlign: "center",
                      }}
                    >
                      {step.title}
                    </h3>
                    <p 
                      className="text-sm leading-relaxed"
                      style={{
                        color: "rgba(252, 249, 246, 1)",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
}
