import Link from "next/link";
import Image from "next/image";

export default function MobileFooterLower() {
  return (
    <div className="md:hidden w-full bg-[#FCF9F6] px-1 pb-12 text-[#463214]">
      <div className="max-w-[380px] pl-6 flex flex-col gap-6">
        <div className="flex flex-row justify-between gap-0">
          <div className="w-[48%]">
            <div className="font-semibold text-[16px] mb-3">Navigation</div>
            <ul className="text-[14px] space-y-2">
              <li>
                <Link href="/about">About Us</Link>
              </li>
              <li>Rooms</li>
              <li>Promotions</li>
              <li>Discover</li>
              <li>Our Services</li>
              <li>Gallery</li>
              <li>My Booking</li>
            </ul>
          </div>

          <div className="w-[48%]">
            <div className="font-semibold text-[16px] mb-3">Legal Info</div>
            <ul className="text-[14px] space-y-2">
              <li>Imprints</li>
              <li>Privacy & Policy</li>
              <li>Terms & Conditions</li>
            </ul>

            <div className="mt-4">
              <div className="font-semibold text-[16px] mb-3 ">Awards</div>
              <div className="flex items-center gap-6">
                <Image
                  src="/images/awards1.png"
                  alt="award1"
                  width={34}
                  height={34}
                />
                <Image
                  src="/images/awards2.png"
                  alt="award2"
                  width={36}
                  height={36}
                />
                <Image
                  src="/images/awards3.png"
                  alt="award3"
                  width={36}
                  height={36}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between justify-center">
          <div className="flex gap-4">
            {[
              { file: "tiktok.png", href: "https://www.tiktok.com/" },
              { file: "facebook.png", href: "https://www.facebook.com/" },
              { file: "twitter.png", href: "https://www.x.com/" },
              { file: "instagram.png", href: "https://www.instagram.com/" },
            ].map((item, i) => (
              <Link
                href={item.href}
                key={i}
                aria-label={item.file.split(".")[0]}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: 12,
                    padding: 12,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#FFFFFF",
                    boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
                    cursor: "pointer",
                  }}
                >
                  <Image
                    src={`/images/${item.file}`}
                    alt={item.file}
                    width={24}
                    height={24}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        <div className="text-center text-[12px] align-center">
          Copyright 2020. ANANYA Hotels & Resorts. All Rights Reserved
        </div>
      </div>
    </div>
  );
}
