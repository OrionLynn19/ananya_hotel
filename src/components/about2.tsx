"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function About2() {
  const slides = [
    {
      id: "unique",
      title: "Unique Architecture",
      paragraph:
        "Our architecture blends timeless design with modern elegance. From traditional details to comforts, every corner of Ananya reflects harmony between heritage and innovation.",
      image: "/images/UniqueArchitecture.png",
      backImage: "/images/GenerationalHeritage.png",
    },
    {
      id: "generational",
      title: "Generational Heritage",
      paragraph:
        "Our story is one of heritage carried through generations. More than a hotel, Ananya is a legacy of hospitality and culture, reimagined to create timeless experiences for today’s traveler.",
      image: "/images/GenerationalHeritage.png",
      backImage: "/images/UniqueArchitecture.png",
    },
  ];

  const [active, setActive] = useState<number>(0);

  return (
    <section
      className="md:w-[1218px] mx-auto pt-[41px] pb-[64px] md:pt-[176px] md:pb-[128px]"
      aria-labelledby="about-heading"
    >
      <h2
        id="about-heading"
        className="hidden sm:block font-poltawski font-bold text-[48px] text-[#463214] text-center mb-[64px]"
      >
        Rooted in Tradition, Inspired by the Future
      </h2>

      <div className="hidden sm:block bg-[#FCF9F6] rounded-[64px] p-[53px_36px]">
        <div className="max-w-[1142px] mx-auto flex gap-[14px] items-center">
          <div className="w-[414px] shrink-0">
            <h3 className="font-poltawski font-bold text-[40px] text-[#463214] leading-none mb-6">
              ANANYA stands as more than a hotel
            </h3>
            <p className="font-mont font-medium text-[24px] text-[#463214] leading-tight">
              It is a heritage carried through generations. Our building
              reflects the artistry and traditions of the past, lovingly
              preserved and reimagined for today’s travelers.
            </p>
          </div>

          <div className="w-[714px] h-[530px] flex items-center gap-[30px]">
            <div className="relative w-[315px] h-[500px] shrink-0 self-start">
              <div className="absolute top-[30px] left-0 w-full h-full rounded-4xl overflow-hidden opacity-[0.65]">
                <Image
                  src={slides[active].backImage}
                  alt={`${slides[active].title} background`}
                  fill
                  className="object-cover object-top"
                />
              </div>

              <div className="absolute top-0 left-[30px] w-full h-full rounded-4xl overflow-hidden shadow-lg z-10">
                <Image
                  src={slides[active].image}
                  alt={slides[active].title}
                  fill
                  className="object-cover object-top"
                />
              </div>
            </div>

            <div className="bg-white rounded-r-4xl rounded-l-xl shadow-[1px_1px_6px_rgba(0,0,0,0.25)] w-[369px] p-[25px_15px] z-20 self-center">
              <div className="w-[339px]">
                <div className="mb-4">
                  <h4 className="font-poltawski font-bold text-[24px] text-[#000000] text-center">
                    {slides[active].title}
                  </h4>
                </div>

                <p className="font-poltawski text-[22px] text-[#463214] leading-none tracking-[0.03em]">
                  {slides[active].paragraph}
                </p>

                <div className="mt-6 flex items-center gap-4 justify-center">
                  <button
                    aria-label="previous"
                    aria-pressed={active === 0}
                    onClick={() => setActive(0)}
                    className={
                      "w-[48.3px] h-[49px] rounded-[35px] border-[1.4px] flex items-center justify-center transition-colors " +
                      (active === 0
                        ? "bg-[#463214] text-white border-[#463214] cursor-default"
                        : "bg-white text-[#463214] border-[#463214] cursor-pointer hover:bg-[#F2F2F2]")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5 rotate-0"
                    >
                      <path
                        d="M15 18l-6-6 6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    aria-label="next"
                    aria-pressed={active === 1}
                    onClick={() => setActive(1)}
                    className={
                      "w-[48.3px] h-[49px] rounded-[35px] border-[1.4px] flex items-center justify-center transition-colors " +
                      (active === 1
                        ? "bg-[#463214] text-white border-[#463214] cursor-default"
                        : "bg-white text-[#463214] border-[#463214] cursor-pointer hover:bg-[#F2F2F2]")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className="w-5 h-5"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Mobile layout (matches Figma mobile specs) */}
      <div className="sm:hidden w-full mx-auto">
        <h2 className="w-[296px] h-[42px] mx-auto font-poltawski font-bold text-[18px] text-[#463214] text-center mb-6 leading-none">
          Rooted in Tradition, Inspired by the Future
        </h2>

        <div
          className="relative w-full h-[430px] overflow-hidden"
          style={{
            backgroundImage: `url(${slides[active].image})`,
            backgroundSize: "cover",
            backgroundPosition: "top",
          }}
        >
          {/* dark gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.3)] p-2">
            <div className="w-[300px] mx-auto h-full flex flex-col items-center gap-6">
              {/* top title */}
              <div className="w-[300px] h-[46px] flex items-center justify-center">
                <h3 className="w-[288px] h-[46px] font-poltawski font-bold text-[18px] text-[#FCF9F6] text-center leading-none px-6">
                  ANANYA stands as more than a hotel
                </h3>
              </div>

              {/* content box */}
              <div className="w-[186px] h-[340.5px]">
                <div
                  className="w-[186px] h-[292px] p-2 rounded-[8px]"
                  style={{ backgroundColor: "rgba(252,249,246,0.5)" }}
                >
                  <div className="w-[170px] h-[126px] mx-auto overflow-hidden rounded-[8px]">
                    <Image
                      src={slides[active].image}
                      alt={slides[active].title}
                      width={170}
                      height={126}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>

                  <div className="mt-2 w-[170px] h-[142px] text-center">
                    <h4 className="w-[170px] h-[18px] leading-none font-poltawski font-semibold text-[14px] text-[#463214]">
                      {slides[active].title}
                    </h4>
                    <p className="w-[170px] h-[120px] font-mont text-[12px] text-[#000000] mt-1 tracking-[0.03em] text-left leading-[14px]">
                      {slides[active].paragraph}
                    </p>
                  </div>
                </div>

                {/* buttons */}
                <div className="w-full h-[36.4px] flex justify-center gap-[12.48px] pt-3">
                  <button
                    onClick={() => setActive(0)}
                    aria-pressed={active === 0}
                    className={
                      "w-[36px] h-[36px] rounded-[26px] border-[1.04px] flex items-center justify-center " +
                      (active === 0
                        ? "bg-[#463214] text-white border-[#463214] cursor-default"
                        : "bg-white text-[#463214] border-[#463214] cursor-pointer")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path
                        d="M15 18l-6-6 6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={() => setActive(1)}
                    aria-pressed={active === 1}
                    className={
                      "w-[36px] h-[36px] rounded-[26px] border-[1.04px] flex items-center justify-center " +
                      (active === 1
                        ? "bg-[#463214] text-white border-[#463214] cursor-default"
                        : "bg-white text-[#463214] border-[#463214] cursor-pointer")
                    }
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      className="w-4 h-4"
                    >
                      <path
                        d="M9 18l6-6-6-6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
