"use client";
import React from "react";
import Image from "next/image";

type Props = {
  imgs: string[];
  className?: string;
};

export default function GalleryGrid({ imgs, className = "" }: Props) {
  const get = (i: number) => imgs[i] ?? imgs[i % imgs.length] ?? "";

  return (
    <div
      className={`w-[277px] md:w-full mx-auto space-y-4 md:space-y-10 ${className}`}
    >
      <div className="flex flex-row items-start justify-between gap-4 md:gap-10">
        <div className="w-[130.5px] h-[190px] rounded-lg md:w-[639px] md:h-[640px] md:rounded-4xl overflow-hidden">
          {get(0) && (
            <Image
              src={`/Images/${get(0)}`}
              alt={`gallery-0`}
              width={639}
              height={640}
              className="object-cover w-full h-full transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
            />
          )}
        </div>

        <div className="w-[130.5px] md:w-[537px] flex flex-col gap-4 md:gap-10">
          <div className="h-[87px] rounded-lg md:h-[300px] md:rounded-4xl overflow-hidden">
            {get(1) && (
              <Image
                src={`/Images/${get(1)}`}
                alt={`gallery-1`}
                width={537}
                height={300}
                className="object-cover w-full h-full transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
              />
            )}
          </div>
          <div className="h-[87px] rounded-lg md:h-[300px] md:rounded-4xl overflow-hidden">
            {get(2) && (
              <Image
                src={`/Images/${get(2)}`}
                alt={`gallery-2`}
                width={537}
                height={300}
                className="object-cover w-full h-full transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
              />
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-row items-start justify-between gap-4 md:gap-10">
        <div className="w-[130.5px] md:w-[537px] flex flex-col gap-4 md:gap-10">
          <div className="h-[87px] rounded-lg md:h-[300px] md:rounded-4xl overflow-hidden">
            {get(3) && (
              <Image
                src={`/Images/${get(3)}`}
                alt={`gallery-3`}
                width={537}
                height={300}
                className="object-cover w-full h-full transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
              />
            )}
          </div>
          <div className="h-[87px] rounded-lg md:h-[300px] md:rounded-4xl overflow-hidden">
            {get(4) && (
              <Image
                src={`/Images/${get(4)}`}
                alt={`gallery-4`}
                width={537}
                height={300}
                className="object-cover w-full h-full transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
              />
            )}
          </div>
        </div>

        <div className="w-[130.5px] h-[190px] rounded-lg md:w-[639px] md:h-[640px] md:rounded-4xl overflow-hidden">
          {get(5) && (
            <Image
              src={`/Images/${get(5)}`}
              alt={`gallery-5`}
              width={639}
              height={640}
              className="object-cover w-full h-full transform transition-transform duration-300 ease-out hover:scale-105 cursor-pointer"
            />
          )}
        </div>
      </div>
    </div>
  );
}
