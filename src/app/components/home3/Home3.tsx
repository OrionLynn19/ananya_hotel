"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import type { Swiper as SwiperCore } from "swiper";
import "swiper/css";

const slides = [
  { src: "/images/Rectangle 159.png", alt: "Resort pool at sunset" },
  { src: "/images/Rectangle 160.png", alt: "Beachfront cabana dining" },
  { src: "/images/Rectangle 161.png", alt: "Sunset over the coastline" },
  { src: "/images/Rectangle 162.png", alt: "Seaside lobby lounge" },
  { src: "/images/Rectangle 163.png", alt: "Ocean boardwalk view" },
  { src: "/images/Rectangle 159.png", alt: "Tropical resort courtyard" },
  { src: "/images/Rectangle 159.png", alt: "Ocean view at dusk" },
];

// 🎛️ Continuous panoramic settings
const PANORAMA = {
  curveRadius: 1200, // adjust curvature depth
  maxTiltDeg: 10,
  baseZ: 80,
  transitionMs: 0, // no snapping, fully fluid
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

      {/* Infinite Panorama Carousel */}
      <div
        className="mx-auto mt-12 md:mt-16 max-w-6xl"
        style={{
          perspective: "1600px",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 10%, #000 90%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 10%, #000 90%, rgba(0,0,0,0) 100%)",
        }}
      >
        <Swiper
          modules={[Autoplay, FreeMode]}
          grabCursor
          centeredSlides
          loop
          watchSlidesProgress
          slidesPerView={3}
          spaceBetween={48}
          breakpoints={{
            480: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 2.4, spaceBetween: 26 },
            1024: { slidesPerView: 3, spaceBetween: 30 },
          }}
          autoplay={{
            delay: 0, // continuous
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={9000} // smooth drift speed (higher = slower)
          freeMode={{ enabled: true, momentum: false }}
          allowTouchMove={false} // disable manual drag to keep it continuous
          onBeforeInit={(swiper: SwiperCore) => {
            swiper.el.classList.add("swiper-panorama", "swiper-3d");
          }}
          onProgress={(swiper: SwiperCore) => {
            const { curveRadius, maxTiltDeg, baseZ } = PANORAMA;

            swiper.slides.forEach((slideEl: HTMLElement) => {
              const raw = (slideEl as unknown as { progress?: number }).progress;
              const p = typeof raw === "number" ? raw : 0;

              // curvature math (smooth warp)
              const angle = p * (Math.PI / 9); // smaller divisor = more curve
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
      </div>
    </section>
  );
}
