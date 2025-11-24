"use client";

import Image from "next/image";
import { useMemo, useState, useEffect } from "react";
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
  tag: string;
  amount: number;
  currency: string;
  guests: number;
  rooms: number;
  startDate: string;
  endDate: string;
  location: string;
  imageSrc: string;
  status: BookingStatus;
  bookingItems?: Array<{
    roomName: string;
    bedType: string | null;
    nights: number;
    subtotal: number;
  }>;
};

const STATUS_TABS: { id: BookingStatus; label: string }[] = [
  { id: "IN_PROGRESS", label: "Progress" },
  { id: "COMPLETED", label: "Completed" },
  { id: "CANCELLED", label: "Cancelled" },
];

function BookingCard({ booking }: { booking: Booking }) {
  const isPaymentPending = booking.tag.toLowerCase().includes("pending");
  const isCompleted = booking.status === "COMPLETED";
  const isCancelled = booking.status === "CANCELLED";

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
        border px-4 py-5
        bg-gradient-to-b from-white/14 via-white/10 to-white/6
        shadow-[0_20px_60px_rgba(0,0,0,0.7)]
        w-full md:w-[580px]
        md:min-h-[403px]
      `}
    >
      {/* header row */}
      <div className="flex flex-col gap-1 md:flex-row md:items-center md:justify-between text-white">
        <p className={`${poltawskiNowy.className} text-[14px] md:text-[24px] font-medium`}>
          <span>ID:</span> {booking.id}
        </p>
        <p
          className={`text-[12px] md:text-[24px] font-medium ${tagTextColorClass}`}
        >
          {booking.tag}
        </p>
      </div>

      <div className="mt-4 h-px w-full bg-white/50" />

      {/* content */}
      <div className="mt-4 flex flex-col gap-4 md:mt-5 md:flex-row md:flex-1 md:gap-5">
        {/* room image */}
        <div className="relative h-[190px] w-full overflow-hidden rounded-[18px] md:h-[156px] md:w-[156px]">
          <Image
            src={booking.imageSrc}
            alt={booking.title}
            fill
            className="object-cover"
          />
        </div>

        {/* text */}
        <div className="flex flex-col justify-between flex-1">
          <div className="flex flex-row items-start justify-between">
            <div className="space-y-2 text-white md:text-[18px] text-[12px]">
              <p className={`pb-2 md:pb-10 ${poltawskiNowy.className} font-bold text-[14px] md:text-[18px]`}>
                {booking.title}
                {booking.rooms > 1 && ` + ${booking.rooms - 1} more`}
              </p>
              <p>
                {booking.guests} guests&nbsp;&nbsp;&nbsp;{booking.rooms} {booking.rooms === 1 ? 'room' : 'rooms'}
              </p>
              <p>
                {booking.startDate} - {booking.endDate}
              </p>
              <p>Location: {booking.location}</p>
            </div>

            <div className="mt-0 text-left text-white">
              <p className="text-[12px] md:text-[18px] font-medium">
                Total Amount
              </p>
              <p className="mt-1 text-[12px] md:text-[22px] font-medium text-white">
                {booking.currency} {booking.amount.toLocaleString("en-US")}
              </p>
            </div>
          </div>

          <div className="mt-4 h-px w-full bg-white/50" />

          {/* buttons */}
          <div className="mt-4 flex flex-row gap-3 justify-end md:gap-4">
            <button
              className="
                w-[120px] md:w-auto md:px-3
                rounded-full border border-white/60
                bg-gradient-to-r from-white/10 to-white/0
                px-1 py-2 text-[12px] md:text-[18px] font-medium text-white
                shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                transition hover:bg-white/15
              "
            >
              Manage Booking
            </button>

            <button
              className="
                w-[80px] md:w-auto md:px-3
                rounded-full border border-white/60
                bg-gradient-to-r from-white/10 to-white/0
                px-2 py-2 text-[12px] md:text-[18px] font-medium text-white
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
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBookings() {
      try {
        const response = await fetch("/api/bookings/my-bookings");
        const data = await response.json();
        
        if (data.bookings) {
          setBookings(data.bookings);
        }
      } catch (error) {
        console.error("Failed to fetch bookings:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, []);

  const filteredBookings = useMemo(
    () => bookings.filter((b) => b.status === activeStatus),
    [bookings, activeStatus]
  );

  return (
    <main className="relative min-h-screen w-full">
      <div className="relative mx-auto flex w-full max-w-[1400px] flex-col">
        {/* MOBILE */}
        <button
          type="button"
          className="
            absolute right-0 -top-1 z-10
            md:hidden
            rounded-full border border-white/60
            bg-transparent px-3 py-2
            text-[9px] font-medium text-[#FCF9F6]
            shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
            transition hover:bg-white/10
          "
        >
          Contact Support
        </button>

        {/* DESKTOP heading */}
        <header className="mb-6 hidden md:mb-10 md:block text-center">
          <h1
            className={`${poltawskiNowy.className} text-3xl font-bold md:text-[48px]`}
          >
            My Bookings
          </h1>
        </header>

        <section
          className="
            relative w-full
            mt-14 md:mt-0
            rounded-[40px]
            border border-white/18
            bg-gradient-to-br from-white/18 via-white/10 to-white/6
            px-4 py-6 md:px-5 md:py-8
            shadow-[0_32px_120px_rgba(0,0,0,0.7)]
            backdrop-blur-sm
          "
        >
          <div className="relative">
            {/* Tabs + (desktop) Contact */}
            <div className="mb-6 flex flex-col gap-4 md:mb-8 md:flex-row md:items-center md:justify-between md:gap-6">
              {/* tabs */}
              <div
                className="
                  inline-flex w-full md:w-auto items-center gap-2
                  rounded-full border border-neutral-400/25
                  bg-neutral-400/20
                  px-2 py-2
                  shadow-[0_18px_45px_rgba(0,0,0,0.55)]
                  backdrop-blur-sm
                "
              >
                {STATUS_TABS.map((tab) => {
                  const isActive = tab.id === activeStatus;

                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveStatus(tab.id)}
                      className="relative flex-1 md:flex-none"
                    >
                      <span
                        className={`
                          block text-center rounded-full px-4 py-2  md:px-7 text-[12px] md:text-[18px] font-medium tracking-wide
                          ${
                            isActive
                              ? `
                               bg-neutral-400/20 border
                                text-white
                                backdrop-blur-lg 
                              `
                              : `
                                text-white/75
                                hover:text-white hover:bg-white/5
                              `
                          }
                        `}
                      >
                        {tab.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* DESKTOP */}
              <button
                type="button"
                className="
                  hidden md:block
                  rounded-full border border-white/60
                  bg-transparent px-6 py-2
                  text-sm md:text-[18px] font-medium text-white
                  shadow-[0_0_0_1px_rgba(255,255,255,0.08)]
                  transition hover:bg-white/10
                "
              >
                Contact Support
              </button>
            </div>

            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-white text-xl">Loading bookings...</div>
              </div>
            ) : filteredBookings.length === 0 ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center text-white">
                  <p className="text-xl mb-2">No bookings found</p>
                  <p className="text-white/70">
                    {activeStatus === "IN_PROGRESS" && "You don't have any active bookings yet."}
                    {activeStatus === "COMPLETED" && "You haven't completed any bookings yet."}
                    {activeStatus === "CANCELLED" && "You don't have any cancelled bookings."}
                  </p>
                </div>
              </div>
            ) : (
              <div className="grid gap-5 md:gap-6 md:grid-cols-2">
                {filteredBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
