"use client";
import React, { useState } from "react";

type Props = {
  label?: string;
  onClick?: () => void;
  className?: string;
  height?: number;
  padding?: string;
  fontSize?: number;
  borderRadius?: number;
  width?: number | string;
};

export default function HeroLearnButton({
  label = "Learn More",
  onClick,
  className = "",
  height,
  padding,
  fontSize,
  borderRadius,
  width,
}: Props) {
  const [hover, setHover] = useState(false);
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: borderRadius ?? 20,
        position: "relative",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: borderRadius ?? 20,
          padding: 0.5,
          background:
            "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0.05))",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <button
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        className="font-poltawski font-bold"
        style={{
          position: "relative",
          zIndex: 1,
          height: height ?? 57,
          padding: padding ?? "10px 24px",
          boxSizing: "border-box",
          borderRadius: borderRadius ? borderRadius - 2 : 18,
          width: width,
          border: "0.5px solid rgba(70,50,20,0.12)",
          background: hover ? "rgba(70,50,20,0.50)" : "rgba(70,50,20,0.06)",
          color: "#FCF9F6",
          lineHeight: "1",
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fontSize ?? 24,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          cursor: "pointer",
          transition: "background-color 160ms ease, transform 160ms ease",
        }}
      >
        {label}
      </button>
    </span>
  );
}
