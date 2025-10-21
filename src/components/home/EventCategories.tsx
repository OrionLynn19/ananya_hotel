"use client";

import Image from "next/image";
import Link from "next/link";
import { ComponentPropsWithoutRef } from "react";

type Item = {
  title: string;
  blurb: string;
  href?: string;
  imgSrc: string;
  imgAlt: string;
};

type Props = {
  heading?: string;
  subheading?: string;
  items?: Item[];
  className?: string;
} & ComponentPropsWithoutRef<"section">;

export default function EventCategories({
  heading = "From ‘I Do’ to Business Breakthroughs",
  subheading = "We host it all — weddings, social celebrations, and corporate events — with beachfront style and service that guarantees satisfaction.",
  items = [],
  className = "",
  ...rest
}: Props) {
  return (
    <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`} {...rest}>
      <header className="mx-auto max-w-3xl text-center">
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#4C331E]">{heading}</h2>
        <p className="mt-4 text-lg leading-7 text-[#5a4734]">{subheading}</p>
      </header>

      <div className="mt-10 flex flex-nowrap justify-center gap-6 overflow-hidden">
        {(items ?? []).map((item, i) => (
          <Card key={i} {...item} />
        ))}
      </div>
    </section>
  );
}

function Card({ title, blurb, href = "#", imgSrc, imgAlt }: Item) {
  const Wrapper = href ? Link : "div";
  const wrapperProps = href ? { href } : {};

  return (
    <Wrapper
      {...(wrapperProps as any)}
      className="group relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-sm transition-all duration-500 ease-out
                 h-[594px] w-[258px] basis-[18%] grow-0 shrink-0 hover:basis-[26%] hover:scale-[1.01]
                 focus-visible:basis-[26%] focus-visible:scale-[1.01] focus:outline-none"
      aria-label={title}
    >
      <div className="relative w-full h-full">
        <Image
          src={imgSrc}
          alt={imgAlt}
          fill
          sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw"
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5 transition-opacity duration-300 group-hover:opacity-0">
        <span className="inline-block rounded-lg bg-black/35 px-4 py-2 text-2xl font-extrabold leading-none tracking-wide text-white backdrop-blur-sm">
          {title}
        </span>
      </div>

      <div
        className="absolute inset-0 z-20 grid place-items-end bg-gradient-to-t from-black/70 via-black/40 to-transparent
                   translate-y-6 opacity-0 transition-all duration-500 ease-out
                   group-hover:translate-y-0 group-hover:opacity-100"
      >
        <div className="w-full p-6 pt-10">
          <div className="rounded-xl bg-black/55 p-5 backdrop-blur-md">
            <h3 className="text-white text-2xl font-extrabold">{title}</h3>
            <p className="mt-2 text-white/90 text-sm leading-6">{blurb}</p>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
