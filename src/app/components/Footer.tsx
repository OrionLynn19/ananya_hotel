import Link from "next/link";
import Image from "next/image";
import MobileLocationSelector from "./FLocationSelector";
import MobileFooterLower from "./MobileFooterLower";

export default function Footer() {
  const navTextStyle: React.CSSProperties = {
    fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif',
    fontWeight: 600,
    fontSize: "24px",
    lineHeight: "100%",
    letterSpacing: "0px",
    textAlign: "left",
    verticalAlign: "middle",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    color: "#463214",
  };

  return (
    <footer>
      {/* === DESKTOP: responsive container */}
      <div
        className="w-full bg-[#FCF9F6] flex flex-col hidden md:block"
        style={{ fontFamily: '"Poltawski Nowy", "Poltawski-Nowy", serif' }}
      >
        {/* responsive center: max width 1440, fluid below, full width at 2xl */}
        <div
          className="mx-auto w-[1440px] max-w-full 2xl:w-full bg-[#FCF9F6]"
          style={{
            height: "1251px",
            paddingTop: 127,
            paddingRight: 111,
            paddingBottom: 127,
            paddingLeft: 111,
            gap: 10,
          }}
        >
          {/* desktop content (unchanged) */}
          <div className="w-full flex items-center justify-between">
            <div className="flex " style={{ paddingTop: 16, gap: 9 }}>
              <Link href="/" aria-label="Ananya home">
                <Image
                  src="/images/Footer-icon.png"
                  alt="ANANYA"
                  width={245}
                  height={170}
                  priority
                  style={{ objectFit: "contain" }}
                />
              </Link>
            </div>

            <div className="flex items-center" style={{ gap: 24 }}>
              <Link href="/booking" aria-label="Book">
                <button
                  type="button"
                  style={{
                    background: "#463214",
                    ...navTextStyle,
                    color: "#FFFFFF",
                    width: 106,
                    height: 57,
                    borderRadius: 20,
                    border: "0.5px solid rgba(0,0,0,0.12)",
                    paddingTop: 10,
                    paddingRight: 24,
                    paddingBottom: 10,
                    paddingLeft: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 700,
                    cursor: "pointer",
                  }}
                >
                  Book
                </button>
              </Link>

              <Link href="/contact" aria-label="Contact Us">
                <button
                  type="button"
                  style={{
                    background: "rgba(70,49,20,0.12)",
                    ...navTextStyle,
                    color: "#463214",
                    width: 170,
                    height: 57,
                    borderRadius: 20,
                    border: "0.5px solid rgba(0,0,0,0.12)",
                    paddingTop: 10,
                    paddingRight: 24,
                    paddingBottom: 10,
                    paddingLeft: 24,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 22,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Contact Us
                </button>
              </Link>
            </div>
          </div>

          {/* ...rest of desktop content unchanged (columns, nav, awards, social, copyright) ... */}
          <div className="mt-18 flex flex-row justify-between gap-3">
            {/* Column 1 */}
            <div>
              <div style={{ ...navTextStyle, fontSize: 40, marginBottom: 32 }}>
                ANANYA Hua Hin
              </div>
              <div className="flex items-start gap-3 mb-3">
                <Image
                  src="/images/address.png"
                  alt="address"
                  width={24.96}
                  height={24.96}
                />
                <div
                  style={{
                    color: "#463214",
                    fontSize: 24,
                    fontWeight: 400,
                    maxWidth: 300,
                  }}
                >
                  46/24 Hua Hin Sai 1 Road, Nong Pe, Bang Lag,Chon Buri
                  2050,Thailand
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/images/email.png"
                  alt="email"
                  width={24.96}
                  height={24.96}
                />
                <div
                  style={{ color: "#463214", fontSize: 24, fontWeight: 400 }}
                >
                  ananyahuahin@hos.ca.cc
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Image
                  src="/images/phone.png"
                  alt="phone"
                  width={24.96}
                  height={24.96}
                />
                <div
                  style={{ color: "#463214", fontSize: 24, fontWeight: 400 }}
                >
                  08-97650088
                </div>
              </div>
            </div>

            {/* Column 2 */}
            <div>
              <div style={{ ...navTextStyle, fontSize: 40, marginBottom: 32 }}>
                ANANYA Pattaya
              </div>
              <div className="flex items-start gap-3 mb-3">
                <Image
                  src="/images/address.png"
                  alt="address"
                  width={24.96}
                  height={24.96}
                />
                <div
                  style={{
                    color: "#463214",
                    fontSize: 24,
                    fontWeight: 400,
                    maxWidth: 300,
                  }}
                >
                  46/24 Pattaya Sai 1 Road, Nong Pe, Bang Lag,Chon Buri
                  2050,Thailand
                </div>
              </div>

              <div className="flex items-center gap-3 mb-3">
                <Image
                  src="/images/email.png"
                  alt="email"
                  width={24.96}
                  height={24.96}
                />
                <div
                  style={{ color: "#463214", fontSize: 24, fontWeight: 400 }}
                >
                  ananyapattaya@hos.ca.cc
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Image
                  src="/images/phone.png"
                  alt="phone"
                  width={24.96}
                  height={24.96}
                />
                <div
                  style={{ color: "#463214", fontSize: 24, fontWeight: 400 }}
                >
                  08-97650099
                </div>
              </div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col">
              <div>
                <div
                  style={{ ...navTextStyle, fontSize: 40, marginBottom: 32 }}
                >
                  ANANYA Phuket
                </div>
                <div className="flex items-start gap-3 mb-3">
                  <Image
                    src="/images/address.png"
                    alt="address"
                    width={24.96}
                    height={24.96}
                  />
                  <div
                    style={{
                      color: "#463214",
                      fontSize: 24,
                      fontWeight: 400,
                      maxWidth: 300,
                    }}
                  >
                    46/24 Phuket Sai 1 Road, Nong Pe, Bang Lag,Chon Buri
                    2050,Thailand
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <Image
                    src="/images/email.png"
                    alt="email"
                    width={24.96}
                    height={24.96}
                  />
                  <div
                    style={{ color: "#463214", fontSize: 24, fontWeight: 400 }}
                  >
                    ananyaphuket@hos.ca.cc
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-6">
                  <Image
                    src="/images/phone.png"
                    alt="phone"
                    width={24.96}
                    height={24.96}
                  />
                  <div
                    style={{ color: "#463214", fontSize: 24, fontWeight: 400 }}
                  >
                    08-97650111
                  </div>
                </div>
              </div>
              {/* Awards row placeholder (desktop kept) */}
            </div>
          </div>

          <div aria-hidden style={{ marginTop: 14 }} />
          <div
            className="w-[1218px] 2xl:w-full"
            aria-hidden
            style={{
              height: 0,
              borderTop: "0.5px solid var(--text-color, #463214)",
              transform: "rotate(-0deg)",
              marginTop: 24,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          {/* Navigation / Legal / Awards row (desktop kept) */}
          <div
            className="mt-8"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              width: "100%",
              gap: 80,
            }}
          >
            {/* Navigation (left) */}
            <div style={{ width: "33%" }}>
              <div
                style={{
                  ...navTextStyle,
                  fontSize: 44,
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Navigation
              </div>
              <div
                style={{ display: "flex", justifyContent: "center", gap: 48 }}
              >
                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    color: "#463214",
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  <li style={{ marginBottom: 16 }}>
                    <Link href="/aboutus">About Us</Link>
                  </li>
                  <li style={{ marginBottom: 16 }}>Rooms</li>
                  <li style={{ marginBottom: 16 }}>Promotions</li>
                  <li>Discovers</li>
                </ul>

                <ul
                  style={{
                    listStyle: "none",
                    margin: 0,
                    padding: 0,
                    color: "#463214",
                    fontSize: 22,
                    fontWeight: 800,
                  }}
                >
                  <li style={{ marginBottom: 16 }}>Our Service</li>
                  <li style={{ marginBottom: 16 }}>Gallery</li>
                  <li>My Booking</li>
                </ul>
              </div>
            </div>

            {/* Legal Info (center) */}
            <div style={{ width: "33%" }}>
              <div
                style={{
                  ...navTextStyle,
                  fontSize: 44,
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Legal Info
              </div>
              <ul
                style={{
                  listStyle: "none",
                  margin: 0,
                  padding: 0,
                  color: "#463214",
                  fontSize: 22,
                  fontWeight: 800,
                  paddingLeft: 65,
                }}
              >
                <li style={{ marginBottom: 16 }}>Imprint</li>
                <li style={{ marginBottom: 16 }}>Privacy & Policy</li>
                <li>Terms & Conditions</li>
              </ul>
            </div>

            {/* Awards (right) */}
            <div style={{ width: "33%" }}>
              <div
                style={{
                  ...navTextStyle,
                  fontSize: 44,
                  marginBottom: 24,
                  textAlign: "center",
                }}
              >
                Awards
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 24,
                  alignItems: "center",
                }}
              >
                <Image
                  src="/images/awards1.png"
                  alt="award1"
                  width={106.92}
                  height={106.92}
                  style={{
                    border: "0.3px solid rgba(0,0,0,0.12)",
                    borderRadius: 999,
                  }}
                  priority
                />
                <Image
                  src="/images/awards2.png"
                  alt="award2"
                  width={106.92}
                  height={106.92}
                  style={{
                    border: "0.3px solid rgba(0,0,0,0.12)",
                    borderRadius: 999,
                  }}
                  priority
                />
                <Image
                  src="/images/awards3.png"
                  alt="award3"
                  width={106.92}
                  height={106.92}
                  style={{
                    border: "0.3px solid rgba(0,0,0,0.12)",
                    borderRadius: 999,
                  }}
                  priority
                />
              </div>
            </div>
          </div>

          <div
            className="w-[1218px] 2xl:w-full"
            aria-hidden
            style={{
              height: 0,
              borderTop: "0.5px solid var(--text-color, #463214)",
              transform: "rotate(-0deg)",
              marginTop: 24,
              marginLeft: "auto",
              marginRight: "auto",
            }}
          />

          <div
            className="mt-8"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div
              style={{
                color: "#463214",
                fontSize: 18,
                fontFamily: '"Montserrat", sans-serif',
                fontWeight: 500,
              }}
            >
              Copyright 2020. ANANYA Hotels & Resorts. All Rights Reserved
            </div>

            <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
              {[
                { file: "instagram.png", href: "https://www.instagram.com/" },
                { file: "facebook.png", href: "https://www.facebook.com/" },
                { file: "tiktok.png", href: "https://www.tiktok.com/" },
                { file: "twitter.png", href: "https://www.x.com/" },
              ].map((item, i) => (
                <Link
                  href={item.href}
                  key={i}
                  aria-label={item.file.split(".")[0]}
                >
                  <div
                    style={{
                      width: 72,
                      height: 72,
                      borderRadius: 24,
                      padding: 24,
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
                      priority
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <-- end desktop container */}

      {/* MOBILE */}
      <MobileLocationSelector />
      <MobileFooterLower />
    </footer>
  );
}
