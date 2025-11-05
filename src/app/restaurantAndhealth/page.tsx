"use client";
import CulinarySlider from "../../components/CulinarySlider";
import CulinaryTeamSection from "@/components/culinary-team/CulinaryTeamSection";
import DiningShowcase from "@/components/dinning/DinningExandable";
import Image from "next/image";

export default function AboutPage() {
  return (
    <>
      <div className=" relative w-full h-auto ">
        <Image
          src="/images/Res&Health1.png"
          alt="Resort and Health"
          width={1440}
          height={1024}
          className="z-0 md:h-[1024px] h-[560px] object-cover"
        />
        <div className="absolute inset-0 z-10 bg-linear-to-b from-[#151515]/30 to-[#151515]/70"></div>
        <div className="flex flex-col justify-end items-center absolute inset-0 z-20 text-[#fcf9f6] font-poltawski py-15 md:py-25 mx-auto">
          <h1 className=" text-[20px] md:text-[35px] text-center md:w-3xl w-xs font-bold mb-2">Dining at Its Finest</h1>
          <p className=" text-center md:w-3xl w-xs font-medium md:text-[24px] text-[16px]">
            Where every plate tells a story and every detail is crafted to delight, turning dining into an experience to remember.
          </p>
        </div>
      </div>
      <div className="mt-12">
        <div className="font-poltawski text-center text-[#463214] ">
          <h1 className="font-bold text-[20px] md:text-[35px]">Flavors Worth Sharing</h1>
          <p className="font-semibold md:text-[24px] text-[16px] mt-2">Browse the dishes that make dining with us unforgettable.</p>
        </div>
        <div className="grid md:grid-cols-3 grid-cols-2 md:grid-rows-2 grid-rows-3 gap-3  md:mt-10 mt-8 max-w-[95%] md:w-[90%] w-[300px] mx-auto">
          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/res&health2.jpg"
              alt="Dish 1"
              width={400}
              height={400}
              className="md:w-[390px] w-[150px] md:h-[390px] h-[150px] object-cover object-bottom transition-transform duration-500 ease-in-out hover:scale-120"
            />
          </div>

          <div className="block md:hidden row-span-2 rounded-2xl overflow-hidden">
            <Image
              src="/images/res&health4.jpg"
              alt="Dish 3"
              width={400}
              height={800}
              className="w-[150px] h-[305px] object-cover transition-transform duration-500 ease-in-out hover:scale-120"
            />
          </div>

          <div className="rounded-2xl overflow-hidden">
            <Image
              src="/images/res&health3.jpg"
              alt="Dish 2"
              width={400}
              height={400}
              className="md:w-[390px] w-[150px] md:h-[390px] h-[150px] object-cover object-bottom transition-transform duration-500 ease-in-out hover:scale-120"
            />
          </div>

          <div className="hidden md:block row-span-2 rounded-2xl overflow-hidden">
            <Image
              src="/images/res&health4.jpg"
              alt="Dish 3"
              width={400}
              height={800}
              className="w-[390px] h-[800px] object-cover transition-transform duration-500 ease-in-out hover:scale-120"
            />
          </div>

          <div className="col-span-2 rounded-2xl overflow-hidden">
            <Image
              src="/images/res&health5.png"
              alt="Dish 4"
              width={800}
              height={400}
              className="md:w-[800px] w-[400px] md:h-[390px] h-[150px] object-cover transition-transform duration-500 ease-in-out hover:scale-120"
            />
          </div>
        </div>

      </div>
      <CulinarySlider />
      <CulinaryTeamSection />
      < DiningShowcase/>
    </>
  );
}
