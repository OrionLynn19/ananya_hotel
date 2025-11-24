"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Navigation is crucial for controlling slides via custom arrows
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { useRef } from "react";

// --- Data Definitions ---

const desktopPackages = [
  {
    src: "/images/pd4.png",
    title: "Private Spa Promotion",
    description: "Indulge in the ultimate spa experience...",
    dates: "2025/09/28 - 2025/12/05",
    price: "$524",
    oldPrice: "$699",
    isFamily: false,
  },
  {
    src: "/images/pd2.png",
    title: "Family Package",
    description: "Escape with our all-inclusive family package...",
    dates: "2025/09/28 - 2025/12/05",
    price: "$524",
    oldPrice: "$699",
    isFamily: true,
  },
  {
    src: "/images/pd3.png",
    title: "Private Spa Promotion",
    description: "Indulge in the ultimate spa experience...",
    dates: "2025/09/28 - 2025/12/05",
    price: "$600",
    oldPrice: "$699",
    isFamily: false,
  },
  {
    src: "/images/pd1.png",
    title: "Private Spa Promotion",
    description: "Indulge in the ultimate spa experience...",
    dates: "2025/09/28 - 2025/12/05",
    price: "$524",
    oldPrice: "$699",
    isFamily: false,
  },
];

const mobilePackages = [
  {
    src: "/images/pm1.png",
    title: "Beach Villa Offer",
    description: "Exclusive discount on all beachfront villa bookings...",
    dates: "2025/10/01 - 2025/12/31",
  },
  {
    src: "/images/pm2.png",
    title: "Weekend Getaway",
    description: "Two-night stay package including breakfast and spa credit.",
    dates: "2025/10/01 - 2025/12/31",
  },
  {
    src: "/images/pm3.png",
    title: "Gourmet Dining",
    description:
      "Special 3-course dinner menu for two at our signature restaurant.",
    dates: "2025/10:01 - 2025/12/31",
  },
  {
    src: "/images/pm4.png",
    title: "Stay Longer Deal",
    description: "Book 4 nights, get the 5th night absolutely free.",
    dates: "2025/10/01 - 2025/12/31",
  },
];

// --- Helper Components ---

// Mobile content overlay
const MobilePackageContent = ({
  title,
  description,
}: (typeof mobilePackages)[number]) => (
  <div className="absolute inset-x-0 bottom-0 z-20 bg-black/50 backdrop-blur-sm text-white p-4 rounded-b-2xl">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-sm opacity-90 mt-1">{description}</p>
  </div>
);

// Desktop content overlay
const desktopPackageContent = ({
  title,
  description,
  dates,
  isFamily = false,
}: (typeof desktopPackages)[number]) => (
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

// Price Tag for Desktop slides
const priceTag = ({ price, oldPrice }: { price: string; oldPrice: string }) => (
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

// --- Desktop Slider Component (UNCHANGED) ---
function DesktopSlider() {
  return (
    <div className="h-[520px] relative">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={"auto"}
        centeredSlides={true}
        loop={true}
        spaceBetween={0}
        autoplay={{
          delay: 2800,
          disableOnInteraction: true,
          pauseOnMouseEnter: true,
        }}
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom-desktop",
          bulletClass:
            "swiper-pagination-bullet w-3 h-3 rounded-full transition-all duration-300 bg-white/40 cursor-pointer",
          bulletActiveClass: "bg-white !opacity-100",
        }}
        className="h-full w-full"
      >
        {desktopPackages.map((pkg, i) => (
          <SwiperSlide
            key={i}
            className="!h-full transition-all duration-500"
            style={{ width: "60%" }}
          >
            {({ isActive }) => (
              <div className="relative h-full w-full">
                <div
                  className={`relative h-full w-full overflow-hidden transition-all duration-300 shadow-xl ${
                    isActive
                      ? "scale-100 rounded-2xl opacity-100"
                      : "scale-[0.85] rounded-xl opacity-60"
                  }`}
                  style={{ height: "100%", width: "100%" }}
                >
                  <Image
                    src={pkg.src}
                    alt={pkg.title}
                    width={1600}
                    height={1000}
                    className={`object-cover w-full h-full`}
                    priority={isActive}
                  />

                  {priceTag(pkg)}
                  {desktopPackageContent(pkg)}
                </div>
              </div>
            )}
          </SwiperSlide>
        ))}

        <div className="swiper-pagination-custom-desktop absolute left-1/2 -translate-x-1/2 bottom-6 flex gap-3 z-[100]"></div>
      </Swiper>
    </div>
  );
}

// --- Mobile Slider Component (Transitions and Layout Finalized) ---
function MobileSlider() {
  // Ref to access Swiper instance methods (slidePrev/slideNext)
  const swiperRef = useRef(null);

  const handlePrev = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      // This triggers the transition set by the 'speed' prop below
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    // Mobile Container: Width Fill (320px) and Hug Height (vertical flow)
    <div className="w-[360px] mx-auto flex flex-col items-center">
      {/* Image Slider: Fixed height of 261px */}
      <Swiper
        ref={swiperRef}
        modules={[Pagination, Navigation]}
        slidesPerView={1}
        slidesPerGroup={1}
        centeredSlides={false}
        loop={false}
        spaceBetween={0}
        speed={500} // **Sets the slide transition speed to 500ms**
        pagination={{
          clickable: true,
          el: ".swiper-pagination-custom-mobile",
        }}
        className="h-[361px] w-full"
      >
        {mobilePackages.map((pkg, i) => (
          <SwiperSlide key={i} className="!h-full !w-full">
            <div className="relative overflow-hidden rounded-2xl shadow-lg h-full w-full">
              <Image
                src={pkg.src}
                alt={pkg.title}
                width={320}
                height={261}
                className="object-cover w-full h-full"
                priority={i === 0}
              />
              <MobilePackageContent {...pkg} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Indicator Section (Gap: 24px via mt-6, Dimensions: 124x24) */}
      <div
        className="mobile-indicator-container mx-auto mt-6 flex items-center justify-between"
        style={{ width: "124px", height: "24px", gap: "12px" }}
      >
        {/* Custom Prev Button */}
        <button
          onClick={handlePrev}
          className="text-[#A39D95] text-[38px] leading-none p-0 flex items-center justify-center cursor-pointer"
        >
          &lsaquo;
        </button>

        {/* Pagination Bullets Container */}
        <div className="swiper-pagination-custom-mobile flex justify-center items-center h-full flex-grow" />

        {/* Custom Next Button */}
        <button
          onClick={handleNext}
          className="text-[#A39D95] text-[38px] leading-none p-0 flex items-center justify-center cursor-pointer"
        >
          &rsaquo;
        </button>
      </div>
    </div>
  );
}

// --- Combined Main Component: PackageDetail2 ---
export default function PackageDetail2() {
  return (
    <div className="py-10">
      <div className="mx-auto w-[1440px] max-w-full 2xl:w-full">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-xl md:text-4xl font-serif font-bold ">
            Promotion you may like
          </h2>

        </div>

        {/* MOBILE VIEW */}
        <div className="md:hidden">
          <MobileSlider />
        </div>

        {/* DESKTOP VIEW */}
        <div className="hidden md:block">
          <DesktopSlider />
        </div>
      </div>
    </div>
  );
}
