"use client";

import Image from "next/image";
import Link from "next/link";
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
  priceNote = "per person",
  ctaLabel = "Booking",
  onBook,
}: PackageHeroProps) {
  return (
    <section className="w-full">
      <div
        className={`
          mx-auto flex max-w-[430px] flex-col-reverse
          items-stretch justify-start gap-10
          px-6 py-12
          md:max-w-none md:flex-row md:items-center md:justify-between
          md:gap-16 md:px-12
          lg:px-20 xl:px-28
        `}
      >
        {/* LEFT: Text */}
        <div className={`w-full md:w-[468px] ${montserrat.className}`}>
          <h1
            className={`
              ${poltawskiNowy.className}
              text-[32px] text-[#463214] mt-15
              md:text-[48px] font-bold
            `}
          >
            {title}
          </h1>

          <p className="mt-6 text-base text-[#463214] md:text-[24px] font-medium">
            {description}
          </p>

          {/* Price + CTA */}
          <div className="mt-8 flex items-end justify-between gap-4 md:gap-6">
            <div>
              <div className="flex items-baseline gap-3">
                {/* MOBILE: blue, DESKTOP: brown */}
                <span className="text-[32px] font-bold text-[#2F6AFF] md:text-[38px] md:text-[#463214]">
                  {price}
                </span>

                {originalPrice && (
                  <span className="text-base text-[#545454] line-through md:text-[20px] font-bold">
                    {originalPrice}
                  </span>
                )}
              </div>

              {priceNote && (
                <p
                  className={`
                    mt-1 text-xs font-medium text-[#1D1D1D]
                    md:text-[16px] md:font-[300] md:text-[#B09A80] md:uppercase
                  `}
                >
                  {priceNote}
                </p>
              )}
            </div>

            <Link
                href="/booking"
                className={`
                    rounded-[10px] md:rounded-[20px] border border-[#E6D9C8] bg-white
                    px-4 py-2.5 text-sm md:text-[24px] font-bold tracking-wide text-[#463214]
                    shadow-sm transition
                    hover:bg-[#7C6D5833]/20
                    hover:-translate-y-0.5 hover:shadow-md
                    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E6D9C8]
                    md:px-5 md:py-3
                `}
            >
                {ctaLabel}
            </Link>
          </div>
        </div>

        {/* RIGHT: Image stack */}
        <div className="relative flex w-full justify-center md:w-1/2 md:justify-end">
          {/* Big image */}
          <div className="relative h-[300px] w-[356px] max-w-[597px] overflow-hidden rounded-[10px] shadow-[0_18px_60px_rgba(0,0,0,0.18)] md:h-[594px]">
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
              absolute -bottom-10 left-1/2 h-[150px] w-[160px] -translate-x-1/2
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
