"use client";

import Roomsbar from "../../components/Roomsbar";
import BookingRoomCard from "../../components/BookingRoomCard";

export default function RoomsPage() {
  return (
    <main className="w-full">
      <div className="pt-8 px-8">
        <Roomsbar />
        <BookingRoomCard />
      </div>
    </main>
  );
}
