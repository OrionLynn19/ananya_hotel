"use client";

import { useMemo, useState } from "react";
import DestinationPicker from "./DestinationPicker";
import RoomTabs from "./RoomTabs";
import RoomCard from "./RoomCard";
import { ROOMS, ROOM_TABS, DESTINATIONS, type Room } from "../data/room.data";

export default function RoomsScreen() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [destination, setDestination] = useState<string | null>(null);

  const filtered: Room[] = useMemo(
    () => (activeTab === "All" ? ROOMS : ROOMS.filter((r) => r.category === activeTab)),
    [activeTab]
  );

  const listClass =
    "mt-6 md:mt-8 flex flex-col gap-6 md:gap-8 " +
    (filtered.length > 2
      ? "md:max-h-[860px] md:overflow-y-auto md:pr-2 md:overscroll-y-contain md:snap-y"
      : "");

  return (
    <main className="min-h-screen bg-white text-[#3b2a16]">
      {/* Header */}
      <section className="mx-auto w-full max-w-6xl px-4 md:px-5 pt-8 md:pt-12">
        <h1 className="text-center text-[22px] sm:text-[24px] md:text-[32px] font-semibold">
          Room &amp; Suites at ANANYA
        </h1>
        <p className="mt-2 md:mt-3 text-center text-[12.5px] md:text-[14px] text-[#6c5845]">
          Experience unparalleled comfort and breathtaking ocean views in our premium accommodations.
        </p>
      </section>

      {/* Container */}
      <section className="mx-auto w-full max-w-6xl mt-6 md:mt-8 rounded-[20px] md:rounded-[32px] bg-[#FFFAF0] border border-[#f1e9d9] shadow-[0_8px_40px_rgba(0,0,0,0.05)] px-4 py-5 md:px-10 md:py-10">
        
        {/* Sticky Toolbar */}
        <div className="sticky top-0 z-[5] -mx-4 md:mx-0 bg-[#FFFAF0]/95 backdrop-blur supports-[backdrop-filter]:bg-[#FFFAF0]/70 px-4 py-3 md:px-0 md:py-0 border-b border-[#efe5d4] md:border-none">
          <div className="grid gap-3 md:gap-5">
            
            {/* Destination Picker → ALWAYS RIGHT */}
            <div className="flex justify-end w-full">
              <DestinationPicker
                value={destination}
                options={DESTINATIONS}
                onChange={setDestination}
              />
            </div>

            {/* Tabs – scrollable on mobile */}
            <div className="-mx-2 md:mx-0">
              <div className="px-2 md:px-0 overflow-x-auto no-scrollbar">
                <RoomTabs tabs={ROOM_TABS} active={activeTab} onChange={setActiveTab} />
              </div>
            </div>
          </div>
        </div>

        {/* Rooms List */}
        {filtered.length === 0 ? (
          <div className="mt-8 md:mt-10 rounded-2xl border border-[#efeadf] bg-white p-6 md:p-8 text-center text-sm text-[#6c5845]">
            No rooms available for this filter.
          </div>
        ) : (
          <div className={listClass}>
            {filtered.map((room) => (
              <div key={room.id} className={filtered.length > 2 ? "md:snap-start" : ""}>
                <RoomCard room={room} />
              </div>
            ))}
          </div>
        )}

        <div className="h-6 md:h-0" />
      </section>
    </main>
  );
}
