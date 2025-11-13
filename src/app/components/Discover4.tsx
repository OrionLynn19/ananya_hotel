"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function Discover4() {
  const [selected, setSelected] = useState<"restaurant" | "spa">("restaurant");
  const [prevSelected, setPrevSelected] = useState<"restaurant" | "spa" | null>(
    null
  );
  const [fadeActive, setFadeActive] = useState(false);
  const transitionMs = 350; // crossfade duration (ms)
  const timeoutRef = useRef<number | null>(null);
  const triggerRef = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (triggerRef.current) clearTimeout(triggerRef.current);
    };
  }, []);

  const handleSelect = (s: "restaurant" | "spa") => {
    if (s === selected) return;
    setPrevSelected(selected);
    setSelected(s);
    setFadeActive(false);

    if (triggerRef.current) window.clearTimeout(triggerRef.current);
    triggerRef.current = window.setTimeout(() => {
      setFadeActive(true);
      triggerRef.current = null;
    }, 20);

    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => {
      setPrevSelected(null);
      setFadeActive(false);
      timeoutRef.current = null;
    }, transitionMs + 30);
  };

  const images = {
    restaurant: {
      main: "/images/headimage11.png",
      thumbs: [
        "/images/rest1.png",
        "/images/rest2.png",
        "/images/rest3.png",
        "/images/rest4.png",
      ],
      title: "A Taste by the Sea",
      description:
        "Savor fresh, flavorful dishes crafted with care, served in a beautiful beachfront setting.",
      heading: "Dining by the Sea",
      subheading: "Fresh flavors, stunning views, and moments to savor.",
    },
    spa: {
      main: "/images/headimage22.png",
      thumbs: [
        "/images/spa1.png",
        "/images/spa2.png",
        "/images/spa3.png",
        "/images/spa4.png",
      ],
      title: "Serenity Awaits",
      description:
        "Escape into a world of peace where ancient techniques meet modern wellness, crafted to nurture body and soul.",
      heading: "Wellness by the Waves",
      subheading:
        "Calming rituals, soothing touch, and moments of deep relaxation.",
    },
  };

  const fontFamily = '"Poltawski Nowy", "Helvetica Neue", Arial, sans-serif';

  const containerStyle: React.CSSProperties = {
    maxWidth: "100%",
    gap: 48,
    display: "flex",
    flexDirection: "column",
    boxSizing: "border-box",
  };

  const mainImageWrapperStyle: React.CSSProperties = {
    padding: "32px 24px 32px 24px",
  };

  const mainImageStyle: React.CSSProperties = {
    width: "100%",
    height: 650,
    borderRadius: 32,
    overflow: "hidden",
    position: "relative",
  };

  const imageLayerStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    transition: `opacity ${transitionMs}ms ease`,
    willChange: "opacity",
  };

  const overlayTextWrapperStyle: React.CSSProperties = {
    position: "absolute",
    zIndex: 1000,
    marginTop: -300,
    paddingLeft: 40,
    fontFamily,
  };

  const thumbsContainerStyle: React.CSSProperties = {
    width: "100%",
    height: 508.88,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    gap: 24,
    boxSizing: "border-box",
    paddingLeft: 32,
    paddingRight: 32,
  };

  const thumbStyleBase: React.CSSProperties = {
    width: 285,
    height: 444,
    borderRadius: 32,
    overflow: "hidden",
    flex: "0 0 285px",
    transition: "transform 180ms ease, box-shadow 180ms ease",
    cursor: "pointer",
    position: "relative",
  };

  return (
    <section
      className="mx-auto max-w-full 2xl:w-full"
      style={containerStyle}
      aria-label="Discover section"
    >
      {/* Desktop-only wrapper: hidden on small screens */}
      <div className="hidden md:block">
        {/* Top toggle */}
        <div
          className="mx-auto w-[1217px] max-w-full 2xl:w-full"
          style={{ display: "flex", justifyContent: "center", paddingTop: 24 }}
        >
          <div
            role="tablist"
            aria-label="Restaurant or Spa"
            style={{
              display: "flex",
              width: 307,
              height: 94,
              padding: 16,
              gap: 16,
              borderRadius: 24,
              background: "#FFFFFF",
              alignItems: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              boxSizing: "border-box",
            }}
          >
            <button
              aria-pressed={selected === "restaurant"}
              onClick={() => handleSelect("restaurant")}
              style={{
                width: 189,
                height: 72,
                padding: 10,
                borderRadius: 16,
                background:
                  selected === "restaurant" ? "#463214" : "transparent",
                color: selected === "restaurant" ? "#FFFFFF" : "#463214",
                fontSize: 25,
                lineHeight: "1",
                fontWeight: 700,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition:
                  "background-color 160ms ease, color 160ms ease, box-shadow 160ms ease",
                cursor: "pointer",
                boxSizing: "border-box",
                fontFamily,
              }}
            >
              Restaurant
            </button>

            <button
              aria-pressed={selected === "spa"}
              onClick={() => handleSelect("spa")}
              style={{
                width: 90,
                height: 72,
                padding: 10,
                borderRadius: selected === "spa" ? 24 : 16,
                background: selected === "spa" ? "#463214" : "transparent",
                color: selected === "spa" ? "#FFFFFF" : "#463214",
                fontSize: 25,
                lineHeight: "1",
                fontWeight: 700,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition:
                  "background-color 160ms ease, color 160ms ease, border-radius 160ms ease",
                cursor: "pointer",
                boxSizing: "border-box",
                fontFamily,
              }}
            >
              Spa
            </button>
          </div>
        </div>

        {/* Desktop main image + thumbs (unchanged) */}
        <div
          className="mx-auto w-[1217px] max-w-full 2xl:w-full"
          style={mainImageWrapperStyle}
        >
          <div style={mainImageStyle}>
            {prevSelected && (
              <div
                style={{
                  ...imageLayerStyle,
                  opacity: fadeActive ? 0 : 1,
                  zIndex: 1,
                }}
                aria-hidden
              >
                <Image
                  src={images[prevSelected].main}
                  alt={images[prevSelected].title}
                  fill
                  style={{ objectFit: "cover", borderRadius: 32 }}
                  priority
                />
              </div>
            )}

            <div
              style={{
                ...imageLayerStyle,
                opacity: prevSelected ? (fadeActive ? 1 : 0) : 1,
                zIndex: 2,
              }}
              aria-hidden={false}
            >
              <Image
                src={images[selected].main}
                alt={images[selected].title}
                fill
                style={{ objectFit: "cover", borderRadius: 32 }}
                priority
              />
            </div>
          </div>

          <div style={{ height: 10 }} />

          <div className="relative">
            <div style={overlayTextWrapperStyle}>
              {prevSelected && (
                <div
                  style={{
                    transition: `opacity ${transitionMs}ms.ease`,
                    opacity: fadeActive ? 0 : 1,
                    position: "absolute",
                    left: 0,
                    fontFamily,
                  }}
                  aria-hidden
                >
                  <h2
                    style={{
                      color: "#FCF9F6",
                      fontSize: 35,
                      fontWeight: 700,
                      textShadow: "0 6px 20px rgba(0,0,0,0.5)",
                      margin: 0,
                      fontFamily,
                    }}
                  >
                    {images[prevSelected].title}
                  </h2>
                  <p
                    className="mb-3"
                    style={{
                      color: "#FCF9F6",
                      fontSize: 20,
                      maxWidth: 520,
                      marginTop: 12,
                      textShadow: "0 6px 20px rgba(0,0,0,0.45)",
                      fontFamily,
                    }}
                  >
                    {images[prevSelected].description}
                  </p>
                </div>
              )}

              <div
                style={{
                  transition: `opacity ${transitionMs}ms.ease`,
                  opacity: prevSelected ? (fadeActive ? 1 : 0) : 1,
                  fontFamily,
                }}
              >
                <h2
                  style={{
                    color: "#FCF9F6",
                    fontSize: 35,
                    fontWeight: 700,
                    textShadow: "0 6px 20px rgba(0,0,0,0.5)",
                    margin: 0,
                    fontFamily,
                  }}
                >
                  {images[selected].title}
                </h2>
                <p
                  className="mb-3"
                  style={{
                    color: "#FCF9F6",
                    fontSize: 20,
                    maxWidth: 520,
                    marginTop: 12,
                    textShadow: "0 6px 20px rgba(0,0,0,0.45)",
                    fontFamily,
                  }}
                >
                  {images[selected].description}
                </p>

                <a href="/restaurantAndhealth" aria-label="Explore More">
                  <button
                    type="button"
                    className="text-white p-3 px-4 rounded-2xl"
                    style={{
                      cursor: "pointer",
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid white",
                      transition:
                        "background-color 160ms ease, transform 80ms ease",
                      fontFamily,
                    }}
                  >
                    Explore More
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="flex  flex-col justify-center items-center">
          <h1 className="text-[30px] pb-5 font-bold" style={{ fontFamily }}>
            {images[selected].heading}
          </h1>
          <p className="text-[20px] pb-3 font-semibold" style={{ fontFamily }}>
            {images[selected].subheading}
          </p>
        </div>

        <div
          className="mx-auto w-[1217px] max-w-full 2xl:w-full mb-10"
          style={thumbsContainerStyle}
        >
          {images[selected].thumbs.map((src, i) => {
            const isShifted = i % 2 === 1;
            const prevSrc =
              prevSelected && images[prevSelected]
                ? images[prevSelected].thumbs[i]
                : null;
            return (
              <div
                key={i}
                style={{
                  ...thumbStyleBase,
                  transform: isShifted
                    ? "translateY(64.58px)"
                    : "translateY(0)",
                }}
                className="group"
                aria-hidden={false}
              >
                {prevSrc && (
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      transition: `opacity ${transitionMs}ms.ease`,
                      opacity: fadeActive ? 0 : 1,
                      zIndex: 1,
                    }}
                    aria-hidden
                  >
                    <Image
                      src={prevSrc}
                      alt={`thumb-prev-${i + 1}`}
                      width={285}
                      height={444}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: 32,
                      }}
                      priority
                    />
                  </div>
                )}

                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    transition: `opacity ${transitionMs}ms.ease`,
                    opacity: prevSrc ? (fadeActive ? 1 : 0) : 1,
                    zIndex: 2,
                  }}
                >
                  <Image
                    src={src}
                    alt={`thumbnail-${i + 1}`}
                    width={285}
                    height={444}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: 32,
                    }}
                    priority
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Mobile-only layout (keeps desktop unchanged) */}
      <div
        className="w-full md:hidden flex flex-col items-center"
        style={{ padding: "8px 16px", boxSizing: "border-box" }}
      >
        {/* Mobile top toggle (compact) */}
        <div
          className="mx-auto w-[320px]"
          style={{ display: "flex", justifyContent: "center", paddingTop: 16 }}
        >
          <div
            role="tablist"
            aria-label="Restaurant or Spa"
            style={{
              display: "flex",
              width: 200,
              height: 56,
              padding: 8,
              gap: 8,
              borderRadius: 24,
              background: "#FFFFFF",
              alignItems: "center",
              boxShadow: "0 6px 18px rgba(0,0,0,0.06)",
              boxSizing: "border-box",
            }}
          >
            <button  
              aria-pressed={selected === "restaurant"}
              onClick={() => handleSelect("restaurant")}
              style={{
                flex: 1,
                height: 40,
                borderRadius: 12,
                background:
                  selected === "restaurant" ? "#463214" : "transparent",
                color: selected === "restaurant" ? "#FFFFFF" : "#463214",
                fontSize: 16,
                fontWeight: 700,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontFamily,
                
              }}
            >
              Restaurant
            </button>

            <button
              aria-pressed={selected === "spa"}
              onClick={() => handleSelect("spa")}
              style={{
                width: 80,
                height: 40,
                borderRadius: selected === "spa" ? 12 : 8,
                background: selected === "spa" ? "#463214" : "transparent",
                color: selected === "spa" ? "#FFFFFF" : "#463214",
                fontSize: 16,
                fontWeight: 700,
                border: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                fontFamily,
              }}
            >
              Spa
            </button>
          </div>
        </div>

        <div style={{ height: 10 }} />

        {/* Mobile headimage*/}
        <div
          className="mx-auto"
          style={{
            width: 406, // fixed width
            maxWidth: "100%",
            padding: "8px 16px", // top/bottom 8px, left/right 16px
            boxSizing: "border-box",
          }}
        >
          <div
            style={{
              width: "100%",
              height: 230, // fixed height
              borderRadius: 16, // radius 16px
              overflow: "hidden",
              position: "relative",
            }}
          >
            {/* previous layer (if present) */}
            {prevSelected && (
              <div
                style={{
                  ...imageLayerStyle,
                  opacity: fadeActive ? 0 : 1,
                  zIndex: 1,
                }}
                aria-hidden
              >
                <Image
                  src={images[prevSelected].main}
                  alt={images[prevSelected].title}
                  fill
                  style={{ objectFit: "cover" }}
                  priority
                />
              </div>
            )}

            {/* current layer */}
            <div
              style={{
                ...imageLayerStyle,
                opacity: prevSelected ? (fadeActive ? 1 : 0) : 1,
                zIndex: 2,
              }}
              aria-hidden={false}
            >
              <Image
                src={images[selected].main}
                alt={images[selected].title}
                fill
                style={{ objectFit: "cover" }}
                priority
              />
            </div>
          </div>

          <div style={{ height: 10 }} />

          {/* Title overlay (crossfades text when switching) */}
          <div className="relative">
            <div style={overlayTextWrapperStyle}>
              {prevSelected && (
                <div
                  style={{
                    transition: `opacity ${transitionMs}ms.ease`,
                    opacity: fadeActive ? 0 : 1,
                    position: "absolute",
                    left: 0,
                    fontFamily,
                  }}
                  aria-hidden
                >
                  <h2
                    style={{
                      color: "#FCF9F6",
                      fontSize: 16,
                      fontWeight: 700,
                      textShadow: "0 6px 20px rgba(0,0,0,0.5)",
                      margin: 0,
                      fontFamily,
                    }}
                  >
                    {images[prevSelected].title}
                  </h2>
                  <p
                    className="mb-3"
                    style={{
                      color: "#FCF9F6",
                      fontSize: 14,
                      fontWeight: 200,
                      maxWidth: 520,
                      marginTop: 12,
                      textShadow: "0 6px 20px rgba(0,0,0,0.45)",
                      fontFamily,
                    }}
                  >
                    {images[prevSelected].description}
                  </p>
                </div>
              )}

              <div
              className="pt-26"
                style={{
                  transition: `opacity ${transitionMs}ms.ease`,
                  opacity: prevSelected ? (fadeActive ? 1 : 0) : 1,
                  fontFamily,              }}
              >
                <h2
                  style={{
                    color: "#FCF9F6",
                    fontSize: 16,
                    fontWeight: 700,
                    textShadow: "0 6px 20px rgba(0,0,0,0.5)",
                    margin: 0,
                    fontFamily,
                  }}
                >
                  {images[selected].title}
                </h2>
                <p
                  className="mb-3"
                  style={{
                    color: "#FCF9F6",
                    fontSize: 14,
                    maxWidth: 520,
                    marginTop: 12,
                    textShadow: "0 6px 20px rgba(0,0,0,0.45)",
                    fontFamily,
                  }}
                >
                  {images[selected].description}
                </p>

                <a href="/resturantAndhealth" aria-label="Explore More">
                  <button
                    type="button"
                    className="text-white text-sm p-2 px-1 rounded-xl"
                    style={{
                      cursor: "pointer",
                      background: "rgba(255,255,255,0.04)",
                      backdropFilter: "blur(6px)",
                      WebkitBackdropFilter: "blur(6px)",
                      border: "1px solid white",
                      transition:
                        "background-color 160ms ease, transform 80ms ease",
                      fontFamily,
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.10)")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.background =
                        "rgba(255,255,255,0.04)")
                    }
                  >
                    Explore More
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile h1 and p under mobile head*/}
        <h1
          style={{
            fontFamily,
            fontWeight: 700,
            fontSize: 14,
            lineHeight: "100%",
            letterSpacing: 0,
            textAlign: "center",
            margin: 0,
            marginTop: 10,
            color: "#463214",
          }}
        >
          {images[selected].heading}
        </h1>

        <p
          style={{
            fontFamily,
            fontSize: 12,
            textAlign: "center",
            marginTop: 8,
            marginBottom: 8,
            color: "#463214",
            maxWidth: 300,
          }}
        >
          {images[selected].subheading}
        </p>
        {/* Mobile 4-thumb row — fixed width 390px, centered; items 2 & 4 shifted down */}
        <div
          style={{
            width: 390,
            maxWidth: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            gap: 12,
            marginTop: 16,
            marginBottom: 40,
          }}
        >
          {images[selected].thumbs.slice(0, 4).map((src, i) => (
            <div
              key={`mobile-thumb-${i}`}
              style={{
                width: 86,
                height: 138,
                borderRadius: 8,
                overflow: "hidden",
                flex: "0 0 86px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.06)",
                transform: i % 2 === 1 ? "translateY(24px)" : "translateY(0)",
                transition: "transform 160ms ease",
                background: "#fff",
              }}
            >
              <Image
                src={src}
                alt={`mobile-thumb-${i + 1}`}
                width={86}
                height={138}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: 8,
                }}
                priority
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
