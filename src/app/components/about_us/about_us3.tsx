"use client";

import Image from "next/image";

type Award = {
  logo: string;
  title: string;
  year: string | number;
  alt: string;
};

const AWARDS: Award[] = [
  {
    logo: "/images/Ellipse 30.png",
    title: "Forbes travel guide award",
    year: 2020,
    alt: "Forbes Travel Guide",
  },
  {
    logo: "/images/Ellipse 33.png",
    title: "World Travel Awards — Winner",
    year: 2023,
    alt: "World Travel Awards",
  },
  {
    logo: "/images/Ellipse 32.png",
    title: "Travelers’ Choice",
    year: 2022,
    alt: "Tripadvisor Travelers’ Choice",
  },
];

export default function About_us3() {
  return (
    <section className="bg-[#fff8f0] py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-4 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-[#3a2a18]">
          Celebrating Excellence
        </h2>
      </div>

      {/* Rounded background panel */}
      <div className="mx-auto mt-10 max-w-[1200px] px-4">
        <div className="relative overflow-hidden rounded-[48px] md:rounded-[56px]">
          {/* background image */}
          <div className="relative h-[520px] md:h-[560px]">
            <Image
              src="/images/bg-beach.png"
              alt="Beachfront background"
              fill
              className="object-cover"
              priority
            />
            {/* soft vignette */}
            <div className="absolute inset-0 bg-linear-to-b from-black/10 via-black/5 to-black/10" />
          </div>

          {/* awards row */}
          <div className="pointer-events-none absolute inset-0 grid place-items-center px-4">
            <div className="grid w-full max-w-5xl grid-cols-1 gap-6 sm:grid-cols-3">
              {AWARDS.map((a) => (
                <div
                  key={a.title}
                  className="pointer-events-auto rounded-[28px] bg-white/55 backdrop-blur-md ring-1 ring-white/60 shadow-[0_10px_30px_rgba(0,0,0,0.15)] px-6 py-8 md:px-8 md:py-10"
                >
                  {/* logo in a soft plate */}
                  <div className="mx-auto grid h-40 w-40 place-items-center rounded-2xl bg-white/70 ring-1 ring-white/80 shadow-sm">
                    <Image
                      src={a.logo}
                      alt={a.alt}
                      width={160}
                      height={160}
                      className="object-contain"
                    />
                  </div>

                  {/* caption */}
                  <div className="mt-6 text-center">
                    <p className="font-serif text-[18px] leading-snug text-[#2e2417]">
                      {a.title}
                    </p>
                    <p className="mt-1 text-lg font-semibold text-[#2e2417]">
                      {a.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
