"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

export default function Booking() {
  const font = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
  };

  const router = useRouter();

  // --- New interactive logic for location search ---
  const suggestions = [
    "Hua Hin",
    "Pathum Thani",
    "Central Bangkok",
    "Chang Am",
  ];
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationValue, setLocationValue] = useState("Hua Hin");
  const [highlightIdx, setHighlightIdx] = useState<number | null>(null);

  // Two refs: one for the small-layout wrapper and one for the large-layout wrapper.
  const locationRefSmall = useRef<HTMLDivElement | null>(null);
  const locationRefLarge = useRef<HTMLDivElement | null>(null);

  // Guests refs for contextual dropdown placement
  const guestsRefSmall = useRef<HTMLDivElement | null>(null);
  const guestsRefLarge = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      // location suggestions outside click
      const locSmallContains = locationRefSmall.current?.contains(target);
      const locLargeContains = locationRefLarge.current?.contains(target);
      if (!locSmallContains && !locLargeContains) {
        setIsLocationOpen(false);
        setHighlightIdx(null);
      }

      // guests dropdown outside click
      const guestsSmallContains = guestsRefSmall.current?.contains(target);
      const guestsLargeContains = guestsRefLarge.current?.contains(target);
      if (!guestsSmallContains && !guestsLargeContains) {
        setGuestsModalOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function onSuggestionSelect(value: string) {
    setLocationValue(value);
    setIsLocationOpen(false);
    setHighlightIdx(null);
  }
  // --- end new logic ---

  // --- Date modal / combined check-in & check-out logic ---
  const [dateStart, setDateStart] = useState<string>("17,Sep,2025");
  const [dateEnd, setDateEnd] = useState<string>("21,Sep,2025");

  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [selStart, setSelStart] = useState<number | null>(17);
  const [selEnd, setSelEnd] = useState<number | null>(21);

  const months = [
    { name: "September 2025", days: 30 },
    { name: "October 2025", days: 31 },
  ];

  function openDateModal() {
    setIsDateModalOpen(true);
  }

  function cancelDateModal() {
    const s = parseInt(dateStart.split(",")[0], 10);
    const e = parseInt(dateEnd.split(",")[0], 10);
    setSelStart(Number.isFinite(s) ? s : null);
    setSelEnd(Number.isFinite(e) ? e : null);
    setIsDateModalOpen(false);
  }

  function applyDateModal() {
    if (selStart) setDateStart(`${String(selStart).padStart(2, "0")},Sep,2025`);
    if (selEnd) setDateEnd(`${String(selEnd).padStart(2, "0")},Oct,2025`);
    setIsDateModalOpen(false);
  }

  function onDayClick(monthIndex: number, day: number) {
    const absolute = monthIndex * 100 + day;
    if (selStart === null) {
      setSelStart(absolute);
      setSelEnd(null);
      return;
    }
    if (selStart !== null && selEnd === null) {
      const startAbs = selStart;
      if (absolute >= startAbs) {
        setSelEnd(absolute);
        return;
      } else {
        setSelStart(absolute);
        return;
      }
    }
    setSelStart(absolute);
    setSelEnd(null);
  }

  function isDaySelected(monthIndex: number, day: number) {
    const absolute = monthIndex * 100 + day;
    const startAbs = selStart ?? -1;
    const endAbs = selEnd ?? startAbs;
    return (
      absolute === startAbs ||
      absolute === endAbs ||
      (startAbs !== -1 &&
        endAbs !== -1 &&
        absolute > startAbs &&
        absolute < endAbs)
    );
  }
  // --- end date modal logic ---

  // --- Guests dropdown logic (contextual, absolute under the triggering button) ---
  const [guestsModalOpen, setGuestsModalOpen] = useState(false);
  // persistent counts shown on the button
  const [rooms, setRooms] = useState<number>(1);
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(1);

  // temp counts used while dropdown is open (so Cancel discards)
  const [tmpRooms, setTmpRooms] = useState<number>(rooms);
  const [tmpAdults, setTmpAdults] = useState<number>(adults);
  const [tmpChildren, setTmpChildren] = useState<number>(children);

  function openGuestsModal() {
    setTmpRooms(rooms);
    setTmpAdults(adults);
    setTmpChildren(children);
    setGuestsModalOpen(true);
  }

  function cancelGuestsModal() {
    setGuestsModalOpen(false);
  }

  function applyGuestsModal() {
    setRooms(Math.max(1, tmpRooms));
    setAdults(Math.max(1, tmpAdults));
    setChildren(Math.max(0, tmpChildren));
    setGuestsModalOpen(false);
  }
  // --- end guests dropdown logic ---

  return (
    <div className="min-h-screen flex items-center flex-col justify-center bg-transparent">
      <div className="hidden md:block mx-auto w-[1440px] max-w-full 2xl:w-full py-12">
        <div className="flex flex-col items-center text-white">
          {/* Title */}
          <h1
            style={font}
            className="text-4xl md:text-5xl font-extrabold tracking-tight"
          >
            Book A Room
          </h1>

          {/* Inputs row (desktop layout) */}
          <div className="mt-8 w-full flex items-center justify-center">
            {/* --- <= 1440px layout (visible below or equal 1440) --- */}
            <div className="flex gap-8 md:gap-12 items-center w-full max-w-[1249px] px-4 md:px-8 justify-center min-[1580px]:hidden">
              {/* Location */}
              <label className="flex-1 pt-6 min-[1600px]:pb-0">
                {/* small-layout wrapper: relative so dropdown is absolute and won't push layout */}
                <div ref={locationRefSmall} className="relative">
                  <div
                    className="flex items-center rounded-lg border border-white/70 bg-white/5 backdrop-blur-sm px-4 py-3 min-[1600px]:px-8 min-[1600px]:py-5 min-[1600px]:min-w-[480px] cursor-pointer hover:bg-white/10"
                    role="button"
                    onClick={() => setIsLocationOpen(true)}
                    onKeyDown={(e) => {
                      if (e.key === "ArrowDown") {
                        setIsLocationOpen(true);
                        setHighlightIdx(0);
                      }
                    }}
                  >
                    <div className="flex-shrink-0 mr-4">
                      <Image
                        src="/images/search.png"
                        alt="Search"
                        width={20}
                        height={20}
                      />
                    </div>
                    <input
                      aria-label="Location"
                      placeholder="Hua Hin"
                      value={locationValue}
                      onChange={(e) => {
                        setLocationValue(e.target.value);
                        setIsLocationOpen(true);
                      }}
                      onFocus={() => setIsLocationOpen(true)}
                      className="flex-1 bg-transparent text-white placeholder-white/90 focus:outline-none text-base cursor-pointer"
                      style={font}
                      type="text"
                    />
                  </div>

                  {/* Dropdown / suggestions (absolute positioned so it won't push other elements) */}
                  {isLocationOpen && (
                    <div
                      className="absolute left-0 top-full mt-2 w-full rounded-lg border border-white/30 bg-white/5 backdrop-blur-md shadow-xl z-50 overflow-hidden"
                      role="listbox"
                      aria-label="Location suggestions"
                    >
                      {suggestions.map((s, i) => {
                        const isHighlighted = highlightIdx === i;
                        return (
                          <div
                            key={s}
                            onMouseEnter={() => setHighlightIdx(i)}
                            onMouseDown={(ev) => {
                              ev.preventDefault();
                              onSuggestionSelect(s);
                            }}
                            className={
                              "px-4 py-3 text-white text-sm underline decoration-white/50 cursor-pointer " +
                              (isHighlighted ? "bg-gray-700" : "bg-transparent")
                            }
                            role="option"
                            aria-selected={isHighlighted}
                          >
                            {s}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </label>

              {/* Combined Check-in and Check-out */}
              <div
                className="flex flex-col items-center   "
                style={{ minWidth: 300 }}
              >
                <div className="text-[12px] text-white/70 mb-2" style={font}>
                  Check-in and Check-out
                </div>

                <div
                  className="w-full rounded-lg border border-white/70 bg-white/5 backdrop-blur-sm flex items-center overflow-hidden  min-[1600px]:px-8 min-[1600px]:min-w-[560px] cursor-pointer hover:bg-white/10"
                  role="button"
                  onClick={openDateModal}
                >
                  <button
                    aria-label="Check-in"
                    className="flex-1 px-4 py-4 text-left text-white bg-transparent focus:outline-none min-[1600px]:px-8"
                    style={font}
                  >
                    {dateStart}
                  </button>

                  <div className="w-px h-10 bg-white/30" />

                  <button
                    aria-label="Check-out"
                    className="flex-1 px-4 py-4 text-left text-white bg-transparent focus:outline-none min-[1600px]:px-8"
                    style={font}
                  >
                    {dateEnd}
                  </button>
                </div>
              </div>

              {/* Guests (small layout) */}
              <div
                style={{ minWidth: 300 }}
                className="flex flex-col items-center"
              >
                <div className="text-[12px] text-white/70 mb-2" style={font}>
                  Guests
                </div>

                {/* relative parent so dropdown panel is absolute and doesn't affect layout */}
                <div ref={guestsRefSmall} className="relative w-full">
                  <button
                    onClick={openGuestsModal}
                    className="w-full rounded-lg border border-white/70 bg-white/5 backdrop-blur-sm px-4 py-4 text-white text-left min-[1600px]:px-8 min-[1600px]:py-4 min-[1600px]:min-w-[360px] cursor-pointer hover:bg-white/10 flex items-center justify-between"
                    style={font}
                  >
                    <div>
                      {adults} Adults & {children} Kid
                      <div className="text-white/70 text-xs mt-1">
                        {rooms} Room{rooms > 1 ? "s" : ""}
                      </div>
                    </div>
                    <div className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        className="text-white/90"
                      >
                        <path fill="currentColor" d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </button>

                  {/* absolute dropdown panel positioned under the button (keeps layout untouched) */}
                  {guestsModalOpen && (
                    <div className="absolute left-0 top-full mt-2 w-[320px] rounded-lg border border-white/30 bg-white/5 backdrop-blur-lg shadow-xl p-4 z-50">
                      <div className="text-white mb-3" style={font}>
                        Rooms & Guests
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white" style={font}>
                              Rooms
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setTmpRooms(Math.max(1, tmpRooms - 1))
                              }
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                              aria-label="Decrease rooms"
                            >
                              −
                            </button>
                            <div className="text-white">{tmpRooms}</div>
                            <button
                              onClick={() => setTmpRooms(tmpRooms + 1)}
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                              aria-label="Increase rooms"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white" style={font}>
                              Adults
                            </div>
                            <div className="text-white/60 text-sm">
                              ages 13 or above
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setTmpAdults(Math.max(1, tmpAdults - 1))
                              }
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              −
                            </button>
                            <div className="text-white">{tmpAdults}</div>
                            <button
                              onClick={() => setTmpAdults(tmpAdults + 1)}
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white" style={font}>
                              Children
                            </div>
                            <div className="text-white/60 text-sm">
                              ages 0-12
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setTmpChildren(Math.max(0, tmpChildren - 1))
                              }
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              −
                            </button>
                            <div className="text-white">{tmpChildren}</div>
                            <button
                              onClick={() => setTmpChildren(tmpChildren + 1)}
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-3">
                          <button
                            onClick={cancelGuestsModal}
                            className="px-4 py-2 rounded-md border border-white/30 text-white bg-transparent"
                            style={font}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={applyGuestsModal}
                            className="px-5 py-2 rounded-md bg-white/10 border border-white/30 text-white"
                            style={font}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Book */}
              <div
                className="flex-shrink-0 pt-18 min-[1600px]:pt-10"
                style={{ minWidth: 180 }}
              >
                <button
                  type="button"
                  onClick={() => router.push("/booking/rooms")}
                  className="w-full rounded-lg px-6 py-3 border border-white/70 bg-white/5 backdrop-blur-sm text-white hover:opacity-95 min-[1600px]:px-10 min-[1600px]:py-4 min-[1600px]:min-w-[220px] cursor-pointer hover:bg-white/10"
                  style={font}
                >
                  Book Now
                </button>

                {/* icon + text below button */}
                <div className="mt-2 flex items-center justify-center gap-2">
                  <Image
                    src="/images/c.png"
                    alt="best price icon"
                    width={18}
                    height={18}
                  />
                  <span className="text-red-600 underline" style={font}>
                    best price guaranteed
                  </span>
                </div>
              </div>
            </div>

            {/* --- >= larger layout (visible at larger screens) --- */}
            <div className="hidden min-[1580px]:flex md:gap-18 2xl:gap-30 items-center w-full max-w-full px-4 md:px-32 justify-center">
              {/* Location */}
              <label className="flex-1">
                <div ref={locationRefLarge} className="relative">
                  <div
                    className="flex items-center rounded-2xl border border-white/90 bg-white/5 backdrop-blur-sm px-4 py-3 min-[1600px]:px-7 min-[1600px]:py-6 min-[1600px]:min-w-[320px] cursor-pointer hover:bg-white/10"
                    role="button"
                  >
                    <div className="flex-shrink-0 mr-5">
                      <Image
                        src="/images/search.png"
                        alt="Search"
                        width={30}
                        height={30}
                      />
                    </div>
                    <input
                      aria-label="Location"
                      placeholder="Hua Hin"
                      className="flex-1 bg-transparent text-2xl text-white placeholder-white/90 focus:outline-none cursor-pointer"
                      style={font}
                      type="text"
                      value={locationValue}
                      onChange={(e) => {
                        setLocationValue(e.target.value);
                        setIsLocationOpen(true);
                      }}
                      onFocus={() => setIsLocationOpen(true)}
                    />
                  </div>

                  {/* absolutely positioned dropdown so it doesn't push adjacent elements */}
                  {isLocationOpen && (
                    <div className="absolute left-0 top-full mt-2 w-full rounded-lg border border-white/30 bg-white/5 backdrop-blur-md shadow-xl z-50 overflow-hidden">
                      {suggestions.map((s, i) => {
                        const isHighlighted = highlightIdx === i;
                        return (
                          <div
                            key={s}
                            onMouseEnter={() => setHighlightIdx(i)}
                            onMouseDown={(ev) => {
                              ev.preventDefault();
                              onSuggestionSelect(s);
                            }}
                            className={
                              "px-6 py-5 text-2xl text-white underline decoration-white/50 cursor-pointer " +
                              (isHighlighted ? "bg-gray-700" : "bg-transparent")
                            }
                          >
                            {s}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </label>

              {/* Combined Check-in and Check-out */}
              <div
                className="flex flex-col items-center pb-9"
                style={{ minWidth: 400 }}
              >
                <div className="text-[26px] text-white/70 mb-2" style={font}>
                  Check-in Date &nbsp; &nbsp; &nbsp; Check-out Date
                </div>

                <div
                  className="w-full rounded-2xl border border-white/90 bg-white/5 backdrop-blur-sm flex items-center overflow-hidden min-[1600px]:px-2 min-[1600px]:min-w-[560px] cursor-pointer hover:bg-white/10"
                  role="button"
                  onClick={openDateModal}
                >
                  <button
                    aria-label="Check-in"
                    className="flex-1 px-8 py-7 text-left text-2xl text-white bg-transparent focus:outline-none min-[1600px]:px-8"
                    style={font}
                  >
                    {dateStart}
                  </button>

                  <div className="w-px h-10 bg-white/70" />

                  <button
                    aria-label="Check-out"
                    className=" flex-1 px-4 py-4 text-right text-2xl text-white bg-transparent focus:outline-none min-[1600px]:px-8"
                    style={font}
                  >
                    {dateEnd}
                  </button>
                </div>
              </div>

              {/* Guests (large layout) */}
              <div
                style={{ minWidth: 300 }}
                className="flex flex-col items-center pb-6"
              >
                <div className="text-2xl text-white/70 mb-2 " style={font}>
                  Guests
                </div>

                <div ref={guestsRefLarge} className="relative w-full">
                  <button
                    onClick={openGuestsModal}
                    className="w-full text-2xl rounded-2xl border border-white bg-white/5 backdrop-blur-sm px-4 py-5 text-white/90 text-left min-[1600px]:px-8 min-[1600px]:py-4 min-w-[360px] cursor-pointer hover:bg-white/10 flex items-center justify-between"
                    style={font}
                  >
                    <div>
                      {adults} Adults & {children} Kid
                      <div className="text-white/70 text-sm mt-1">
                        {rooms} Room{rooms > 1 ? "s" : ""}
                      </div>
                    </div>
                    <div>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        className="text-white/90"
                      >
                        <path fill="currentColor" d="M9 18l6-6-6-6" />
                      </svg>
                    </div>
                  </button>

                  {/* absolute dropdown panel positioned under the button (keeps layout untouched) */}
                  {guestsModalOpen && (
                    <div className="absolute left-0 top-full mt-2 w-[360px] rounded-lg border border-white/30 bg-white/5 backdrop-blur-lg shadow-xl p-5 z-50">
                      <div className="text-lg text-white mb-3" style={font}>
                        Rooms & Guests
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white" style={font}>
                              Rooms
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setTmpRooms(Math.max(1, tmpRooms - 1))
                              }
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              −
                            </button>
                            <div className="text-white">{tmpRooms}</div>
                            <button
                              onClick={() => setTmpRooms(tmpRooms + 1)}
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white" style={font}>
                              Adults
                            </div>
                            <div className="text-white/60 text-sm">
                              ages 13 or above
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setTmpAdults(Math.max(1, tmpAdults - 1))
                              }
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              −
                            </button>
                            <div className="text-white">{tmpAdults}</div>
                            <button
                              onClick={() => setTmpAdults(tmpAdults + 1)}
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-white" style={font}>
                              Children
                            </div>
                            <div className="text-white/60 text-sm">
                              ages 0-12
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <button
                              onClick={() =>
                                setTmpChildren(Math.max(0, tmpChildren - 1))
                              }
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              −
                            </button>
                            <div className="text-white">{tmpChildren}</div>
                            <button
                              onClick={() => setTmpChildren(tmpChildren + 1)}
                              className="w-8 h-8 rounded-md border border-white/30 text-white"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="flex justify-end gap-3 mt-3">
                          <button
                            onClick={cancelGuestsModal}
                            className="px-4 py-2 rounded-md border border-white/30 text-white bg-transparent"
                            style={font}
                          >
                            Cancel
                          </button>
                          <button
                            onClick={applyGuestsModal}
                            className="px-5 py-2 rounded-md bg-white/10 border border-white/30 text-white"
                            style={font}
                          >
                            Apply
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Book */}
              <div className="flex-shrink-0" style={{ minWidth: 180 }}>
                <button
                  type="button"
                  onClick={() => router.push("/booking/rooms")}
                  className="w-full rounded-2xl text-2xl px-6 py-3 border border-white/90 bg-white/5 backdrop-blur-sm text-white hover:opacity-95 min-[1600px]:px-10 min-[1600px]:py-7 min-[1600px]:min-w-[220px] cursor-pointer hover:bg-white/10"
                  style={font}
                >
                  Book Now
                </button>

                {/* icon + text below button */}
                <div className="mt-2 flex items-center justify-center gap-2">
                  <Image
                    src="/images/c.png"
                    alt="best price icon"
                    width={20}
                    height={20}
                  />
                  <span className="text-red-600 underline" style={font}>
                    best price guaranteed
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* small helper text & divider */}
          <div className="mt-10 text-white/80" style={font}>
            Flexible with your dates?
          </div>

          <div className="w-full max-w-[1900px] mt-32 px-4 md:px-8">
            <hr className="border-t border-white" />
          </div>
        </div>
      </div>

      {/* DATE PICKER MODAL (fixed) - position fixed so it does not alter underlying layout */}
      {isDateModalOpen && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
        >
          <div
            className="absolute inset-0 bg-black/40"
            onClick={cancelDateModal}
          />
          <div className="relative z-70 w-[820px] max-w-full mx-4 rounded-lg border border-white/30 bg-white/5 backdrop-blur-lg shadow-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="text-xl text-white" style={font}>
                Select Dates
              </div>
              <div className="text-sm text-white/70">
                September 2025 • October 2025
              </div>
            </div>

            <div className="flex gap-6">
              {months.map((m, mi) => (
                <div key={m.name} className="flex-1">
                  <div className="text-white mb-3" style={font}>
                    {m.name}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
                      <div
                        key={d}
                        className="text-xs text-white/60 text-center"
                      >
                        {d}
                      </div>
                    ))}
                    {Array.from({ length: m.days }).map((_, idx) => {
                      const day = idx + 1;
                      const selected = isDaySelected(mi, day);
                      return (
                        <button
                          key={day}
                          onClick={() => onDayClick(mi, day)}
                          className={
                            "h-10 flex items-center justify-center rounded-md text-sm " +
                            (selected
                              ? "bg-gray-700 text-white"
                              : "bg-transparent text-white/90 hover:bg-gray-700")
                          }
                          aria-pressed={selected}
                        >
                          <span className="underline decoration-white/40">
                            {day}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={cancelDateModal}
                className="px-4 py-2 rounded-md border border-white/30 text-white bg-transparent"
                style={font}
              >
                Cancel
              </button>
              <button
                onClick={applyDateModal}
                className="px-5 py-2 rounded-md bg-white/10 border border-white/30 text-white"
                style={font}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Featured Offers */}
      <section className="hidden md:block xl:w-full w-[1440px] mx-auto mt-12 px-4 md:px-8">
        <h2
          style={font}
          className="text-3xl md:text-4xl text-center text-white font-semibold mb-8"
        >
          Featured Offers
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Card 1 */}
          <div className="rounded-2xl border border-white/90 bg-white/5 backdrop-blur-sm hover:bg-white/10 overflow-hidden p-0">
            <div className="w-full 2xl:h-72 h-44 md:h-52 lg:h-56 relative">
              <Image
                src="/images/img1.png"
                alt="Beachfront Serenity"
                fill
                className="object-cover p-4 rounded-2xl"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </div>
            <div className="py-4 text-center">
              <div style={font} className="text-white text-lg md:text-xl">
                Beachfront Serenity
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div className="rounded-2xl border border-white/90 bg-white/5 backdrop-blur-sm hover:bg-white/10 overflow-hidden p-0">
            <div className="w-full 2xl:h-72 h-44 md:h-52 lg:h-56 relative ">
              <Image
                src="/images/img2.png"
                alt="Complimentary Cocktails"
                fill
                className="object-cover p-4 rounded-2xl"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </div>
            <div className="p-4 text-center">
              <div style={font} className="text-white text-lg md:text-xl">
                Complimentary Cocktails
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="rounded-2xl border border-white/90 bg-white/5 backdrop-blur-sm hover:bg-white/10 overflow-hidden p-0">
            <div className="w-full 2xl:h-72 h-44 md:h-52 lg:h-56 relative">
              <Image
                src="/images/img3.png"
                alt="Gourmet Dining Package"
                fill
                className="object-cover p-4 rounded-2xl"
                sizes="(min-width: 1024px) 33vw, 50vw"
              />
            </div>
            <div className="py-4 text-center">
              <div style={font} className="text-white text-lg md:text-xl">
                Gourmet Dining Package
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- MOBILE ONLY LAYOUT (<640px) --- */}

      <div className="sm:hidden w-full max-w-[520px] px-4 mx-auto flex flex-col items-stretch mt-8">
        {/* Row 1: Location + Guests */}
        <div className="grid grid-cols-2 gap-4">
          {/* Location */}
          <div ref={locationRefSmall} className="relative">
            <div
              className="flex items-center rounded-lg border border-white/90 bg-white/5 backdrop-blur-sm px-3 py-[10px] cursor-pointer hover:bg-white/10"
              role="button"
              onClick={() => setIsLocationOpen(true)}
            >
              <Image
                src="/images/search.png"
                alt="Search"
                width={18}
                height={18}
                className="mr-3"
              />
              <input
                aria-label="Location"
                placeholder="Hua Hin"
                value={locationValue}
                onChange={(e) => {
                  setLocationValue(e.target.value);
                  setIsLocationOpen(true);
                }}
                onFocus={() => setIsLocationOpen(true)}
                className="flex-1 bg-transparent text-white placeholder-white/90 focus:outline-none text-sm"
                style={font}
              />
            </div>
            {isLocationOpen && (
              <div className="absolute left-0 top-full mt-2 w-full rounded-lg border border-white/90 bg-white/5 backdrop-blur-md shadow-lg z-50 overflow-hidden">
                {suggestions.map((s, i) => (
                  <div
                    key={s}
                    onMouseEnter={() => setHighlightIdx(i)}
                    onMouseDown={(ev) => {
                      ev.preventDefault();
                      onSuggestionSelect(s);
                    }}
                    className={
                      "px-3 py-2 text-white text-sm underline decoration-white/40 cursor-pointer " +
                      (highlightIdx === i ? "bg-gray-700" : "")
                    }
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Guests */}
          <div ref={guestsRefSmall} className="relative">
            <button
              onClick={openGuestsModal}
              className="w-full rounded-lg border border-white/90 bg-white/5 backdrop-blur-sm px-3 py-[10px] text-white text-left text-sm hover:bg-white/10 flex items-center justify-between"
              style={font}
            >
              <div className="leading-tight">
                {adults} Adults & {children} Kid
                <div className="text-white/70 text-[10px] mt-1">
                  {rooms} Room{rooms > 1 ? "s" : ""}
                </div>
              </div>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                className="text-white/80"
              >
                <path fill="currentColor" d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Centered Guests Modal (mobile) */}
            {guestsModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center">
                <div
                  className="absolute inset-0 bg-black/40"
                  onClick={cancelGuestsModal}
                />
                <div className="relative z-60 w-[92vw] max-w-[520px] rounded-xl border border-white/90 bg-white/5 backdrop-blur-lg shadow-2xl p-6">
                  <div className="text-white mb-4 text-base" style={font}>
                    Rooms & Guests
                  </div>

                  <div className="flex flex-col gap-4">
                    {/* Rooms */}
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm" style={font}>
                        Rooms
                      </span>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => setTmpRooms(Math.max(1, tmpRooms - 1))}
                          className="w-8 h-8 rounded-md border border-white/90 text-white"
                        >
                          −
                        </button>
                        <span className="text-white text-sm">{tmpRooms}</span>
                        <button
                          onClick={() => setTmpRooms(tmpRooms + 1)}
                          className="w-8 h-8 rounded-md border border-white/90 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Adults */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-sm" style={font}>
                          Adults
                        </div>
                        <div className="text-white/60 text-[11px]">
                          ages 13 or above
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setTmpAdults(Math.max(1, tmpAdults - 1))
                          }
                          className="w-8 h-8 rounded-md border border-white/90 text-white"
                        >
                          −
                        </button>
                        <span className="text-white text-sm">{tmpAdults}</span>
                        <button
                          onClick={() => setTmpAdults(tmpAdults + 1)}
                          className="w-8 h-8 rounded-md border border-white/90 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-white text-sm" style={font}>
                          Children
                        </div>
                        <div className="text-white/60 text-[11px]">
                          ages 0-12
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() =>
                            setTmpChildren(Math.max(0, tmpChildren - 1))
                          }
                          className="w-8 h-8 rounded-md border border-white/90 text-white"
                        >
                          −
                        </button>
                        <span className="text-white text-sm">
                          {tmpChildren}
                        </span>
                        <button
                          onClick={() => setTmpChildren(tmpChildren + 1)}
                          className="w-8 h-8 rounded-md border border-white/90 text-white"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-2">
                      <button
                        onClick={cancelGuestsModal}
                        className="px-4 py-2 rounded-md border border-white/90 text-white text-xs"
                        style={font}
                      >
                        Cancel
                      </button>
                      <button
                        onClick={applyGuestsModal}
                        className="px-5 py-2 rounded-md bg-white/10 border border-white/90 text-white text-xs"
                        style={font}
                      >
                        Apply
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Row 2: Combined Dates + Book */}
        <div className="grid grid-cols-3 gap-4 mt-5">
          <div className="col-span-2">
            <div className="text-[11px] text-white/70 mb-1" style={font}>
              Check-in Date&nbsp;&nbsp;&nbsp;Check-out Date
            </div>
            <button
              onClick={openDateModal}
              className="w-full rounded-lg border border-white/90 bg-white/5 backdrop-blur-sm px-3 py-3 text-white text-xs hover:bg-white/10 flex items-center overflow-hidden"
              style={font}
            >
              <span className="flex-1 text-left">{dateStart}</span>
              <span className="w-px h-6 bg-white/30 mx-2" />
              <span className="flex-1 text-left">{dateEnd}</span>
            </button>
          </div>
          <div className="flex flex-col">
            <div className="mb-1">&nbsp;</div>
            <button
              type="button"
              onClick={() => router.push("/booking/rooms")}
              className="w-full rounded-lg border border-white/90 bg-white/5 backdrop-blur-sm px-3 py-3 text-white text-xs hover:bg-white/10"
              style={font}
            >
              Book Now
            </button>
            <div className="flex items-center justify-end gap-1 mt-1">
              <Image
                src="/images/c.png"
                alt="best price icon"
                width={14}
                height={14}
              />
              <span className="text-[10px] text-red-600 underline" style={font}>
                best price guaranteed
              </span>
            </div>
          </div>
        </div>

        <div
          className="mt-5 text-center text-[11px] text-white/80"
          style={font}
        >
          Flexible with your dates?
        </div>
        <hr className="mt-4 border-t border-white/90" />

        {/* Featured Offers (stacked) */}
        <h2 className="text-center mt-8 mb-6 text-2xl text-white" style={font}>
          Featured Offers
        </h2>
        <div className="flex flex-col gap-8">
          <div className="rounded-2xl border border-white/90 bg-white/5 backdrop-blur-sm hover:bg-white/10 p-4">
            <div className="relative w-full h-52 rounded-xl overflow-hidden">
              <Image
                src="/images/img1.png"
                alt="Beachfront Serenity"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center mt-4 text-white text-sm" style={font}>
              Beachfront Serenity
            </div>
          </div>

          <div className="rounded-2xl border border-white/90 bg-white/5 backdrop-blur-sm hover:bg-white/10 p-4">
            <div className="relative w-full h-52 rounded-xl overflow-hidden">
              <Image
                src="/images/img2.png"
                alt="Complimentary Cocktails"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center mt-4 text-white text-sm" style={font}>
              Complimentary Cocktails
            </div>
          </div>

          <div className="rounded-2xl border border-white/90 bg-white/5 backdrop-blur-sm hover:bg-white/10 p-4">
            <div className="relative w-full h-52 rounded-xl overflow-hidden">
              <Image
                src="/images/img3.png"
                alt="Gourmet Dining Package"
                fill
                className="object-cover"
              />
            </div>
            <div className="text-center mt-4 text-white text-sm" style={font}>
              Gourmet Dining Package
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
