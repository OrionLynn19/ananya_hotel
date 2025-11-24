"use client";

import Image from "next/image";

const slides = [
  { src: "/Images/Rectangle 159.png", alt: "Resort pool at sunset" },
  { src: "/Images/Rectangle 160.png", alt: "Beachfront cabana dining" },
  { src: "/Images/Rectangle 161.png", alt: "Sunset over the coastline" },
  { src: "/Images/Rectangle 162.png", alt: "Seaside lobby lounge" },
  { src: "/Images/Rectangle 163.png", alt: "Ocean boardwalk view" },
];


const LOOP = [...slides, ...slides];

export default function Home3() {
  return (
    <section className="w-full bg-[#fff8f0] px-4 py-16 md:py-24 overflow-hidden">
      {/* HEADER */}
      <div className="mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-serif font-semibold text-[#3a2a18]">
          Our Beachfront in Pictures
        </h2>
        <p className="mt-4 text-base md:text-lg text-[#5b4936] leading-relaxed">
          See the beauty of our beachfront, from golden sands to welcoming
          spaces. Every photo captures the charm and comfort of your next
          seaside escape.
        </p>
        <a
          href="/gallery"
          className="mt-8 inline-block rounded-2xl bg-[#e5d2bf] px-8 py-4 text-lg font-semibold text-[#3a2a18] shadow-sm ring-1 ring-black/5 hover:scale-[1.02] transition"
        >
          See Gallery
        </a>
      </div>

      {/* PANORAMA STRIP */}
      <div
        className="relative mx-auto mt-12 md:mt-16 max-w-6xl overflow-hidden"
        style={{
          perspective: "1400px",
          WebkitMaskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 10%, #000 90%, rgba(0,0,0,0) 100%)",
          maskImage:
            "linear-gradient(to right, rgba(0,0,0,0) 0%, #000 10%, #000 90%, rgba(0,0,0,0) 100%)",
        }}
      >
        <div className="panorama-row">
          {LOOP.map((s, i) => (
            <div key={i} className="panorama-card">
              <div className="panorama-inner">
                <div className="relative h-[220px] sm:h-[250px] md:h-[300px] lg:h-80 w-[260px] sm:w-[300px] md:w-[340px] lg:w-[380px] rounded-2xl overflow-hidden shadow-xl">
                  <Image
                    src={s.src}
                    alt={s.alt}
                    fill
                    className="object-cover select-none"
                    draggable={false}
                    priority={i < 3}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* LOCAL STYLES FOR PANORAMA EFFECT */}
        <style jsx>{`
          .panorama-row {
            display: flex;
            width: max-content;
            animation: beachfront-panorama 40s linear infinite;
            transform-style: preserve-3d;
          }

          /* Base card */
          .panorama-card {
            padding: 0 12px;
            transform-style: preserve-3d;
          }

          .panorama-inner {
            transform-style: preserve-3d;
            transition: transform 0.3s ease-out;
          }

          /* Panorama curve pattern: repeat every 5 cards */
          .panorama-card:nth-child(5n + 1) .panorama-inner {
            transform: rotateY(20deg) translateZ(-60px);
          }
          .panorama-card:nth-child(5n + 2) .panorama-inner {
            transform: rotateY(10deg) translateZ(-30px);
          }
          .panorama-card:nth-child(5n + 3) .panorama-inner {
            transform: rotateY(0deg) translateZ(0px) scale(1.02);
          }
          .panorama-card:nth-child(5n + 4) .panorama-inner {
            transform: rotateY(-10deg) translateZ(-30px);
          }
          .panorama-card:nth-child(5n + 5) .panorama-inner {
            transform: rotateY(-20deg) translateZ(-60px);
          }

          @keyframes beachfront-panorama {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          @media (max-width: 768px) {
            .panorama-card:nth-child(5n + 1) .panorama-inner,
            .panorama-card:nth-child(5n + 2) .panorama-inner,
            .panorama-card:nth-child(5n + 3) .panorama-inner,
            .panorama-card:nth-child(5n + 4) .panorama-inner,
            .panorama-card:nth-child(5n + 5) .panorama-inner {
              transform: rotateY(0deg) translateZ(0px) scale(1);
            }
          }
        `}</style>
      </div>
    </section>
  );
}
