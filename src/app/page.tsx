

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
     <Hero />
     <HomeSection2/>
     <Home3/>
     <EventCategoriesSection />
     <ExperienceSection/>

     


    </>



  );
}

