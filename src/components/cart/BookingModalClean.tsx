"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

type Props = { open: boolean; onClose: () => void };

export default function BookingModalClean({ open, onClose }: Props) {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open || !mounted) return null;

  const modal = (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />

      <div className="relative z-10 mx-auto backdrop-blur-lg">
        {/* Desktop layout */}
        <div className="hidden md:block">
          <div
            className="relative bg-[rgba(255,255,255,0.04)] shadow-2xl"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
              width: 600,
              height: 665,
              borderRadius: 35,
              padding: 40,
            }}
          >
            <div className="flex flex-col items-center gap-16">
              <div
                style={{ width: 150, height: 135 }}
                className="flex items-center justify-center"
              >
                <Image
                  src="/Images/cartIcons/logo.png"
                  alt="Ananya"
                  width={150}
                  height={135}
                />
              </div>

              <div className="w-full flex justify-center">
                <div
                  style={{
                    width: 500,
                    height: 0,
                    borderTop: "1px solid #C2C2C2",
                  }}
                />
              </div>

              <div
                style={{ width: 326, height: 302 }}
                className="flex flex-col items-center gap-8"
              >
                <h2 className="text-[40px] leading-[1] font-poltawski font-bold text-white text-center pb-8">
                  Where Serenity Finds You.
                </h2>

                <div
                  style={{ width: 326, height: 166 }}
                  className="flex flex-col items-center gap-6"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push("/booking/signin");
                    }}
                    className="w-[275px] h-[49px] rounded-[20px]  py-[5px] px-[10px] border border-white/20 text-white text-[24px] font-poltawski font-medium opacity-80 cursor-pointer"
                    style={{
                      boxShadow:
                        "inset 0 0.5px 0 rgba(255,255,255,1), inset 0 -0.5px 0 rgba(255,255,255,1)",
                    }}
                  >
                    Sign In Account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push("/booking/payment");
                    }}
                    className="w-[275px] h-[49px] rounded-[20px] border border-white/20 text-white text-[24px] font-poltawski font-medium opacity-80 cursor-pointer py-[5px] px-[10px]"
                    style={{
                      boxShadow:
                        "inset 0 0.5px 0 rgba(255,255,255,1), inset 0 -0.5px 0 rgba(255,255,255,1)",
                    }}
                  >
                    Continue As Guest
                  </button>
                  <div className="mt-2 text-[16px] text-white">
                    New to Ananya?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push("/booking/signin");
                      }}
                      className="text-[#B4B4B4]"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile layout */}
        <div className="block md:hidden">
          <div
            className="relative bg-[rgba(255,255,255,0.04)] shadow-2xl"
            style={{
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
              width: 249,
              height: 349,
              borderRadius: 23.5,
              padding: 15,
            }}
          >
            <div className="flex flex-col items-center gap-6">
              <div
                style={{ width: 161, height: 80 }}
                className="flex items-center justify-center"
              >
                <Image
                  src="/Images/cartIcons/logoMobile.png"
                  alt="Ananya"
                  width={161}
                  height={80}
                />
              </div>

              <div className="w-full flex justify-center">
                <div
                  style={{
                    width: 215,
                    height: 0,
                    borderTop: "1px solid #C2C2C2",
                  }}
                />
              </div>

              <div
                style={{ width: 219, height: 176 }}
                className="flex flex-col items-center gap-3"
              >
                <h2 className="text-[27px] leading-[1] font-poltawski font-bold text-white text-center">
                  Where Serenity Finds You.
                </h2>

                <div
                  style={{ width: 220, height: 95 }}
                  className="flex flex-col items-center gap-2"
                >
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push("/booking/signin");
                    }}
                    className="w-31 h-[33px] rounded-[20px]  py-[5px] px-[10px] border border-white/20 text-white text-[12px] font-poltawski font-medium opacity-80 cursor-pointer"
                    style={{
                      boxShadow:
                        "inset 0 0.5px 0 rgba(255,255,255,1), inset 0 -0.5px 0 rgba(255,255,255,1)",
                    }}
                  >
                    Sign In Account
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      router.push("/booking/payment");
                    }}
                    className="w-31 h-[33px]  rounded-[20px] border border-white/20 text-white text-[12px] font-poltawski font-medium opacity-80 cursor-pointer py-[5px] px-[10px]"
                    style={{
                      boxShadow:
                        "inset 0 0.5px 0 rgba(255,255,255,1), inset 0 -0.5px 0 rgba(255,255,255,1)",
                    }}
                  >
                    Continue As Guest
                  </button>
                  <div className="text-[11px] text-white">
                    New to Ananya?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        onClose();
                        router.push("/booking/signin");
                      }}
                      className="text-[#B4B4B4]"
                    >
                      Sign up
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}
