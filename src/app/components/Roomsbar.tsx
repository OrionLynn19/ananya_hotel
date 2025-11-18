"use client";

import React, { useState } from "react";
import { FiSearch, FiCalendar, FiChevronRight } from "react-icons/fi";

type LocationOption = string;

const LOCATIONS: LocationOption[] = [
  "Hua Hin",
  "Pathum Thani",
  "Central Bangkok",
  "Chang Am",
];

type DateRange = {
  checkIn: Date | null;
  checkOut: Date | null;
};

type Guests = {
  rooms: number;
  adults: number;
  children: number;
};

export default function Roomsbar() {
  /* ---------- LOCATION ---------- */
  const [locationOpen, setLocationOpen] = useState(false);
  const [locationQuery, setLocationQuery] = useState("Hua Hin");
  const [location, setLocation] = useState("Hua Hin");

  const filteredLocations = LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationQuery.toLowerCase())
  );

  /* ---------- DATES ---------- */
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [range, setRange] = useState<DateRange>({
    checkIn: null,
    checkOut: null,
  });

  const [currentMonth, setCurrentMonth] = useState(() => {
    const d = new Date();
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function addMonths(base: Date, offset: number) {
    const d = new Date(base);
    d.setMonth(d.getMonth() + offset);
    return d;
  }

  function startOfMonth(date: Date) {
    const d = new Date(date);
    d.setDate(1);
    d.setHours(0, 0, 0, 0);
    return d;
  }

  function getMonthDays(date: Date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startWeekday = firstDay.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (Date | null)[] = [];
    for (let i = 0; i < startWeekday; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateObj = new Date(year, month, d);
      dateObj.setHours(0, 0, 0, 0);
      cells.push(dateObj);
    }
    return cells;
  }

  function onSelectDate(day: Date) {
    if (day < today) return;

    const { checkIn, checkOut } = range;

    if (!checkIn || (checkIn && checkOut) || day <= checkIn) {
      setRange({ checkIn: day, checkOut: null });
    } else {
      setRange({ checkIn, checkOut: day });
      setCalendarOpen(false);
    }
  }

  function formatShort(date: Date | null) {
    if (!date) return "--, --";
    return date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
    });
  }

  function formatWeekday(date: Date | null) {
    if (!date) return "--";
    return date.toLocaleDateString("en-US", { weekday: "long" });
  }

  function calcNights(range: DateRange) {
    const { checkIn, checkOut } = range;
    if (!checkIn || !checkOut) return 0;
    const diff =
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(0, Math.round(diff));
  }

  const nights = calcNights(range);

  /* ---------- GUESTS & ROOMS ---------- */
  const [guestsOpen, setGuestsOpen] = useState(false);
  const [guests, setGuests] = useState<Guests>({
    rooms: 1,
    adults: 2,
    children: 1,
  });

  function changeGuest(
    key: keyof Guests,
    delta: number,
    min = 0,
    max = 99
  ) {
    setGuests((prev) => {
      const next = { ...prev, [key]: prev[key] + delta };
      if (next[key] < min) next[key] = min;
      if (next[key] > max) next[key] = max;
      return next;
    });
  }

  const guestSummary = `${guests.adults} Adults${
    guests.children ? ` & ${guests.children} Kid` : ""
  }\n${guests.rooms > 1 ? `${guests.rooms} Rooms` : "1 Room"}`;

  /* ---------- JSX ---------- */

  return (
    <div className="w-full flex justify-center px-4 md:px-10 pt-10 pb-6">
      <div
        className="
          relative
          w-full
          max-w-6xl
          grid
          grid-cols-2
          md:grid-cols-[1.2fr_1.8fr_1.6fr_0.7fr_1.0fr]
          items-stretch
          gap-3 md:gap-4
          text-white text-[13px] md:text-[16px]
        "
      >
        {/* LOCATION PILL */}
        <div className="relative w-full h-full">
          <button
            type="button"
            onClick={() => setLocationOpen((o) => !o)}
            className="w-full h-full flex items-center gap-3 rounded-2xl md:rounded-[26px] border border-white/35 
                       bg-gradient-to-br from-white/18 via-white/10 to-white/5
                       px-4 md:px-7 py-3 md:py-4 backdrop-blur-xl hover:bg-white/15 
                       hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] hover:-translate-y-[1px]
                       transition-all duration-200"
          >
            <FiSearch className="text-lg md:text-xl opacity-80" />
            <span className="truncate">{location}</span>
          </button>

          {locationOpen && (
            <div className="absolute left-0 mt-3 w-72 rounded-3xl border border-white/40 bg-gradient-to-br from-black/85 via-black/80 to-black/70 backdrop-blur-2xl shadow-2xl p-5 z-30">
              <div className="flex items-center gap-2 rounded-[20px] border border-white/30 bg-black/40 px-3 py-2 mb-4">
                <FiSearch className="opacity-80" />
                <input
                  value={locationQuery}
                  onChange={(e) => setLocationQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm w-full placeholder:text-white/60"
                  placeholder="Search destination"
                />
              </div>

              <ul className="space-y-1 text-sm">
                {filteredLocations.map((loc) => (
                  <li key={loc}>
                    <button
                      type="button"
                      onClick={() => {
                        setLocation(loc);
                        setLocationQuery(loc);
                        setLocationOpen(false);
                      }}
                      className="flex w-full py-2 px-2 text-left hover:bg-white/10 rounded-[18px]"
                    >
                      {loc}
                    </button>
                    <div className="h-px bg-white/20" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* DATE RANGE PILL */}
        <div className="relative w-full h-full">
          <button
            type="button"
            onClick={() => setCalendarOpen((o) => !o)}
            className="w-full h-full flex items-center gap-3 rounded-2xl md:rounded-[26px] border border-white/35 
                       bg-gradient-to-br from-white/18 via-white/10 to-white/5
                       px-4 md:px-7 py-3 md:py-4 backdrop-blur-xl hover:bg-white/15 
                       hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] hover:-translate-y-[1px]
                       transition-all duration-200"
          >
            <FiCalendar className="text-lg md:text-xl opacity-80" />
            <div className="flex flex-col items-start leading-tight">
              <div className="flex gap-2 md:gap-3">
                <span>
                  {formatShort(range.checkIn)}{" "}
                  <span className="opacity-60">|</span>
                </span>
                <span>{formatShort(range.checkOut)}</span>
              </div>
              <div className="flex gap-4 md:gap-6 text-[11px] opacity-70">
                <span>{formatWeekday(range.checkIn)}</span>
                <span>{formatWeekday(range.checkOut)}</span>
              </div>
            </div>
          </button>

          {calendarOpen && (
            <div
              className="
                absolute
                left-1/2 -translate-x-1/2
                mt-4
                w-[94vw] max-w-sm md:max-w-[880px]
                rounded-3xl md:rounded-[32px]
                border border-white/40
                bg-gradient-to-br from-black/90 via-black/82 to-black/70
                backdrop-blur-3xl
                shadow-[0_26px_70px_rgba(0,0,0,0.75)]
                p-4 md:p-8
                z-40
                max-h-[430px] md:max-h-none
                overflow-y-auto md:overflow-visible
              "
            >
              {/* header */}
              <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-3 mb-5 md:mb-6">
                <div className="flex flex-col gap-1.5">
                  <span className="uppercase tracking-[0.22em] text-[10px] md:text-[11px] text-white/60">
                    Select your stay
                  </span>
                  <span className="text-sm md:text-lg font-medium">
                    {range.checkIn && range.checkOut
                      ? `${formatShort(range.checkIn)} – ${formatShort(
                          range.checkOut
                        )}`
                      : "Choose check-in & check-out"}
                  </span>
                </div>

                <div className="flex items-center gap-2 md:gap-3 text-xs md:text-sm">
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-[18px] border border-white/30 bg-white/10 text-xs hover:bg-white/20 transition"
                    onClick={() =>
                      setCurrentMonth((m) => {
                        const d = new Date(m);
                        d.setMonth(d.getMonth() - 1);
                        return startOfMonth(d);
                      })
                    }
                  >
                    Prev
                  </button>
                  <button
                    type="button"
                    className="px-3 py-1.5 rounded-[18px] border border-white/30 bg-white/10 text-xs hover:bg-white/20 transition"
                    onClick={() =>
                      setCurrentMonth((m) => {
                        const d = new Date(m);
                        d.setMonth(d.getMonth() + 1);
                        return startOfMonth(d);
                      })
                    }
                  >
                    Next
                  </button>
                </div>
              </div>

              {/* months */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                {[0, 1].map((offset) => {
                  const monthDate = addMonths(currentMonth, offset);

                  if (offset === 1) {
                    return (
                      <div key={offset} className="hidden md:block">
                        {renderMonth(
                          monthDate,
                          range,
                          today,
                          onSelectDate,
                          getMonthDays
                        )}
                      </div>
                    );
                  }

                  return (
                    <div key={offset}>
                      {renderMonth(
                        monthDate,
                        range,
                        today,
                        onSelectDate,
                        getMonthDays
                      )}
                    </div>
                  );
                })}
              </div>

              {/* footer buttons */}
              <div className="mt-6 flex flex-col md:flex-row md:justify-between md:items-center gap-3 text-xs md:text-sm">
                <div className="text-[11px] md:text-xs text-white/60">
                  Calendar v1.0 • Nights selected:{" "}
                  <span className="text-white">{nights}</span>
                </div>
                <div className="flex gap-2 md:gap-3 self-end">
                  <button
                    type="button"
                    onClick={() => {
                      setCalendarOpen(false);
                      setRange({ checkIn: null, checkOut: null });
                    }}
                    className="px-5 md:px-6 py-2 rounded-[18px] md:rounded-[20px] border border-white/35 bg-white/5 hover:bg-white/15 transition"
                  >
                    Clear
                  </button>
                  <button
                    type="button"
                    onClick={() => setCalendarOpen(false)}
                    className="px-6 md:px-7 py-2 rounded-[18px] md:rounded-[20px] border border-white bg-white text-black font-medium hover:bg-white/90 transition"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* GUESTS / ROOMS PILL */}
        <div className="relative w-full h-full">
          <button
            type="button"
            onClick={() => setGuestsOpen((o) => !o)}
            className="w-full h-full flex items-center gap-3 rounded-2xl md:rounded-[26px] border border-white/35 
                       bg-gradient-to-br from-white/18 via-white/10 to-white/5
                       px-4 md:px-7 py-3 md:py-4 backdrop-blur-xl hover:bg-white/15 
                       hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] hover:-translate-y-[1px]
                       transition-all duration-200 whitespace-pre-line text-left"
          >
            <span>{guestSummary}</span>
            <FiChevronRight className="ml-1 md:ml-2 opacity-80" />
          </button>

          {guestsOpen && (
            <div className="absolute left-0 mt-4 w-72 rounded-3xl border border-white/40 bg-gradient-to-br from-black/90 via-black/80 to-black/70 backdrop-blur-2xl shadow-2xl p-5 text-sm z-40">
              {(
                [
                  ["Rooms", "rooms", ""],
                  ["Adults", "adults", "ages 13 or above"],
                  ["Children", "children", "ages 0-12"],
                ] as const
              ).map(([label, key, sub]) => (
                <div
                  key={key}
                  className="flex items-center justify-between mb-4 last:mb-0"
                >
                  <div>
                    <div>{label}</div>
                    {sub && (
                      <div className="text-xs opacity-70">{sub}</div>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        changeGuest(
                          key as keyof Guests,
                          -1,
                          key === "rooms" ? 1 : 0
                        )
                      }
                      className="h-7 w-7 rounded-[18px] border border-white/40 flex items-center justify-center hover:bg-white/15 transition"
                    >
                      -
                    </button>
                    <span className="w-4 text-center">
                      {guests[key as keyof Guests]}
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        changeGuest(key as keyof Guests, 1)
                      }
                      className="h-7 w-7 rounded-[18px] border border-white flex items-center justify-center hover:bg-white/90 hover:text-black transition"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

              <div className="mt-5 flex justify-end">
                <button
                  type="button"
                  onClick={() => setGuestsOpen(false)}
                  className="px-7 py-2 rounded-[20px] border border-white bg-white text-black font-medium hover:bg-white/90 transition"
                >
                  Apply
                </button>
              </div>
            </div>
          )}
        </div>

        {/* NIGHTS PILL */}
        <div
          className="w-full h-full flex items-center rounded-2xl md:rounded-[26px] border border-white/35 
                     bg-gradient-to-br from-white/18 via-white/10 to-white/5
                     px-4 md:px-7 py-3 md:py-4 backdrop-blur-xl hover:bg-white/15 
                     hover:shadow-[0_16px_40px_rgba(0,0,0,0.45)] hover:-translate-y-[1px]
                     transition-all duration-200"
        >
          <div className="flex flex-col leading-tight">
            <span className="text-[11px] opacity-70">Nights</span>
            <span className="text-sm md:text-lg">{nights}</span>
          </div>
        </div>

        {/* SEARCH BUTTON */}
        <div className="col-span-2 md:col-span-1 w-full h-full flex items-center justify-center md:justify-start mt-3 md:mt-0">
          <button
            type="button"
            className="w-full h-full rounded-2xl md:rounded-[28px] bg-white text-black px-8 md:px-10 py-3 md:py-4 font-semibold 
                       shadow-[0_18px_45px_rgba(0,0,0,0.5)] hover:bg-white/90 
                       hover:-translate-y-[1px] transition-all duration-200"
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

/* ---------- helper to render one month grid ---------- */

function renderMonth(
  monthDate: Date,
  range: DateRange,
  today: Date,
  onSelectDate: (d: Date) => void,
  getMonthDaysFn: (d: Date) => (Date | null)[]
) {
  const days = getMonthDaysFn(monthDate);
  const labels = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

  return (
    <>
      <div className="mb-3 text-center text-xs md:text-sm font-medium tracking-wide">
        {monthDate.toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </div>

      <div className="grid grid-cols-7 text-[10px] md:text-[11px] mb-1.5 md:mb-2 opacity-70">
        {labels.map((d) => (
          <div key={d} className="text-center">
            {d}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1.5 text-[11px] md:text-xs">
        {days.map((d, i) => {
          if (!d) return <div key={i} />;

          const isPast = d < today;
          const isCheckIn =
            range.checkIn && d.getTime() === range.checkIn.getTime();
          const isCheckOut =
            range.checkOut && d.getTime() === range.checkOut.getTime();

          return (
            <button
              key={d.toISOString()}
              type="button"
              disabled={isPast}
              onClick={() => onSelectDate(d)}
              className={[
                "h-8 w-8 md:h-9 md:w-9 rounded-[18px] flex items-center justify-center mx-auto transition",
                isPast
                  ? "opacity-30 cursor-not-allowed"
                  : "hover:bg-white/15",
                isCheckIn || isCheckOut
                  ? "bg-white text-black font-semibold shadow-[0_8px_24px_rgba(0,0,0,0.45)]"
                  : "",
              ].join(" ")}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </>
  );
}
