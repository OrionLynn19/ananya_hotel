"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { FiWifi } from "react-icons/fi";
import {
  FaCarAlt,
  FaSwimmingPool,
  FaDog,
  FaSmokingBan,
  FaUserFriends,
  FaBed,
} from "react-icons/fa";
import type { RoomWithPackages, Package } from "@/types/db";

// Map amenity names to icons
function getAmenityIcon(name: string): JSX.Element {
  const iconMap: Record<string, JSX.Element> = {
    Wifi: <FiWifi />,
    Parking: <FaCarAlt />,
    Pool: <FaSwimmingPool />,
    "Pet Friendly": <FaDog />,
    "No Smoking": <FaSmokingBan />,
  };
  return iconMap[name] || <FiWifi />;
}

export default function BookingRoomCard() {
  const searchParams = useSearchParams();
  const [rooms, setRooms] = useState<RoomWithPackages[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        // Build API URL with search params
        const params = new URLSearchParams();

        const destination = searchParams.get("destination");
        const checkIn = searchParams.get("checkIn");
        const checkOut = searchParams.get("checkOut");
        const roomsCount = searchParams.get("rooms");
        const adults = searchParams.get("adults");
        const children = searchParams.get("children");

        if (destination) params.set("destination", destination);
        if (checkIn) params.set("checkIn", checkIn);
        if (checkOut) params.set("checkOut", checkOut);
        if (roomsCount) params.set("rooms", roomsCount);
        if (adults) params.set("adults", adults);
        if (children) params.set("children", children);

        const response = await fetch(`/api/booking/rooms?${params}`);
        const data = await response.json();
        setRooms(data);
      } catch (error) {
        console.error("Error fetching rooms:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, [searchParams]);

  if (loading) {
    return (
      <section className="w-full flex justify-center px-4 md:px-0">
        <div className="text-white">Loading rooms...</div>
      </section>
    );
  }

  if (rooms.length === 0) {
    return (
      <section className="w-full flex justify-center px-4 md:px-0">
        <div className="text-white text-center">
          <p className="text-lg mb-2">No rooms found</p>
          <p className="text-sm opacity-70">
            Try adjusting your search criteria
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full flex justify-start px-4 md:px-0">
      <div className="w-full max-h-[720px] overflow-y-auto space-y-4 pr-2 scrollbar-hide">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </section>
  );
}

function RoomCard({ room }: { room: RoomWithPackages }) {
  const [bedChoice, setBedChoice] = useState<string>("Single Bed");

  const amenitiesWithIcons = room.amenities.map((a) => ({
    icon: getAmenityIcon(a.name),
    label: a.name,
  }));

  return (
    <article
      className="
        w-full
        rounded-[28px]
        border border-white/30
        bg-gradient-to-br from-white/18 via-white/8 to-black/30
        backdrop-blur-2xl
        shadow-[0_30px_80px_rgba(0,0,0,0.75)]
        text-white
        p-6 md:p-8
      "
    >
      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.05fr)_minmax(0,2fr)] gap-6 md:gap-8">
        {/* LEFT: image + amenities */}
        <div className="flex flex-col gap-5">
          <div className="relative rounded-[22px] overflow-hidden aspect-[4/3]">
            <Image
              src={room.image_url || "/images/placeholder.jpg"}
              alt={room.name}
              fill
              className="object-cover"
            />
          </div>

          <ul className="space-y-2 text-sm">
            {amenitiesWithIcons.map((a, idx) => (
              <li
                key={idx}
                className="flex items-center gap-3 text-[13px] md:text-[14px]"
              >
                <span className="flex h-5 w-5 items-center justify-center">
                  {a.icon}
                </span>
                <span>{a.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT: details + packages */}
        <div className="flex flex-col">
          {/* header */}
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="text-lg md:text-xl font-semibold">{room.name}</h3>
              <div className="mt-2 flex items-center gap-2 text-xs md:text-sm opacity-90">
                <FaUserFriends className="text-sm" />
                <span>{room.ideal_for}</span>
              </div>

              {/* bed options */}
              <div className="mt-3 flex flex-wrap gap-4 text-xs md:text-sm">
                {room.bed_types.toLowerCase().includes("king") && (
                  <BedOption
                    label="King Bed"
                    selected={bedChoice === "King Bed"}
                    onSelect={() => setBedChoice("King Bed")}
                  />
                )}
                {room.bed_types.toLowerCase().includes("twin") && (
                  <BedOption
                    label="Twin Bed"
                    twin
                    selected={bedChoice === "Twin Bed"}
                    onSelect={() => setBedChoice("Twin Bed")}
                  />
                )}
                {room.interconnect && (
                  <BedOption
                    label="Extra Bed"
                    selected={bedChoice === "Extra Bed"}
                    onSelect={() => setBedChoice("Extra Bed")}
                  />
                )}
              </div>

              <button
                type="button"
                onClick={() => (window.location.href = `/rooms/${room.id}`)}
                className="mt-3 text-xs md:text-sm underline underline-offset-2"
              >
                Room Details
              </button>
            </div>

            <div className="text-right text-xs md:text-sm opacity-80">
              {room.size}
            </div>
          </div>

          {/* divider */}
          <div className="my-4 h-px w-full bg-white/20" />

          {/* PACKAGES */}
          <div className="flex-1 flex flex-col gap-6 text-[13px] md:text-[14px]">
            {room.packages && room.packages.length > 0 ? (
              room.packages.map((pkg, idx) => (
                <PackageCard
                  key={pkg.id}
                  pkg={pkg}
                  isLast={idx === room.packages.length - 1}
                  roomId={room.id}
                />
              ))
            ) : (
              <div className="text-center text-white/60 py-4">
                No packages available for this room
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function PackageCard({
  pkg,
  isLast,
  roomId,
}: {
  pkg: Package;
  isLast: boolean;
  roomId: number;
}) {
  const handleAddToCart = async () => {
    try {
      // read search params for dates and guests
      // use `window.location.search` as a fallback if hook not available here
      const params = new URLSearchParams(window.location.search);
      const checkIn =
        params.get("checkIn") ||
        params.get("check_in") ||
        new Date().toISOString().slice(0, 10);
      const checkOut =
        params.get("checkOut") ||
        params.get("check_out") ||
        (() => {
          const d = new Date();
          d.setDate(d.getDate() + 1);
          return d.toISOString().slice(0, 10);
        })();
      const adults = parseInt(params.get("adults") || "1", 10) || 1;
      const children = parseInt(params.get("children") || "0", 10) || 0;

      const payload = {
        room_id: roomId,
        check_in: checkIn,
        check_out: checkOut,
        adults,
        children,
      };

      const res = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        console.error("Failed to add to cart", err);
        alert(err?.error || "Failed to add to cart");
        return;
      }

      // success — notify other parts of the app to refresh cart
      try {
        window.dispatchEvent(new CustomEvent("cart-updated"));
      } catch (e) {
        // older browsers
        const ev = document.createEvent("Event");
        ev.initEvent("cart-updated", true, true);
        window.dispatchEvent(ev);
      }

      // optional: show a quick feedback
      // eslint-disable-next-line no-console
      console.log("Added to cart", await res.json().catch(() => ({})));
    } catch (error) {
      console.error("Error adding to cart", error);
      alert("Error adding to cart");
    }
  };

  return (
    <div className={!isLast ? "pb-6" : ""}>
      <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-4 md:gap-6">
        {/* left content */}
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-semibold">{pkg.name}</h4>
            {pkg.is_member_only && (
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/30">
                Members Only
              </span>
            )}
          </div>

          {pkg.description && (
            <p className="mt-1 text-xs text-white/70">{pkg.description}</p>
          )}

          <div className="mt-1 text-[12px] md:text-[13px]">
            <span className="text-white/80">or </span>
            <span className="text-[#23b54a] font-semibold">
              {pkg.points.toLocaleString()} points
            </span>
            <span className="text-white/80"> per night</span>
          </div>

          <ul className="mt-2 space-y-1.5 list-disc list-inside leading-relaxed">
            {pkg.benefits.map((benefit, i) => (
              <li key={i}>{benefit}</li>
            ))}
          </ul>
        </div>

        {/* right side: price + Add */}
        <div className="mt-4 flex w-full items-center justify-between md:mt-0 md:flex-col md:w-auto md:items-end md:justify-between gap-3 md:gap-0">
          <div className="text-left md:text-right whitespace-nowrap">
            {pkg.original_price && (
              <div className="text-[12px] md:text-[13px] line-through opacity-70">
                THB {pkg.original_price.toLocaleString()}
              </div>
            )}
            <div className="text-[13px] md:text-[14px] text-[#e23c2c] font-semibold">
              THB {pkg.price.toLocaleString()}
            </div>
          </div>

          <button
            type="button"
            onClick={handleAddToCart}
            className="rounded-full border border-white px-8 py-2 text-sm font-medium hover:bg-white hover:text-black transition"
          >
            Add
          </button>
        </div>
      </div>

      {!isLast && <div className="mt-5 h-px w-full bg-white/18" />}
    </div>
  );
}

function BedOption({
  label,
  twin,
  selected,
  onSelect,
}: {
  label: string;
  twin?: boolean;
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="inline-flex items-center gap-1.5 text-xs md:text-sm"
    >
      <span
        className={`h-3 w-3 rounded-full mr-1 border ${
          selected ? "bg-white border-white" : "border-white/70"
        }`}
      />
      <FaBed className="text-[11px]" />
      {twin && <FaBed className="text-[11px]" />}
      <span>{label}</span>
    </button>
  );
}
