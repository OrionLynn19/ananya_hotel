"use client";

import React, { useState } from "react";
import PaymentCartSummary from "@/components/cart/PaymentCartSummary";
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

export default function PaymentPage() {
  const [items, setItems] = useState<CartItem[]>([]);
  const [summary, setSummary] = useState<Summary>({
    totalGuests: "0 Adults",
    totalCost: 0,
  });

  const [prefix, setPrefix] = useState("Mr.");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [passportNumber, setPassportNumber] = useState("");
  const [email, setEmail] = useState("");
  const [phNumber, setPhNumber] = useState("");
  const [couponCode, setCouponCode] = useState("");
  const [arrivedBy, setArrivedBy] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  React.useEffect(() => {
    fetch("/api/cart")
      .then((r) => r.json())
      .then((data) => {
        setItems(data.items || []);
        setSummary(data.summary || { totalGuests: "0 Adults", totalCost: 0 });
      })
      .catch((err) => console.error("Failed to fetch cart:", err));
  }, []);

  const handleConfirmBooking = async () => {
    // Validate required fields
    if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !phNumber?.trim()) {
      alert("⚠️ Please fill in all required fields:\n• First Name\n• Last Name\n• Email\n• Phone Number");
      return;
    }

    if (!paymentMethod) {
      alert("⚠️ Please select a payment method");
      return;
    }

    if (items.length === 0) {
      alert("⚠️ Your cart is empty");
      return;
    }

    setIsSubmitting(true);

    try {
      const totalGuests = parseInt(summary.totalGuests.split(" ")[0]) || 0;

      const bookingData = {
        prefix,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        passportNumber: passportNumber.trim() || undefined,
        email: email.trim(),
        phoneNumber: phNumber.trim(),
        arrivedBy: arrivedBy.trim() || undefined,
        specialRequest: specialRequest.trim() || undefined,
        couponCode: couponCode.trim() || undefined,
        paymentMethod,
        totalCost: summary.totalCost,
        totalGuests,
      };

      console.log("📤 Submitting booking:", bookingData);

      const response = await fetch("/api/booking/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to create booking");
      }

      console.log("✅ Booking created:", result);

      // Clear cart event
      window.dispatchEvent(new CustomEvent("cart-updated"));

      // Redirect to confirmation page
      router.push(`/booking/confirmed?bookingId=${result.bookingId}`);
    } catch (error) {
      console.error("❌ Error creating booking:", error);
      alert(`Failed to create booking:\n${error instanceof Error ? error.message : "Unknown error"}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass =
    "text-white md:text-base text-xs placeholder-white/70 w-full h-10 rounded-lg mt-5 bg-[#7c6d58]/12 border backdrop-blur-lg border-[#ffffff]/20 px-3";

  return (
    <>
      <main>
        <div className="w-full max-w-[1326px] mx-auto px-4 py-16 md:flex md:gap-6">
          <section className="flex-1">
            <div className="w-full max-w-4xl md:py-0 py-10 md:px-0 px-7 text-white bg-[#463214]/6 backdrop-blur-2xl inset-shadow-xs inset-shadow-white/50 rounded-3xl overflow-y-auto scrollbar-hide">
              <div className="p-6 md:p-10">
                <h1 className="font-poltawski font-bold md:text-3xl text-xl ">
                  Enter Your Details
                </h1>

                {/* Prefix - Mobile */}
                <div className="block md:hidden mb-5 mt-8 w-1/2">
                  <label className="font-poltawski text-base">Prefix *</label>
                  <select
                    value={prefix}
                    onChange={(e) => setPrefix(e.target.value)}
                    className={inputClass}
                  >
                    <option value="Mr.">Mr.</option>
                    <option value="Mrs.">Mrs.</option>
                    <option value="Ms.">Ms.</option>
                    <option value="Dr.">Dr.</option>
                    <option value="Prof.">Prof.</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-3 grid-cols-2 gap-5 mt-5">
                  {/* Column 1 - Desktop: Prefix & Passport */}
                  <div className="hidden md:block">
                    <div className="mb-5">
                      <label className="font-poltawski text-xl">Prefix *</label>
                      <select
                        value={prefix}
                        onChange={(e) => setPrefix(e.target.value)}
                        className={inputClass}
                      >
                        <option value="Mr.">Mr.</option>
                        <option value="Mrs.">Mrs.</option>
                        <option value="Ms.">Ms.</option>
                        <option value="Dr.">Dr.</option>
                        <option value="Prof.">Prof.</option>
                      </select>
                    </div>
                    <div className="mb-10">
                      <label className="font-poltawski text-xl">
                        Passport Number
                      </label>
                      <input
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        placeholder="Passport Number"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  {/* Column 2 - First Name & Email */}
                  <div>
                    <div className="mb-5">
                      <label className="font-poltawski md:text-xl text-base">
                        First Name *
                      </label>
                      <input
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className={inputClass}
                        required
                      />
                    </div>

                    {/* Passport - Mobile */}
                    <div className="block md:hidden mb-10">
                      <label className="font-poltawski text-base">
                        Passport Number
                      </label>
                      <input
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value)}
                        placeholder="Passport Number"
                        className={inputClass}
                      />
                    </div>

                    {/* Email - Desktop */}
                    <div className="hidden md:block mb-10">
                      <label className="font-poltawski text-xl">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>

                  {/* Column 3 - Last Name & Phone */}
                  <div>
                    <div className="mb-5">
                      <label className="font-poltawski md:text-xl text-base">
                        Last Name *
                      </label>
                      <input
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className={inputClass}
                        required
                      />
                    </div>

                    <div className="md:mb-10 mb-5">
                      <label className="font-poltawski md:text-xl text-base">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        value={phNumber}
                        onChange={(e) => setPhNumber(e.target.value)}
                        placeholder="Phone Number"
                        className={inputClass}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Email - Mobile */}
                <div className="block md:hidden mb-10">
                  <label className="font-poltawski text-base">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address"
                    className={inputClass}
                    required
                  />
                </div>

                <hr className="border-t w-full border-[#c2c2c2] mb-10" />

                {/* Coupon Code */}
                <h1 className="font-poltawski md:text-3xl text-xl mb-5">
                  Coupon Code
                </h1>
                <div className="flex items-center gap-5">
                  <input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter Coupon Code"
                    className="text-white md:text-base text-xs placeholder-white/70 md:w-1/2 w-full h-10 rounded-lg bg-[#7c6d58]/12 border backdrop-blur-lg border-[#ffffff]/20 px-3"
                  />
                  <button className="bg-[#7c6d58]/30 active:scale-95 transition-transform inset-shadow-xs inset-shadow-white/50 border backdrop-blur-lg border-[#ffffff]/20 text-white/80 font-medium py-2 px-6 rounded-2xl">
                    Apply
                  </button>
                </div>

                <hr className="border-t w-full border-[#c2c2c2] my-10" />

                {/* Payment Method */}
                <h1 className="font-poltawski font-bold md:text-3xl text-xl mb-5">
                  Select a Payment Method *
                </h1>
                <div className="flex items-end md:gap-30 gap-3 md:px-8 px-0">
                  <div className="flex flex-col gap-4 w-1/2">
                    {[
                      { value: "credit_card", src: "/images/card1.png", label: "Credit Card" },
                      { value: "bank_transfer", src: "/images/card2.png", label: "Bank Transfer" },
                      { value: "mobile_banking", src: "/images/card3.png", label: "Mobile Banking" },
                    ].map((item) => (
                      <div
                        key={item.value}
                        className="flex items-center md:gap-3 gap-2 cursor-pointer"
                        onClick={() => setPaymentMethod(item.value)}
                      >
                        <input
                          type="radio"
                          name="payment"
                          value={item.value}
                          checked={paymentMethod === item.value}
                          onChange={(e) => setPaymentMethod(e.target.value)}
                          className="w-4 h-4 cursor-pointer"
                        />
                        <Image
                          src={item.src}
                          alt={item.label}
                          width={50}
                          height={50}
                          className="w-10 h-9 md:w-[50px] md:h-[45px]"
                        />
                        <label className="text-white md:font-medium font-normal md:text-lg text-xs cursor-pointer">
                          {item.label}
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-col w-1/2">
                    <h1 className="md:font-medium font-normal text-center md:text-lg text-xs">
                      We accept the following payment methods.
                    </h1>
                    <div className="flex gap-3 justify-center mt-3">
                      {[
                        "/images/card4.png",
                        "/images/card5.png",
                        "/images/card6.png",
                      ].map((src, idx) => (
                        <Image
                          key={idx}
                          src={src}
                          alt="payment method"
                          width={50}
                          height={50}
                          className="w-10 h-9 md:w-[50px] md:h-[45px]"
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <hr className="border-t w-full border-[#c2c2c2] my-10" />

                {/* Optional Information */}
                <h1 className="font-poltawski font-bold md:text-3xl text-xl mb-5">
                  Optional Information
                </h1>
                <div>
                  <div className="mb-5 w-1/2">
                    <label className="font-poltawski md:text-xl text-base">
                      Arrival Time
                    </label>
                    <input
                      type="time"
                      value={arrivedBy}
                      onChange={(e) => setArrivedBy(e.target.value)}
                      placeholder="Enter your arrival time"
                      className={inputClass}
                    />
                  </div>
                  <div className="mb-5">
                    <label className="font-poltawski md:text-xl text-base">
                      Special Requests
                    </label>
                    <textarea
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="e.g. bed preference, early check-in"
                      className="text-white md:text-base text-xs placeholder-white/70 w-full h-40 rounded-lg mt-5 bg-[#7c6d58]/12 border backdrop-blur-lg border-[#ffffff]/20 p-3"
                    ></textarea>
                  </div>
                </div>

                {/* Confirm Button */}
                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleConfirmBooking}
                    disabled={isSubmitting}
                    className="bg-[#7c6d58]/30 active:scale-95 transition-transform inset-shadow-xs inset-shadow-white/50 border backdrop-blur-lg border-[#ffffff]/20 text-white/80 font-medium py-3 px-8 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? "Creating Booking..." : "Confirm Booking"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <PaymentCartSummary
            items={items}
            summary={summary}
            onChange={(it, s) => {
              setItems(it);
              setSummary(s);
            }}
          />
        </div>
      </main>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
}
