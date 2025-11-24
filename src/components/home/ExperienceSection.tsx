"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Link from "next/link";

const cards = [
  {
    title: "Sanctuary of Truth",
    desc: "Experience Thailand’s most beautiful sights",
    img: "/images/exp1.png",
  },
  {
    title: "Sea Side Restaurant",
    desc: "Enjoy the flavorful dishes at the top notch restaurant",
    img: "/images/exp2.png",
  },
  {
    title: "Sea Side Restaurant",
    desc: "Enjoy the flavorful dishes at the top notch restaurant",
    img: "/images/exp3.png",
  },
  {
    title: "Pagoda On A Cliff",
    desc: "Experience Thailand’s most beautiful sights",
    img: "/images/exp4.png",
  },
];

export default function ExperienceSection() {
  return (
    <section
      className="relative mx-auto flex flex-col items-center text-center text-black w-full md:w-[1440px] lg:w-full"
      style={{
        height: "auto",
        minHeight: "514px",
        paddingTop: "42px",
        paddingBottom: "42px",
        backgroundImage: "url('/images/bgexp.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Mobile Background Overlay - Dark tone */}
      <div 
        className="md:hidden absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 100%)",
          zIndex: 0,
        }}
      />

      {/* Desktop Background Overlay */}
      <div 
        className="hidden md:block absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(99,92,84,0) 0%, rgba(51, 51, 51, 0.4) 50%)",
          zIndex: 0,
        }}
      />

      {/* Heading - Desktop */}
      <div className="hidden md:block w-full px-4 relative z-10" style={{ marginTop: "110px", marginBottom: "0px" }}>
        <h2 
          className="text-3xl md:text-4xl font-bold mb-4 text-center"
          style={{
            color: "white",
            fontFamily: "'Poltawski Nowy', serif",
          }}
        >
          Experience More Than Just a Stay
        </h2>
        <p 
          className="text-lg md:text-2xl" 
          style={{
            color : "white", 
            marginTop: "32px",
            fontSize : "32px", 
            fontFamily: "'Poltawski Nowy', serif",
            maxWidth: "calc(1440px - 109px)",
            marginLeft: "109px",
            marginRight: "109px",
            textAlign: "center",
          }}
        >
          From oceanfront dining to soul-soothing spa days and local adventures,
          your perfect getaway starts here.
        </p>
      </div>

      {/* Heading - Mobile */}
      <div className="md:hidden w-full relative z-10">
        <h2 
          className="text-xl font-bold mb-3 text-center px-4"
          style={{
            color: "white",
            fontFamily: "'Poltawski Nowy', serif",
          }}
        >
          Experience More Than Just a Stay
        </h2>
        <p 
          className="text-base px-4"
          style={{
            color : "white", 
            marginTop: "16px",
            fontFamily: "'Poltawski Nowy', serif",
            textAlign: "center",
            paddingLeft: "32px",
            paddingRight: "32px",
            textIndent: "-16px",
          }}
        >
          From oceanfront dining to soul-soothing spa days and local adventures,
          your perfect getaway starts here.
        </p>
      </div>

     
      <div className="hidden md:flex justify-center gap-6 relative z-10" style={{ marginTop: "64px" }}>
        {cards.map((card, i) => (
          <motion.div
            key={i}
            className="rounded-[32px] overflow-hidden bg-white shadow-lg flex flex-col"
            style={{
              width: "288px",
              height: "455.17px",
              padding: "15px 15px 30px 15px",
              marginTop: i % 2 === 0 ? "0px" : "135px",
            }}
            whileHover={{ scale: 1.05 }}
          >
            <img
              src={card.img}
              alt={card.title}
              className="object-cover rounded-[20px]"
              style={{
                width: "258px",
                height: "299.17px",
                marginBottom: "10px"
              }}
            />
            <div className="text-center">
              <h3 style={{fontFamily: "'Poltawski Nowy', serif", color: "rgba(70, 50, 20, 1)", fontSize: "24px", fontWeight: "700"
              }}>{card.title}</h3>
              <p style={{fontFamily: "Montserrat", color: "rgba(0, 0, 0, 1)", fontSize: "18px", fontWeight: "500"
              }}>{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile Swiper Carousel */}
      <div className="md:hidden w-full relative z-10" style={{ marginTop: "24px", marginBottom: "24px" }}>
        <Swiper
          modules={[]}
          spaceBetween={2}
          slidesPerView={1.9}
          centeredSlides={true}
        >
          {cards.map((card, i) => (
            <SwiperSlide key={i}>
              <div 
                className="mx-auto overflow-hidden bg-white shadow-lg flex flex-col"
                style={{
                  width: "184.32px",
                  height: "264.96px",
                  padding: "9.6px 9.6px 19.2px 9.6px",
                  gap: "6.4px",
                  borderRadius: "20.48px",
                }}
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="object-cover"
                  style={{
                    width: "165.12px",
                    height: "191.36px",
                    borderRadius: "13.12px",
                  }}
                />
                <div className="text-center">
                  <h3 style={{
                    fontFamily: "'Poltawski Nowy', serif", 
                    color: "rgba(70, 50, 20, 1)", 
                    fontSize: "15.36px", 
                    fontWeight: "700"
                  }}>
                    {card.title}
                  </h3>
                  <p style={{
                    fontFamily: "Montserrat", 
                    color: "rgba(0, 0, 0, 1)", 
                    fontSize: "11.52px", 
                    fontWeight: "500",
                    marginTop: "3.2px"
                  }}>
                    {card.desc}
                  </p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Button */}
      <Link href="/discover" className="md:mt-16 relative z-10">
        <button 
          className="text-white font-semibold transition relative overflow-hidden w-[83px] h-[28px] text-xs rounded-lg md:w-[181px] md:h-[57px] md:text-base md:rounded-[20px] flex items-center justify-center" 
          style={{ 
            padding: "0px",
            border: "0.5px solid rgba(255, 255, 255, 0.3)",
            background: "rgba(255, 255, 255, 0.02)",
            backdropFilter: "blur(40px)",
            boxShadow: "0px 2px 4px 0px rgba(124, 109, 88, 0.2) inset, 0px -2px 4px 0px rgba(100, 88, 70, 0.2) inset",
            fontFamily: "'Poltawski Nowy', serif",
            fontWeight: "700",
            lineHeight: "100%",
            letterSpacing: "0px",
          }}
        >
          Learn More
        </button>
      </Link>
    </section>
  );
}
