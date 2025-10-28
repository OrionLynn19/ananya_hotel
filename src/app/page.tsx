
"use client";
import EventCategoriesSection from "@/components/home/EventCategoriesSection";
import React from "react";
import Hero from "../components/Hero";
import ExperienceSection from "@/components/home/ExperienceSection";
import HomeSection2 from "./Home-2/page";



export default function Page() {
  return (
    <>
     <Hero />
     <HomeSection2/>
     <EventCategoriesSection />
     <ExperienceSection/>

     


    </>



  );
}
