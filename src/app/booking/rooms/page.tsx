"use client";

import { Suspense } from "react";
import Roomsbar from "../../components/Roomsbar";
import BookingRoomCard from "../../components/BookingRoomCard";

export default function RoomsPage() {
  return (
    <main className="w-full">
      <div className="pt-8 px-8">
        <Suspense fallback={<div>Loading search bar...</div>}>
          <Roomsbar />
        </Suspense>
        <Suspense fallback={<div>Loading rooms...</div>}>
          <BookingRoomCard />
        </Suspense>
      </div>
    </main>
  );
}
