import React from "react";
import SustainabilitySection from "@/components/sustainability/SustainabilitySection";
import About2 from "../../components/about2";
import HeroImage from "@/components/HeroImage";

export default function AboutUs() {
  return (
    <>
     
      
      <main className="py-12 bg-white">
        <HeroImage /> 
        <SustainabilitySection />
        <About2 />
      </main>
    </>
  );
}
