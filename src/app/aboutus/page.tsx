
import React from "react";
import SustainabilitySection from "@/components/sustainability/SustainabilitySection";
import About2 from "../../components/about2";
import HeroImage from "@/components/HeroImage";
import About_us3 from "../components/About_us3/About_us3";

export default function AboutUs() {
  return (
    <>
     
      
      <main className="py-12 bg-white">
        <HeroImage /> 
        <SustainabilitySection />
        <About2 />
        <About_us3/>
      </main>
    </>
  );
}

