"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";

const baseSlides = [
  { src: "/images/Rectangle 159.png", alt: "Resort pool at sunset" },
  { src: "/images/Rectangle 160.png", alt: "Beachfront cabana dining" },
  { src: "/images/Rectangle 161.png", alt: "Sunset over the coastline" },
  { src: "/images/Rectangle 162.png", alt: "Seaside lobby lounge" },
  { src: "/images/Rectangle 163.png", alt: "Ocean boardwalk view" },
  { src: "/images/Rectangle 164.png", alt: "Tropical bar by the shore" },
  { src: "/images/Rectangle 165.png", alt: "Palm tree sunset" },
];

// ✅ Duplicate twice for perfect seamless looping
const slides = [...baseSlides, ...baseSlides, ...baseSlides];

const PANORAMA = {
  curveRadius: 1300,
  maxTiltDeg: 10,
  baseZ: 80,
};

export default function Home3() {
  return (
    <section className="w-full bg-[#fff8f0] px-4 py-16 md:py-24 overflow-hidden">
      {/* Header */}
      <div className="mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-[#3a2a18]">
          Our Beachfront in Pictures
        </h2>
        <p className="mt-4 text-base md:text-lg text-[#5b4936] leading-relaxed">
          See the beauty of our beachfront, from golden sands to welcoming spaces.
          Every photo captures the charm and comfort of your next seaside escape.
        </p>
        <a
          href="/gallery"
          className="mt-8 inline-block rounded-2xl bg-[#e5d2bf] px-8 py-4 text-lg font-semibold text-[#3a2a18] shadow-sm ring-1 ring-black/5 hover:scale-[1.02] transition"
        >
          See Gallery
        </a>
      </div>

      {/* Continuous Panorama Carousel */}
      <div
        className="mx-auto mt-12 md:mt-16 max-w-6xl relative overflow-hidden"
        style={{
          perspective: "1600px",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 10%, #000 90%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 10%, #000 90%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Swiper
          modules={[FreeMode]}
          slidesPerView={3.4}
          spaceBetween={9}
          centeredSlides
          allowTouchMove={false}
          freeMode={{ enabled: true, momentum: false }}
          loop={false}
          speed={0}
          onBeforeInit={(swiper: SwiperCore) => {
            swiper.el.classList.add("swiper-panorama", "swiper-3d");
            swiper.wrapperEl.style.transformStyle = "preserve-3d";
          }}
          onProgress={(swiper: SwiperCore) => {
            const { curveRadius, maxTiltDeg, baseZ } = PANORAMA;
            swiper.slides.forEach((slideEl: HTMLElement) => {
              const raw = (slideEl as unknown as { progress?: number }).progress;
              const p = typeof raw === "number" ? raw : 0;

              const angle = p * (Math.PI / 9);
              const x = Math.sin(angle) * curveRadius * 0.1;
              const z = baseZ - Math.cos(angle) * 100;
              const rotateY = p * maxTiltDeg;

              const inner = slideEl.querySelector(".panorama-inner") as HTMLElement | null;
              if (inner) {
                inner.style.transform = `
                  translateX(${x}px)
                  translateZ(${z}px)
                  rotateY(${rotateY}deg)
                  scale(0.97)
                `;
                inner.style.transformStyle = "preserve-3d";
              }
            });
          }}
          className="overflow-visible!"
        >
          {slides.map((s, i) => (
            <SwiperSlide key={i}>
              <div className="panorama-inner">
                <div className="relative h-[220px] sm:h-[250px] md:h-[300px] lg:h-80 p-2">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover select-none shadow-xl"
                    priority={i < 2}
                    draggable={false}
                  />
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ Continuous non-stop motion (faster + smoother) */}
        <style jsx global>{`
          .swiper-wrapper {
            display: flex;
            will-change: transform;
            animation: scroll-panorama 18s linear infinite;
          }
          @keyframes scroll-panorama {
            from {
              transform: translate3d(0, 0, 0);
            }
            to {
              transform: translate3d(-33.33%, 0, 0);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
