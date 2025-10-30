"use client";
import EventCategoriesSection from "@/components/home/EventCategoriesSection";
import React from "react";
import Hero from "../components/Hero";
import ExperienceSection from "@/components/home/ExperienceSection";
import HomeSection2 from "./Home-2/page";
import Home3 from "./components/home3/Home3";
import About_us3 from "./components/about_us/about_us3";

export default function Page() {
  return (
    <>
      <div className="pb-11 md:pb-[95px]">
        {/* pb-64 and md:pb-[131px] in figma but homesection2 has some paddings already*/}
        <Hero />
      </div>
      <HomeSection2 />
      <Home3 />
      <EventCategoriesSection />
      <ExperienceSection />
    </>
  );
}
