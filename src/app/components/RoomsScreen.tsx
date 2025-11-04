"use client";

import { useMemo, useState } from "react";
import DestinationPicker from "./parts/DestinationPicker";
import RoomTabs from "./parts/RoomTabs";
import RoomCard from "./parts/RoomCard";
import { ROOMS, Room, ROOM_TABS, DESTINATIONS } from "./rooms.data";

export default function RoomsScreen() {
  const [activeTab, setActiveTab] = useState<string>("All");
  const [destination, setDestination] = useState<string>(DESTINATIONS[0]);

  const filtered: Room[] = useMemo(() => {
    const byDest = ROOMS.filter(r => r.destination === destination);
    if (activeTab === "All") return byDest;
    return byDest.filter(r => r.category === activeTab);
  }, [activeTab, destination]);

  return (
    <main className="min-h-screen bg-[#FFFCF1] text-[#3b2a16]">
      {/* Header */}
      <section className="mx-auto w-full max-w-6xl px-5 pt-12">
        <h1 className="text-center text-[28px] md:text-[32px] font-semibold">
          Room &amp; Suites at ANANYA
        </h1>
        <p className="mt-3 text-center text-[13px] md:text-[14px] text-[#6c5845]">
          Experience unparalleled comfort and breathtaking ocean views in our
          premium accommodations.
        </p>
      </section>

      {/* Toolbar */}
      <section className="mx-auto w-full max-w-6xl px-5 mt-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <RoomTabs
            tabs={ROOM_TABS}
            active={activeTab}
            onChange={setActiveTab}
          />
          <DestinationPicker
            value={destination}
            options={DESTINATIONS}
            onChange={setDestination}
          />
        </div>
      </section>

      {/* List */}
      <section className="mx-auto w-full max-w-6xl px-5 mt-8 pb-20">
        <div className="flex flex-col gap-8">
          {filtered.map(room => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      </section>
    </main>
  );
}
