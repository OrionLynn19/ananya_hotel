"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

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

export default function MobileCartSummary({ items, summary, onChange }: Props) {
  const [localItems, setLocalItems] = React.useState<CartItem[]>(items || []);
  const [localSummary, setLocalSummary] = React.useState<Summary>(summary);
  const [isEditing, setIsEditing] = React.useState(false);
  const router = useRouter();

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
    const newSummary = { totalGuests: `${totalGuests} Adults`, totalCost };
    setLocalSummary(newSummary);
  }, [localItems, onChange]);
  return (
    <div className="block md:hidden px-4 pt-6">
      <div
        className="max-w-sm mx-auto bg-linear-to-br from-white/5 to-white/10 backdrop-blur-2xl rounded-3xl p-4 shadow-lg"
        style={{
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.12), inset 0 -1px 0 rgba(255,255,255,0.06)",
        }}
      >
        <div className="flex items-start justify-between mb-3">
          <h4 className="text-lg font-poltawski font-semibold text-white">
            Your Cart : {localItems.length} Item
            {localItems.length !== 1 ? "s" : ""}
          </h4>
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
                className="opacity-80"
              />
            </button>
          )}
        </div>
        <div className="text-[14px] text-white/90 mb-3">
          Total Guests{" "}
          <span className="float-right">{localSummary.totalGuests}</span>
        </div>
        <div className="text-[14px] text-white/90 mb-1">
          Total Costs{" "}
          <span className="float-right">THB {localSummary.totalCost}</span>
        </div>
        <div className="text-[12px] text-white/60 mb-4">
          Including taxes and fees
        </div>
        {localItems.length > 0 ? (
          <div className="space-y-5">
            {localItems.map((item) => (
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
                    onClick={async () => {
                      try {
                        const res = await fetch(
                          `/api/cart?id=${encodeURIComponent(item.id)}`,
                          { method: "DELETE" }
                        );
                        if (!res.ok) {
                          const err = await res.json().catch(() => ({}));
                          alert(err?.error || "Failed to remove item");
                          return;
                        }

                        // broadcast update so other components re-fetch
                        try {
                          window.dispatchEvent(new CustomEvent("cart-updated"));
                        } catch {
                          const ev = document.createEvent("Event");
                          ev.initEvent("cart-updated", true, true);
                          window.dispatchEvent(ev);
                        }

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
                          const extra = it.extraBed
                            ? 800 * (it.nights || 1)
                            : 0;
                          return acc + room + extra;
                        }, 0);
                        const newSummary = {
                          totalGuests: `${totalGuests} Adults`,
                          totalCost,
                        };
                        if (typeof onChange === "function")
                          onChange(remaining, newSummary);
                        if (remaining.length === 0) setIsEditing(false);
                      } catch (err) {
                        console.error("Error removing cart item", err);
                        alert("Error removing item. Please try again.");
                      }
                    }}
                    className="absolute -top-7 -right-4 p-1 w-8 h-8 flex items-center justify-center cursor-pointer"
                  >
                    <Image
                      src="/Images/cartIcons/close.png"
                      alt="close"
                      width={15}
                      height={15}
                      className="opacity-100"
                    />
                  </button>
                )}

                <div className="grid grid-cols-2 gap-2 text-sm text-white">
                  <div>Total Nights</div>
                  <div className="text-right">{item.nights} Nights</div>

                  <div>Extra Bed</div>
                  <div className="text-right">
                    {item.extraBed ? `+THB 800` : " - "}
                    <div className=" text-right text-[12px] text-white/60 mb-4">
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
            ))}
          </div>
        ) : (
          <div className="py-6 text-white/70 text-center">
            Your cart is empty
          </div>
        )}
        <div className="mt-4">
          {isEditing ? (
            <button
              onClick={() => {
                setIsEditing(false);
              }}
              className="mx-auto block w-[84px] bg-[#463214]/25 font-montserrat text-[10px] font-[500px] text-white py-2 rounded-xl text-center cursor-pointer"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
              }}
            >
              Confirm
            </button>
          ) : (
            <button
              disabled={localItems.length === 0}
              onClick={() => router.push("/booking/payment")}
              className="mx-auto  block bg-[#463214]/25 w-[84px] font-montserrat text-[10px] font-[500px] text-white py-2 rounded-xl disabled:opacity-50 cursor-pointer"
              style={{
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,1), inset 0 -1px 0 rgba(255,255,255,1)",
              }}
            >
              Book Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
