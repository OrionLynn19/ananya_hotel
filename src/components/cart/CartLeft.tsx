"use client";
import React from "react";
import Image from "next/image";

type CartItem = {
  id: string;
  title: string;
  image: string;
  beds: string[];
  extraBed: boolean;
  persons: number;
  quantity: number;
  pricePerNight: number;
  startDate: string;
  endDate: string;
  nights: number;
  location: string;
};

type Props = {
  items: CartItem[];
};

// ✅ Helper function to parse date without timezone issues
function parseLocalDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed
}

export default function CartLeft({ items }: Props) {
  return (
    <div
      className="w-full md:flex-1 bg-linear-to-br from-white/5 to-white/10 backdrop-blur-2xl shadow-lg rounded-[35px] p-4 md:p-10"
      style={{
        boxShadow:
          "inset 0 2px 0 rgba(255,255,255,1), inset 0 -2px 0 rgba(255,255,255,1)",
      }}
    >
      <h2 className="text-[32px] font-poltawski font-semibold text-white mb-6">
        Your Cart : {items.length} Items
      </h2>

      <div className="space-y-6">
        {items.map((it) => {
          const bedType = it.beds[0] || "King Bed";
          const isExtraBed = bedType === "Extra Bed";
          const isTwinBed = bedType.toLowerCase().includes("twin");
          
          const bedIcon = isExtraBed
            ? "/Images/cartIcons/token_extra.png"
            : isTwinBed
            ? "/Images/cartIcons/twin.png"
            : "/Images/cartIcons/single.png";

          // ✅ Calculate price breakdown for extra bed
          const extraBedCostPerNight = 800;
          const packagePricePerNight = isExtraBed 
            ? it.pricePerNight - extraBedCostPerNight 
            : it.pricePerNight;

          return (
            <article
              key={it.id}
              className="bg-[rgba(255,255,255,0.03)] rounded-lg p-4 md:p-5"
              style={{
                boxShadow:
                  "inset 1px 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
              }}
            >
              <div className="flex gap-4 md:gap-6 items-start">
                <div className="flex-1">
                  <div className="md:w-[747px] md:h-[165px] w-full md:mx-0">
                    <div className="md:grid md:grid-cols-[1fr_auto] md:items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-20 h-20 md:w-[165px] md:h-[165px] rounded-md overflow-hidden shrink-0">
                          <Image
                            src={it.image.startsWith('/') ? it.image : `/Images/${it.image}`}
                            alt={it.title}
                            width={165}
                            height={165}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div>
                          <h3 className="text-[20px] md:text-[32px] font-poltawski font-semibold text-white">
                            {it.title}
                          </h3>

                          <div className="text-sm md:text-[18px] text-white/90 mt-2">
                            <div className="flex items-center gap-3">
                              <span className="flex items-center gap-2">
                                <Image
                                  src={bedIcon}
                                  alt={bedType}
                                  width={29}
                                  height={14}
                                  className="w-[29px] h-3.5"
                                />
                                <span>{bedType}</span>
                              </span>
                            </div>

                            <div className="mt-2 flex items-center gap-2">
                              <Image
                                src="/Images/cartIcons/person.png"
                                alt="Person"
                                width={24}
                                height={24}
                                className="w-6 h-6"
                              />
                              <span>{it.persons} Person</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="flex flex-col items-end gap-1">
                          {/* ✅ Show price breakdown for extra bed */}
                          {isExtraBed ? (
                            <>
                              <div className="text-[14px] text-white/70">
                                Package: THB {packagePricePerNight.toLocaleString()}
                              </div>
                              <div className="text-[14px] text-yellow-300">
                                Extra Bed: + THB {extraBedCostPerNight.toLocaleString()}
                              </div>
                              <div className="text-[18px] md:text-[24px] font-medium text-white mt-1">
                                THB {it.pricePerNight.toLocaleString()}
                              </div>
                            </>
                          ) : (
                            <div className="text-[18px] md:text-[24px] font-medium text-white">
                              THB {it.pricePerNight.toLocaleString()}
                            </div>
                          )}
                          <div className="text-[12px] text-white/60">per night</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-t border-white my-4" />

                  <div className="flex flex-wrap gap-2 text-[14px] md:text-[18px] text-white/90 items-center">
                    <div>
                      {parseLocalDate(it.startDate).toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="opacity-80">→</div>
                    <div>
                      {parseLocalDate(it.endDate).toLocaleDateString(undefined, {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </div>
                    <div className="mx-8 flex items-center gap-1.5">
                      <Image
                        src="/Images/cartIcons/night.png"
                        alt="Nights"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <span>{it.nights} Nights</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Image
                        src="/Images/cartIcons/location.png"
                        alt="Location"
                        width={24}
                        height={24}
                        className="w-6 h-6"
                      />
                      <span>{it.location}</span>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
