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

export default function PaymentCartSummary({ items, summary }: Props) {
  const [localItems, setLocalItems] = React.useState<CartItem[]>(items || []);
  const [localSummary, setLocalSummary] = React.useState<Summary>(summary);
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
    setLocalSummary({ totalGuests: `${totalGuests} Adults`, totalCost });
  }, [localItems]);

  return (
    <aside className="hidden md:block w-full md:w-[441px] shrink-0 bg-linear-to-br from-white/5 to-white/10 backdrop-blur-lg rounded-[35px] p-4 md:p-6">
      <div className="mb-3">
        <h3 className="text-[24px] font-poltawski font-bold text-white">
          Your Cart : {localItems.length} Item
          {localItems.length !== 1 ? "s" : ""}
        </h3>
      </div>

      <div className="space-y-4">
        {localItems.length > 0 ? (
          localItems.map((item) => (
            <div
              key={item.id}
              className="relative border border-white rounded-lg p-3 bg-[rgba(255,255,255,0.03)]"
            >
              <div className="flex justify-between items-start mb-2">
                <div className="text-[18px] font-mediumfont-montserrat text-[#C2C2C2]">
                  {item.title}
                </div>
                <div className="text-[18px] font-mediumfont-montserrat text-[#C2C2C2]">
                  THB {item.pricePerNight}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-[18px] font-medium font-montserrat text-[#C2C2C2]">
                <div>Total Nights</div>
                <div className="text-right">{item.nights} Nights</div>

                <div>Extra Bed</div>
                <div className="text-right">
                  {item.extraBed ? `+THB 800` : " - "}
                  <div className="text-right text-[14px] text-[#C2C2C2]/60 font-montserrat">
                    per night
                  </div>
                </div>

                <div>{item.beds.join(", ")}</div>
                <div className="text-right"></div>

                <div>Max Guests</div>
                <div className="text-right">{item.persons} Adults</div>

                <div className="col-span-2 mt-2">
                  <div className="flex items-center justify-between text-[18px] font-medium font-montserrat text-[#C2C2C2]">
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

        <div className="mt-2 p-4 rounded-lg">
          <div className="flex justify-between text-[16px] text-white mb-2">
            <div>Total Guests</div>
            <div>{localSummary.totalGuests}</div>
          </div>

          <div className="flex justify-between items-end">
            <div className="text-[16px] text-white">Total Costs</div>
            <div className="text-[20px] font-medium text-white">
              THB {localSummary.totalCost}
            </div>
          </div>

          <div className="text-[14px] text-[#C2C2C2]/60 font-montserrat mt-2">
            Including taxes and fees
          </div>

          <div className="mt-4 flex justify-center">
            
          </div>
        </div>
      </div>
    </aside>
  );
}
