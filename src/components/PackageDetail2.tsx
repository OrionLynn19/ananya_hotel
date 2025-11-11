"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

// --- Data Definition: .png EXTENSIONS ---
const packages = [
  {
    src: "/images/pd4.png",
    title: "Private Spa Promotion",
    description:
      "Indulge in the ultimate spa experience with our private spa promotion. Unwind with a rejuvenating massage, a revitalizing facial, and access to our serene relaxation lounge.",
    dates: "2025/09/28 - 2025/12/05",
    price: "$524",
    oldPrice: "$699",
    isFamily: false,
  },
  {
    src: "/images/pd2.png",
    title: "Family Package",
    description:
      "Escape with our all-inclusive family package. Enjoy spacious accommodations, kid-friendly activities, a sparkling pool, and delicious dining.",
    dates: "2025/09/28 - 2025/12/05",
    price: "$524",
    oldPrice: "$699",
    isFamily: true,
  },
  {
    src: "/images/pd3.png",
    title: "Private Spa Promotion",
    description:
      "Indulge in the ultimate spa experience with our private spa promotion. Unwind with a rejuvenating massage, a revitalizing facial, and access to our serene relaxation lounge.",
    dates: "2025/09/28 - 2025/12/05",
    price: "$600",
    oldPrice: "$699",
    isFamily: false,
  },
  {
    src: "/images/pd1.png",
    title: "Private Spa Promotion",
    description:
      "Indulge in the ultimate spa experience with our private spa promotion. Unwind with a rejuvenating massage, a revitalizing facial, and access to our serene relaxation lounge.",
    dates: "2025/09/28 - 2025/12/05",
    price: "$524",
    oldPrice: "$699",
    isFamily: false,
  },
];

// --- Helper Component: Content Overlay ---
const PackageContent = ({
  title,
  description,
  dates,
  isFamily = false,
}: (typeof packages)[number]) => (
  <div className="absolute bottom-0 left-0 right-0 bg-black/40 backdrop-blur-[2px] text-white p-6 md:p-8">
    <div className="flex items-start justify-between">
      <div>
        <h3 className="text-xl md:text-2xl font-serif font-semibold">
          {title}
        </h3>
        <p className="mt-2 text-xs md:text-sm max-w-[90%] md:max-w-[80%]">
          {description}
        </p>
        {isFamily && (
          <p className="mt-1 text-xs md:text-sm max-w-[90%] md:max-w-[80%]">
            It's a worry-free getaway filled with fun and lasting memories. Book
            your perfect family vacation today
          </p>
        )}
      </div>
      <div className="ml-4">
        <div className="rounded-full bg-white/10 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm border border-white/20 whitespace-nowrap">
          {dates}
        </div>
      </div>
    </div>
  </div>
);

// --- Helper Component: Price Tag Overlay ---
const PriceTag = ({ price, oldPrice }: { price: string; oldPrice: string }) => (
  <div className="absolute top-0 left-0 bg-black/50 backdrop-blur-[2px] text-white p-3 md:p-4 rounded-tl-xl rounded-br-3xl z-40">
    <div className="text-xs md:text-sm font-semibold">10% Discount</div>
    <div className="flex items-baseline mt-1">
      <span className="text-xl md:text-3xl font-bold">{price}</span>
      <span className="text-sm md:text-lg ml-2 line-through opacity-70">
        {oldPrice}
      </span>
    </div>
  </div>
);

// --- Main Component: PackageDetail2 ---
export default function PackageDetail2() {
  // Custom styles to handle the opacity and rounding for non-active slides
  // We need to inject these via CSS or using inline style on the Slide content

  return (
    // Desktop only: hidden on small screens (show nothing on mobile)
    <div className="hidden md:block py-10">
      <div className="mx-auto w-[1440px] max-w-full 2xl:w-full">
        {/* Promotion Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold">
            Promotion you may like
          </h2>
          <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
            Experience your special with our super exclusive package and make
            your holiday full with happiness and moment. Check out the package
            that will match with your expetion
          </p>
        </div>

        {/* --- SWIPER CONTAINER --- */}
        <div className="h-[520px]  relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            // Total visible slide width is 2 (0.5 + 1.0 + 0.5 = 2.0)
            slidesPerView={2}
            centeredSlides={true}
            loop={true}
            // spaceBetween must be 0 for the slides to touch, but we need to ensure the full slide width is used.
            // Using 25% for slidePerView makes the slide width 50% of the container.
            // We'll override the slide width using a custom CSS class.

            // Use 'auto' slidesPerView to use custom slide sizes defined in CSS/style.
            slidesPerView={"auto"}
            spaceBetween={0}
            autoplay={{
              delay: 2800,
              disableOnInteraction: true,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              el: ".swiper-pagination-custom",
              bulletClass:
                "swiper-pagination-bullet w-3 h-3 rounded-full transition-all duration-300 bg-white/40 cursor-pointer",
              bulletActiveClass: "bg-white !opacity-100",
            }}
            className="h-full w-full"
            // Injecting custom CSS properties via onSwiper initialization if needed,
            // but for simple width control, custom CSS is safer.
            onSwiper={(swiper) => {
              // Manually calculate the slide width:
              // If the container is W, and the center slide is S, and the side slides are S/2,
              // then W = S/2 + S + S/2 = 2S. So S = W/2.
              // The main slide should be 50% of the container width.
              // Swiper slides are naturally 50% wide if slidesPerView=2.
              // We'll set the center slide to 50% width and use CSS to manipulate position/opacity.

              // This code sets the slide width to 50% and centers the slides visually
              swiper.params.slidesPerView = "auto";
              swiper.update();
            }}
          >
            {packages.map((pkg, i) => (
              <SwiperSlide
                key={i}
                className="!h-full transition-all duration-500"
                style={{
                  // This sets the width of every SwiperSlide to 50% of the container.
                  // When centered, this means the center slide is 50%, and 25% of the slide on each side is visible.
                  // To achieve 50% visible on the side, we need a 66.6% slide width (1/3 + 1/3 + 1/3).
                  // Let's stick to the visual requirement:
                  // Center Slide: 50%
                  // Side Slides: 50% (but only 25% exposed)

                  // To show exactly 50% of the adjacent slides, the slide width must be 40% of the view.
                  // 0.5 * 40% (left) + 40% (center) + 0.5 * 40% (right) = 80% of view is covered by slides.
                  // This gives 10% empty space on each side, which doesn't match the full-width look.

                  // Best bet for 1:1 ratio is to define the slide size manually:
                  width: "50%", // Width of the main (active) slide

                  // We also need to define non-active slide width to enable the perfect half-visibility:
                  // This requires custom CSS override for the .swiper-slide class to handle non-active width
                }}
              >
                {({ isActive }) => (
                  <div className="relative h-full w-full">
                    <div
                      className={`relative h-full w- overflow-hidden transition-all duration-300 shadow-xl ${
                        // Set center slide to full opacity, and side slides to faded/smaller
                        isActive
                          ? "scale-100 rounded-2xl opacity-100"
                          : "scale-[0.85] rounded-xl opacity-60"
                      }`}
                      style={{
                        // The actual image wrapper ensures the full object-cover effect
                        height: "100%",
                        width: "100%",
                      }}
                    >
                      <Image
                        src={pkg.src}
                        alt={pkg.title}
                        // Use large dimensions for high-quality images
                        width={1600}
                        height={1000}
                        className={`object-cover w-full h-full`}
                        style={{ objectFit: "cover" }}
                        priority={isActive}
                      />

                      {/* Overlays applied inside the scaled container */}
                      <PriceTag price={pkg.price} oldPrice={pkg.oldPrice} />
                      <PackageContent {...pkg} />
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}

            {/* Custom Pagination Container */}
            <div className="swiper-pagination-custom absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-3 z-[100]"></div>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
