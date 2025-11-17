"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Montserrat, Poltawski_Nowy } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poltawskiNowy = Poltawski_Nowy({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

type BookingStatus = "IN_PROGRESS" | "COMPLETED" | "CANCELLED";

type Booking = {
  id: string;
  title: string;
  tag: string; // label shown on the right: Upcoming / Payment Pending / Completed / Cancelled
  amount: number;
  currency: string;
  guests: number;
  rooms: number;
  startDate: string;
  endDate: string;
  location: string;
  imageSrc: string;
  status: BookingStatus;
};

const BOOKINGS: Booking[] = [
  // ----- IN PROGRESS -----
  {
    id: "1907534578",
    title: "Gallery Suite",
    tag: "Upcoming",
    amount: 2900,
    currency: "THB",
    guests: 3,
    rooms: 1,
    startDate: "4, Sep, 2025",
    endDate: "19, Sep, 2025",
    location: "Bangkok",
    imageSrc: "/images/rooms/gallery-suite.jpg",
    status: "IN_PROGRESS",
  },
  {
    id: "1907534278",
    title: "Urban Nest",
    tag: "Payment Pending",
    amount: 2100,
    currency: "THB",
    guests: 3,
    rooms: 1,
    startDate: "16, Sep, 2025",
    endDate: "19, Sep, 2025",
    location: "Hua Hin",
    imageSrc: "/images/rooms/urban-nest.jpg",
    status: "IN_PROGRESS",
  },

  // ----- COMPLETED (4 cards) -----
  {
    id: "1907534578-C1",
    title: "Urban Nest",
    tag: "Completed",
    amount: 2900,
    currency: "THB",
    guests: 3,
    rooms: 1,
    startDate: "4, Sep, 2025",
    endDate: "19, Sep, 2025",
    location: "Bangkok",
    imageSrc: "/images/rooms/urban-nest.jpg",
    status: "COMPLETED",
  },
  {
    id: "1907534278-C1",
    title: "Urban Nest",
    tag: "Completed",
    amount: 2100,
    currency: "THB",
    guests: 3,
    rooms: 1,
    startDate: "16, Sep, 2025",
    endDate: "19, Sep, 2025",
    location: "Hua Hin",
    imageSrc: "/images/rooms/urban-nest.jpg",
    status: "COMPLETED",
  },
  {
    id: "1907534578-C2",
    title: "Gallery Suite",
    tag: "Completed",
    amount: 2900,
    currency: "THB",
    guests: 3,
    rooms: 1,
    startDate: "4, Sep, 2025",
    endDate: "19, Sep, 2025",
    location: "Bangkok",
    imageSrc: "/images/rooms/gallery-suite.jpg",
    status: "COMPLETED",
  },
  {
    id: "1907534278-C2",
    title: "Superior Comfort",
    tag: "Completed",
    amount: 2100,
    currency: "THB",
    guests: 3,
    rooms: 1,
    startDate: "16, Sep, 2025",
    endDate: "19, Sep, 2025",
    location: "Hua Hin",
    imageSrc: "/images/rooms/superior-comfort.jpg", // make sure file exists
    status: "COMPLETED",
  },

  // ----- CANCELLED (2 cards) -----
  {
    id: "1907534578-X1",
    title: "Urban Nest",
    tag: "Cancelled",
    amount: 2900,
    currency: "THB",
    guests: 3,
    rooms: 1,
    startDate: "4, Sep, 2025",
    endDate: "19, Sep, 2025",
    location: "Bangkok",
    imageSrc: "/images/rooms/urban-nest.jpg",
    status: "CANCELLED",
  },
  {
    id: "1907534278-X1",
    title: "Gallery Suite",
    tag: "Cancelled",
    amount: 2100,
    currency: "THB",
    guests: 3,
    rooms: 1,
    startDate: "16, Sep, 2025",
    endDate: "19, Sep, 2025",
    location: "Hua Hin",
    imageSrc: "/images/rooms/gallery-suite.jpg",
    status: "CANCELLED",
  },
];

const STATUS_TABS: { id: BookingStatus; label: string }[] = [
  { id: "IN_PROGRESS", label: "In Progress" },
  { id: "COMPLETED", label: "Completed" },
  { id: "CANCELLED", label: "Cancelled" },
];

function BookingCard({ booking }: { booking: Booking }) {
  const isPaymentPending = booking.tag.toLowerCase().includes("pending");
  const isCompleted = booking.status === "COMPLETED";
  const isCancelled = booking.status === "CANCELLED";

  // tag color
  const tagTextColorClass = isPaymentPending
    ? "text-[#D65445]"
    : isCompleted
    ? "text-[#35C95C]"
    : isCancelled
    ? "text-[#D65445]"
    : "text-white";

  return (
    <article
      className={`
        flex flex-col
        rounded-[26px]
        border px-8 py-6
        bg-gradient-to-b from-white/14 via-white/10 to-white/6
        shadow-[0_20px_60px_rgba(0,0,0,0.7)]
        w-[557px]
        min-h-[403px]
      `}
    >
      {/* header row */}
      <div className="flex items-center justify-between text-sm text-white">
        <p className="tracking-[0.05em]">
          <span className="font-medium">ID:</span> {booking.id}
        </p>
        <p className={`text-base font-semibold ${tagTextColorClass}`}>
          {booking.tag}
        </p>
      </div>

      <div className="mt-4 h-px w-full bg-white/15" />

      {/* content */}
      <div className="mt-5 flex flex-1 gap-5">
        {/* room image */}
        <div className="relative h-[156px] w-[156px] overflow-hidden rounded-[18px]">
          <Image
            src={booking.imageSrc}
            alt={booking.title}
            fill
            className="object-cover"
          />
        </div>

        {/* text */}
        <div className="flex flex-col justify-between">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1 text-sm text-white/80">
              <p className="font-semibold text-white">{booking.title}</p>
              <p className="text-[13px] text-white/75">
                {booking.guests} guests&nbsp;&nbsp;&nbsp;{booking.rooms} room
              </p>
              <p className="text-[13px] text-white/75">
                {booking.startDate} - {booking.endDate}
              </p>
              <p className="text-[13px] text-white/75">
                Location: {booking.location}
              </p>
            </div>

            <div className="text-right text-sm text-white/80">
              <p>Total Amount</p>
              <p className="mt-1 text-[22px] font-semibold text-white">
                {booking.currency} {booking.amount.toLocaleString("en-US")}
              </p>
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-white/15" />

          {/* buttons */}
          <div className="mt-4 flex justify-end gap-4">
            <button
              className="
                rounded-full border border-white/60
                bg-gradient-to-r from-white/10 to-white/0
                px-6 py-2 text-sm font-medium text-white
                shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                transition hover:bg-white/15
              "
            >
              Manage Booking
            </button>

            <button
              className="
                rounded-full border border-white/60
                bg-gradient-to-r from-white/10 to-white/0
                px-6 py-2 text-sm font-medium text-white
                shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                transition hover:bg-white/15
              "
            >
              E-Receipt
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function MyBookingsPage() {
  const [activeStatus, setActiveStatus] = useState<BookingStatus>("IN_PROGRESS");

  const filteredBookings = useMemo(
    () => BOOKINGS.filter((b) => b.status === activeStatus),
    [activeStatus]
  );

  return (
    <main
      className={`
        relative min-h-screen w-full
      `}
    >
      <div className="mx-auto flex w-full max-w-[1300px] flex-col">
        <header className="mb-10 text-center">
          <h1
            className={`${poltawskiNowy.className} text-4xl font-semibold tracking-wide md:text-5xl`}
          >
            My Bookings
          </h1>
        </header>

        <section
          className="
            relative w-full
            rounded-[40px]
            border border-white/18
            bg-gradient-to-br from-white/18 via-white/10 to-white/6
            px-10 py-8
            shadow-[0_32px_120px_rgba(0,0,0,0.7)]
            backdrop-blur-sm
          "
        >
          <div className="relative">
            {/* Tabs + Contact */}
            <div className="mb-8 flex items-center justify-between gap-6">
              <div className="rounded-full border border-white/35 bg-white/5 px-1 py-1">
                <div className="flex items-center gap-1">
                  {STATUS_TABS.map((tab) => {
                    const isActive = tab.id === activeStatus;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveStatus(tab.id)}
                        className={`
                          rounded-full px-6 py-2 text-sm font-medium tracking-wide
                          transition
                          ${
                            isActive
                              ? "bg-gradient-to-r from-white to-white/90 text-[#242426] shadow-[0_4px_10px_rgba(0,0,0,0.35)]"
                              : "text-white/70 hover:bg-white/10"
                          }
                        `}
                      >
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                className="
                  rounded-full border border-white/60
                  bg-transparent px-6 py-2
                  text-sm font-medium text-white
                  shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                  transition hover:bg-white/10
                "
              >
                Contact Support
              </button>
            </div>

            {/* bookings grid */}
            <div className="grid gap-6 md:grid-cols-2">
              {filteredBookings.map((booking) => (
                <BookingCard key={booking.id} booking={booking} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
