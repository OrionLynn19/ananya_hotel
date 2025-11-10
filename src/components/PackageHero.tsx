"use client";

import Image from "next/image";
import { Montserrat, Poltawski_Nowy } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type PackageHeroProps = {
  title?: string;
  description?: string;
  price?: string;
  originalPrice?: string;
  priceNote?: string;
  ctaLabel?: string;
  onBook?: () => void;
};

export default function PackageHero({
  title = "PRIVATE SPA",
  description = `Experience pure bliss with our private spa package. A dedicated therapist provides exclusive treatments, including a private jacuzzi soak, for ultimate tranquility.`,
  price = "$524",
  originalPrice = "$699",
  priceNote = "PER PERSON",
  ctaLabel = "Book",
  onBook,
}: PackageHeroProps) {
  return (
    <section className="w-full">
      <div
        className={`
          flex flex-col-reverse items-center justify-between gap-10
          px-6 py-12
          md:flex-row md:items-center md:gap-16 md:px-12
          lg:px-20 xl:px-28
        `}
      >
        {/* LEFT: Text */}
        <div className={`w-full md:w-[468px] ${montserrat.className}`}>
          <h1
            className={`
              ${poltawskiNowy.className}
              text-[32px] text-[#463214]
              md:text-[48px] font-bold
            `}
          >
            {title}
          </h1>

          <p className="mt-6 text-base text-[#463214] md:text-[24px] font-medium">
            {description}
          </p>

          {/* Price + CTA */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-6">
            <div>
              <div className="flex items-baseline gap-3">
                <span className="text-[32px] font-bold text-[#463214] md:text-[38px]">
                  {price}
                </span>
                {originalPrice && (
                  <span className="text-base text-[#545454] line-through md:text-[20px] font-bold">
                    {originalPrice}
                  </span>
                )}
              </div>
              {priceNote && (
                <p className="mt-1 text-[11px] text-[#B09A80] md:text-[16px] font-[300]">
                  {priceNote}
                </p>
              )}
            </div>

            <button
              type="button"
              onClick={onBook}
              className={`
                rounded-[20px] border border-[#E6D9C8] bg-white
                px-8 py-2.5 text-sm md:text-[24px] font-bold tracking-wide text-[#463214]
                shadow-sm transition
                hover:-translate-y-0.5 hover:shadow-md
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D9C8]
                md:px-5 md:py-3 
              `}
            >
              {ctaLabel}
            </button>
          </div>
        </div>

        {/* RIGHT: Image stack */}
        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end">
          {/* Big image */}
          <div className="relative w-full max-w-[597px] overflow-hidden rounded-[10px] shadow-[0_18px_60px_rgba(0,0,0,0.18)] h-[280px] sm:h-[340px] md:h-[594px]">
            <Image
              src="/images/private-spa-main.jpg"
              alt="Private spa pavilion by the beach"
              fill
              priority
              className="object-cover"
            />
          </div>

          {/* Small overlay image */}
          <div
            className={`
              absolute bottom-4 left-1/2 h-[220px] w-[260px] -translate-x-1/2
              md:bottom-24 md:-left-20 md:h-[370px] md:w-[407px] md:translate-x-0
            `}
          >
            {/* white border card */}
            <div className="relative h-full w-full overflow-hidden rounded-[32px] bg-white p-2 shadow-[0_16px_40px_rgba(0,0,0,0.16)]">
              {/* inner image */}
              <div className="relative h-full w-full overflow-hidden rounded-[28px]">
                <Image
                  src="/images/private-spa-overlay.jpg"
                  alt="Massage bed facing the sea"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
