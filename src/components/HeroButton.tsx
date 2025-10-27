import React, { ReactNode } from "react";

interface CtaButtonProps {
  children: ReactNode;
  onClick?: () => void;
}
const CtaButton = ({ children, onClick = () => {} }: CtaButtonProps) => {
  const textColor = "text-[#463214]";

  return (
    <button
      onClick={onClick}
      className={`
        relative
        w-[135px] h-7 md:w-[281px] md:h-[57px] rounded-lg md:rounded-[20px]
        flex items-center justify-center
        ${textColor} font-poltawski font-bold text-[12px] md:text-[24px] leading-none
        transition-transform duration-300 hover:scale-[1.01] focus:outline-none active:scale-[0.99]
      `}
    >
      <div className="w-full h-full rounded-[calc(0.5rem-1px)] md:rounded-[calc(1.25rem-1px)] backdrop-blur-xl flex items-center justify-center relative overflow-hidden">
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            padding: "0.5px",
            pointerEvents: "none",
            zIndex: 0,
            background:
              "linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,1), rgba(255,255,255,0.05))",
            WebkitMask:
              "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
          }}
        />
        <div className="absolute inset-0 rounded-[calc(0.5rem-1px)] md:rounded-[calc(1.25rem-1px)] bg-[#463214]/12" />

        <span className="relative z-10">
          {children || "Discover Our Rooms"}
        </span>
      </div>
    </button>
  );
};

export default CtaButton;
