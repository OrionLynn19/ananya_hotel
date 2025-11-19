"use client";
import React from "react";
import Image from "next/image";
import BookingModal from "./BookingModalClean";

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

type Summary = { totalGuests: string; totalCost: number };

type Props = {
  items: CartItem[];
  summary: Summary;
  onChange?: (items: CartItem[], summary: Summary) => void;
};

export default function DesktopCartSummary({
  items,
  summary,
  onChange,
}: Props) {
  const [localItems, setLocalItems] = React.useState<CartItem[]>(items || []);
  const [localSummary, setLocalSummary] = React.useState<Summary>(summary);
  const [isEditing, setIsEditing] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  React.useEffect(() => {
    setLocalItems(items || []);
    setLocalSummary(summary);
  }, [items, summary]);

  React.useEffect(() => {
    const totalGuests = localItems.reduce(
      (acc, it) => acc + (it.persons || 0),
      0
    );
    const totalCost = localItems.reduce((acc, it) => {
      const room = it.pricePerNight * (it.nights || 1);
      const extra = it.extraBed ? 800 * (it.nights || 1) : 0;
      return acc + room + extra;
    }, 0);
    setLocalSummary({ totalGuests: `${totalGuests} Adults`, totalCost });
  }, [localItems]);

  return (
    <aside className="hidden md:block w-full md:w-[441px] shrink-0 bg-linear-to-br from-white/5 to-white/10  backdrop-blur-lg rounded-[35px] p-4 md:p-6">
      <div className="flex items-start justify-between mb-4">
        <h3 className="text-[24px] font-poltawski font-bold text-white">
          Your Cart : {localItems.length} Item
          {localItems.length !== 1 ? "s" : ""}
        </h3>
        {!isEditing && localItems.length > 0 && (
          <button
            aria-label="Edit cart"
            onClick={() => setIsEditing(true)}
            className="text-white p-1 cursor-pointer"
          >
            <Image
              src="/Images/cartIcons/edit.png"
              alt="edit"
              width={16}
              height={16}
            />
          </button>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between text-[18px] text-white/90">
          <div>Total Guests</div>
          <div>{localSummary.totalGuests}</div>
        </div>

        <div className="flex justify-between items-end">
          <div className="text-[18px] text-white/90">Total Costs</div>
          <div className="text-[22px] font-medium text-white">
            THB {localSummary.totalCost}
          </div>
        </div>

        <div className="text-[12px] text-white/60">
          Including taxes and fees
        </div>

        <div className="space-y-5 pr-2">
          {localItems.length > 0 ? (
            localItems.map((item) => (
              <div
                key={item.id}
                className="relative border border-white rounded-lg p-3 bg-[rgba(255,255,255,0.03)]"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="text-white">{item.title}</div>
                  <div className="text-white">THB {item.pricePerNight}</div>
                </div>

                {isEditing && (
                  <button
                    aria-label={`Remove ${item.title}`}
                    onClick={() => {
                      const remaining = localItems.filter(
                        (i) => i.id !== item.id
                      );
                      setLocalItems(remaining);
                      const totalGuests = remaining.reduce(
                        (acc, it) => acc + (it.persons || 0),
                        0
                      );
                      const totalCost = remaining.reduce((acc, it) => {
                        const room = it.pricePerNight * (it.nights || 1);
                        const extra = it.extraBed ? 800 * (it.nights || 1) : 0;
                        return acc + room + extra;
                      }, 0);
                      const newSummary = {
                        totalGuests: `${totalGuests} Adults`,
                        totalCost,
                      };
                      if (typeof onChange === "function")
                        onChange(remaining, newSummary);
                      if (remaining.length === 0) setIsEditing(false);
                    }}
                    className="absolute -top-7 -right-3 p-1 w-8 h-8 flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src="/Images/cartIcons/close.png"
                      alt="close"
                      width={15}
                      height={15}
                    />
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2 text-sm text-white">
                  <div>Total Nights</div>
                  <div className="text-right">{item.nights} Nights</div>

                  <div>Extra Bed</div>
                  <div className="text-right">
                    {item.extraBed ? `+THB 800` : " - "}
                    <div className="text-right text-[12px] text-white/60">
                      per night
                    </div>
                  </div>

                  <div>{item.beds.join(", ")}</div>
                  <div className="text-right"></div>

                  <div>Max Guests</div>
                  <div className="text-right">{item.persons} Adults</div>

                  <div className="col-span-2 mt-2">
                    <div className="flex items-center justify-between text-sm text-white">
                      <div>
                        {new Date(item.startDate || "").toLocaleDateString(
                          undefined,
                          {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                      <div className="opacity-80">
                        <Image
                          src="/Images/cartIcons/arrowRight.png"
                          alt="arrow-right"
                          width={15}
                          height={15}
                        />
                      </div>
                      <div className="text-right">
                        {new Date(item.endDate || "").toLocaleDateString(
                          undefined,
                          {
                            weekday: "long",
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}
                      </div>
                    </div>
                  </div>

                  <div>Location</div>
                  <div className="text-right">{item.location}</div>

                  <div className="col-span-2 mt-2 flex justify-between">
                    <div>Total</div>
                    <div>THB {item.pricePerNight * item.nights}</div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-6 text-white/70 text-center">
              Your cart is empty
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-center">
          {isEditing ? (
            <button
              onClick={() => setIsEditing(false)}
              className="w-[139px] text-[18px] font-montserrat font-[500px] bg-[#463214]/25 text-white px-6 py-3 rounded-[20px] text-center cursor-pointer"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
              }}
            >
              Confirm
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="w-40 text-[18px] font-montserrat font-[500px] bg-[#463214]/25 text-white px-6 py-3 rounded-[20px] text-center cursor-pointer"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
              }}
            >
              Book Now
            </button>
          )}
        </div>

        <BookingModal open={showModal} onClose={() => setShowModal(false)} />
      </div>
    </aside>
  );
}
