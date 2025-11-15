
"use client" ;
import OurService3A from "@/components/ourService3/ourService3A";
import LookingForSection from "@/components/ourService3/LookingFor";
import OurServicesHero from "../../components/ourservice/OurServicesHero";
import OurServicesHeroMobile from "../../components/ourservice/OurServicesHeroMobile";
import OurService2 from "../../components/ourservice2";

 
export default function ourService() {
    return (
      <>
      
        <div className="block sm:hidden">
          <OurServicesHeroMobile />
        </div>
        <div className="hidden sm:block">
          <OurServicesHero />
        </div>
        <OurService2 />
        <OurService3A />
        <LookingForSection />
      </>
    );
}; 





