"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";

type Card = {
  id: number;
  title: string;
  desc: string;
  img: string;
};

const cardsByCity: Record<string, Card[]> = {
  "Hua Hin": [
    {
      id: 1,
      title: "Sanctuary of Truth",
      desc: "Experience Thailand’s most beautiful sights",
      img: "/Images/exp1.png",
    },
    {
      id: 2,
      title: "Lighthouse View",
      desc: "Experience Thailand’s most beautiful sights",
      img: "/Images/exp2.png",
    },
    {
      id: 3,
      title: "Seaside Park",
      desc: "Experience Thailand’s most beautiful sights",
      img: "/Images/exp3.png",
    },
    {
      id: 4,
      title: "Island View",
      desc: "Experience Thailand’s most beautiful sights",
      img: "/Images/exp4.png",
    },
  ],
  Pattaya: [
    {
      id: 1,
      title: "Coral Beach",
      desc: "Sunset views and local markets",
      img: "/Images/exp2.png",
    },
    {
      id: 2,
      title: "Central Pier",
      desc: "Vibrant seafront and dining",
      img: "/Images/exp1.png",
    },
    {
      id: 3,
      title: "Seafood Bay",
      desc: "Fresh catches and beachside grills",
      img: "/Images/exp4.png",
    },
    {
      id: 4,
      title: "Market Lane",
      desc: "Shops, crafts and nightlife",
      img: "/Images/exp3.png",
    },
  ],
  Phuket: [
    {
      id: 1,
      title: "Big Buddha",
      desc: "Panoramic island views",
      img: "/Images/exp3.png",
    },
    {
      id: 2,
      title: "Patong Beach",
      desc: "Vibrant beach clubs",
      img: "/Images/exp4.png",
    },
    {
      id: 3,
      title: "Old Phuket Town",
      desc: "Historic streets and cafes",
      img: "/Images/exp1.png",
    },
    {
      id: 4,
      title: "Phi Phi Tours",
      desc: "Boat trips and snorkeling",
      img: "/Images/exp2.png",
    },
  ],
};

export default function WhatsNearbyMobile() {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedCity, setSelectedCity] = useState<string>("Hua Hin");
  const [displayedCards, setDisplayedCards] = useState<Card[]>(
    cardsByCity["Hua Hin"]
  );
  const [isAnimating, setIsAnimating] = useState(false);
  const [hiddenCount, setHiddenCount] = useState<number>(0);
  const [fadingIndex, setFadingIndex] = useState<number | null>(null);
  const DOT_STEP = 20;
  const ANIM_DUR = 420;
  const EASE = "cubic-bezier(.2,.8,.2,1)";
  const FADE_DUR = 300;

  const prevIndexRef = useRef<number>(0);
  const SWAP_DUR = 400;

  const [isSwapping, setIsSwapping] = useState(false);
  const [whiteDotPos, setWhiteDotPos] = useState(0);
  const [grayDotPos, setGrayDotPos] = useState<number | null>(null);

  useEffect(() => {
    setDisplayedCards(cardsByCity[selectedCity] ?? cardsByCity["Hua Hin"]);
    setActiveIndex(0);
    prevIndexRef.current = 0;
    setHiddenCount(0);
    setFadingIndex(null);

    setIsSwapping(false);
    setWhiteDotPos(0);
    setGrayDotPos(null);

    requestAnimationFrame(() => {
      if (scrollerRef.current) scrollerRef.current.scrollLeft = 0;
    });
  }, [selectedCity]);

  const CityButton: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void;
  }> = ({ label, active, onClick }) => {
    return (
      <button
        onClick={onClick}
        type="button"
        aria-pressed={active}
        className="relative inline-flex items-center justify-center min-w-[62px] h-7 rounded-md border border-white/12 cursor-pointer"
      >
        <div className="w-full h-full rounded-md backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "inherit",
              padding: "0.5px",
              pointerEvents: "none",
              zIndex: 1,
              background:
                "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0.05))",
              WebkitMask:
                "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
              WebkitMaskComposite: "xor",

              maskComposite: "exclude",
            }}
          />

          <div
            className={`absolute inset-0 rounded-md ${
              active ? "bg-[rgba(70,50,20,0.7)]" : "bg-[rgba(70,50,20,0.12)]"
            }`}
          />

          <span className="relative z-10 font-poltawski font-bold text-[12px] text-[#FCF9F6]">
            {label}
          </span>
        </div>
      </button>
    );
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => {
      if (isAnimating) return;

      const x = el.scrollLeft;
      const cardWidth = 155 + 8;
      const idx = Math.round(x / cardWidth);
      const originalIdx = idx + hiddenCount;
      const prev = prevIndexRef.current;
      if (originalIdx !== prev && !isAnimating) {
        setActiveIndex(originalIdx);
        prevIndexRef.current = originalIdx;
      }
    };
    el.addEventListener("scroll", onScroll, { passive: true });
    return () => el.removeEventListener("scroll", onScroll);
  }, [hiddenCount, isAnimating]);

  const scrollBy = (dir: number) => {
    const el = scrollerRef.current;
    if (!el || isAnimating) return;
    const cardWidth = 155 + 8;

    if (dir === 1) {
      if (hiddenCount < displayedCards.length - 1) {
        const fadingOrigIndex = hiddenCount;
        const targetIdx = fadingOrigIndex + 1;

        setIsAnimating(true);

        setFadingIndex(fadingOrigIndex);

        window.setTimeout(() => {
          setHiddenCount((s) => s + 1);
          setFadingIndex(null);

          if (el) el.scrollLeft = 0;

          const currentActive = prevIndexRef.current;

          setIsSwapping(true);
          setWhiteDotPos(currentActive);
          setGrayDotPos(targetIdx);

          requestAnimationFrame(() => {
            setWhiteDotPos(targetIdx);
            setGrayDotPos(currentActive);
          });

          window.setTimeout(() => {
            setActiveIndex(targetIdx);
            prevIndexRef.current = targetIdx;

            setTimeout(() => {
              setIsSwapping(false);
              setWhiteDotPos(targetIdx);
              setGrayDotPos(null);
            }, 100);

            setIsAnimating(false);
          }, SWAP_DUR);
        }, FADE_DUR);
      } else {
        setIsAnimating(true);
        const currentActive = prevIndexRef.current;

        setIsSwapping(true);
        setWhiteDotPos(currentActive);
        setGrayDotPos(0);

        requestAnimationFrame(() => {
          setWhiteDotPos(0);
          setGrayDotPos(currentActive);
        });

        window.setTimeout(() => {
          setHiddenCount(0);
          setActiveIndex(0);
          prevIndexRef.current = 0;

          setTimeout(() => {
            setIsSwapping(false);
            setWhiteDotPos(0);
            setGrayDotPos(null);
          }, 100);

          setIsAnimating(false);
        }, SWAP_DUR);
      }
    } else if (dir === -1) {
      if (hiddenCount > 0) {
        const newHidden = hiddenCount - 1;
        const currentActive = prevIndexRef.current;

        setIsAnimating(true);

        setHiddenCount(newHidden);

        setActiveIndex(newHidden);
        prevIndexRef.current = newHidden;

        setFadingIndex(newHidden);

        setIsSwapping(true);
        setWhiteDotPos(currentActive);
        setGrayDotPos(newHidden);

        requestAnimationFrame(() => {
          setWhiteDotPos(newHidden);
          setGrayDotPos(currentActive);
        });

        requestAnimationFrame(() => {
          if (!el) return;
          el.scrollLeft = cardWidth;
          requestAnimationFrame(() => {
            setFadingIndex(null);
            el.scrollTo({ left: 0, behavior: "smooth" });
          });
        });

        window.setTimeout(() => {
          setTimeout(() => {
            setIsSwapping(false);
            setWhiteDotPos(newHidden);
            setGrayDotPos(null);
          }, 100);

          setIsAnimating(false);
        }, SWAP_DUR);
      } else {
      }
    }
  };

  return (
    <>
      <div className="relative w-full h-[436px] overflow-hidden flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center filter brightness-90"
          style={{
            backgroundImage: `url("/Images/What%27sNearby/bgForNearby.png")`,
          }}
          aria-hidden
        />

        <div className="absolute inset-0 bg-linear-to-b from-[rgba(70,50,20,0.95)] to-transparent pointer-events-none" />

        <div className="relative z-10 w-[320px] h-[392.4609375px] flex flex-col gap-6 box-border items-center">
          <div className="w-[320px] h-[89px] flex flex-col gap-3 items-center justify-center text-center">
            <h3 className="w-[288px] h-[23px] font-poltawski font-bold text-[18px] leading-[100%] text-[#FCF9F6] m-0">
              What’s Nearby
            </h3>
            <p className="w-[288px] h-[54px] font-poltawski font-semibold text-[14px] leading-4.5 text-[#FCF9F6]">
              Your beach escape doesn’t end at the water’s edge.Explore the
              attractions that make each location unforgettable.
            </p>
          </div>

          <div className="w-[289px] h-[279.4609375px] flex flex-col gap-3 items-start box-border relative">
            <div className="w-[210px] h-7 flex gap-3 justify-center">
              <CityButton
                label="Hua Hin"
                active={selectedCity === "Hua Hin"}
                onClick={() => {
                  setSelectedCity("Hua Hin");
                  setActiveIndex(0);
                  prevIndexRef.current = 0;
                  setHiddenCount(0);
                  setFadingIndex(null);
                  setIsSwapping(false);
                  setWhiteDotPos(0);
                  setGrayDotPos(null);
                  scrollerRef.current?.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                }}
              />

              <CityButton
                label="Pattaya"
                active={selectedCity === "Pattaya"}
                onClick={() => {
                  setSelectedCity("Pattaya");
                  setActiveIndex(0);
                  prevIndexRef.current = 0;
                  setHiddenCount(0);
                  setFadingIndex(null);
                  setIsSwapping(false);
                  setWhiteDotPos(0);
                  setGrayDotPos(null);
                  scrollerRef.current?.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                }}
              />

              <CityButton
                label="Phuket"
                active={selectedCity === "Phuket"}
                onClick={() => {
                  setSelectedCity("Phuket");
                  setActiveIndex(0);
                  prevIndexRef.current = 0;
                  setHiddenCount(0);
                  setFadingIndex(null);
                  setIsSwapping(false);
                  setWhiteDotPos(0);
                  setGrayDotPos(null);
                  scrollerRef.current?.scrollTo({
                    left: 0,
                    behavior: "smooth",
                  });
                }}
              />
            </div>

            <div className="w-[289px] h-[185px] flex items-center">
              <div
                key={selectedCity}
                ref={scrollerRef}
                className="w-full h-[185px] flex gap-2 overflow-x-auto scroll-smooth hide-scrollbar"
              >
                {displayedCards.map((c: Card, i: number) => (
                  <div
                    key={c.id}
                    className={`flex-none w-[155px] h-[185px] rounded-2xl p-2 backdrop-blur-xl relative overflow-hidden ${
                      i < hiddenCount ? "hidden" : ""
                    }`}
                    style={{
                      backgroundColor: "rgba(70,50,20,0.15)",
                      transform:
                        i === fadingIndex
                          ? "translateX(-16px) scale(0.985)"
                          : "translateX(0) scale(1)",
                      opacity: i === fadingIndex ? 0 : 1,
                      transition: `transform ${ANIM_DUR}ms ${EASE}, opacity ${ANIM_DUR}ms ${EASE}`,
                      zIndex: i === fadingIndex ? 30 : 10,
                    }}
                  >
                    <Image
                      src={c.img}
                      alt={c.title}
                      width={139}
                      height={113}
                      className="w-[139px] h-[113px] rounded-lg object-cover"
                    />
                    <div className="w-[139px] h-12 flex flex-col items-center justify-center text-center mt-2 gap-2">
                      <p className="h-[15px] font-poltawski font-bold text-[14px] text-[#FCF9F6] m-0 leading-none">
                        {c.title}
                      </p>
                      <p className="h-[25px] font-mont font-normal text-[12px] text-[#FCF9F6] m-0 leading-[1.15]">
                        {c.desc}
                      </p>
                    </div>
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-2xl"
                      style={{
                        boxShadow:
                          "inset 0 1px 0 rgba(255,255,255,0.20), inset 1px 0 0 rgba(255,255,255,0.12)",
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="absolute top-[249px] left-[53px] w-[152px] h-[30px] flex items-center justify-between z-20">
              <button
                className="w-[30px] h-[30px] rounded-full bg-white/6 flex items-center justify-center"
                onClick={() => scrollBy(-1)}
                aria-label="Previous"
              >
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 1L2 8L8 15"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <div className="w-[76px] relative flex items-center justify-center">
                <div className="flex gap-1 items-center justify-center">
                  {[0, 1, 2, 3].map((i) => {
                    const shouldHide = isSwapping
                      ? i === whiteDotPos ||
                        (grayDotPos !== null && i === Math.round(grayDotPos))
                      : i === activeIndex;

                    return (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full bg-white/70`}
                        aria-hidden
                        style={{
                          opacity: shouldHide ? 0 : 1,
                          transition: `opacity 200ms ${EASE}`,
                        }}
                      />
                    );
                  })}
                </div>

                <div
                  aria-hidden
                  className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-full bg-white"
                  style={{
                    transform: `translateX(${whiteDotPos * DOT_STEP}px)`,
                    transition: `transform ${SWAP_DUR}ms ${EASE}`,
                  }}
                />

                {isSwapping && grayDotPos !== null && (
                  <div
                    aria-hidden
                    className="pointer-events-none absolute top-0 left-0 w-4 h-4 rounded-full bg-white/70"
                    style={{
                      transform: `translateX(${grayDotPos * DOT_STEP}px)`,
                      transition: `transform ${SWAP_DUR}ms ${EASE}`,
                    }}
                  />
                )}
              </div>

              <button
                className="w-[30px] h-[30px] rounded-full bg-white/6 flex items-center justify-center"
                onClick={() => scrollBy(1)}
                aria-label="Next"
              >
                <svg
                  width="10"
                  height="16"
                  viewBox="0 0 10 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 1L8 8L2 15"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        /* hide scrollbars only for the horizontal scroller used in this component */
        .hide-scrollbar {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </>
  );
}
