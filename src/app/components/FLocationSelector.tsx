"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function MobileLocationSelector() {
  const [selected, setSelected] = useState<"huahin" | "pattaya" | "phuket">(
    "huahin"
  );

  const locations = {
    huahin: {
      title: "ANANYA Hua Hin",
      address:
        "46/24 Hua Hin Sai 1 Road, Nong Pe, Bang Lag, Chon Buri 2050, Thailand",
      email: "ananyahuahin@hos.ca.cc",
      phone: "08-97650888",
    },
    pattaya: {
      title: "ANANYA Pattaya",
      address:
        "46/24 Pattaya Sai 1 Road, Nong Pe, Bang Lag,Chon Buri 2050,Thailand",
      email: "ananyapattaya@hos.ca.cc",
      phone: "08-97650099",
    },
    phuket: {
      title: "ANANYA Phuket",
      address:
        "46/24 Phuket Sai 1 Road, Nong Pe, Bang Lag,Chon Buri 2050,Thailand",
      email: "ananyaphuket@hos.ca.cc",
      phone: "08-97650111",
    },
  } as const;

  const curr = locations[selected];

  return (
    <div className="md:hidden flex flex-col bg-[#FCF9F6] w-full px-6 py-10 gap-6 text-[#463214]">
      {/* Logo + Buttons */}
      <div className="flex items-center justify-between">
        <Image
          src="/images/Footer-icon.png"
          alt="Ananya Logo"
          width={90}
          height={89}
          className="object-contain"
        />

        <div className="flex gap-3">
          <Link href="/booking" aria-label="Book">
            <button
              type="button"
              className="bg-[#463214] text-white w-[80px] h-[40px] rounded-[15px] border border-black/10 text-[14px] font-bold flex items-center justify-center"
            >
              Book
            </button>
          </Link>

          <Link href="/contact" aria-label="Contact Us">
            <button
              type="button"
              className="bg-[#4632141F] text-[#463214] w-[110px] h-[40px] rounded-[15px] border border-black/10 text-[14px] font-bold flex items-center justify-center"
            >
              Contact Us
            </button>
          </Link>
        </div>
      </div>

      {/* content row (left = details, right = location buttons) */}
      <div className="flex flex-row gap-4 mt-4">
        <div className="w-[55%]">
          <h2 className="text-[18px] font-bold mb-3">{curr.title}</h2>

          <div className="flex items-start gap-2 text-[14px] leading-6">
            <Image
              src="/images/address.png"
              alt="address"
              width={49}
              height={39}
            />
            <p>{curr.address}</p>
          </div>

          <div className="flex items-start gap-2 text-[14px] mt-2">
            <Image src="/images/email.png" alt="email" width={23} height={23} />
            <p>{curr.email}</p>
          </div>

          <div className="flex items-start gap-2 text-[14px] mt-1">
            <Image src="/images/phone.png" alt="phone" width={24} height={24} />
            <p>{curr.phone}</p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {(["huahin", "pattaya", "phuket"] as const).map((k) => {
            const active = selected === k;
            return (
              <button
                key={k}
                type="button"
                onClick={() => setSelected(k)}
                className="font-bold text-[15px] text-left bg-transparent"
                style={{
                  padding: 0,
                  border: "none",
                  cursor: "pointer",
                  color: "#463214",
                  ...(active
                    ? {
                        borderBottom: "2px solid #463214",
                        paddingBottom: 6,
                      }
                    : {}),
                }}
                aria-pressed={active}
              >
                {locations[k].title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
