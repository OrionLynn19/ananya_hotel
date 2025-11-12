
"use client" ;
import OurService3A from "@/components/ourService3/ourService3A";
import LookingForSection from "@/components/ourService3/LookingFor";
import OurServicesHero from "../../components/ourservice/OurServicesHero";
import OurServicesHeroMobile from "../../components/ourservice/OurServicesHeroMobile";


 
export default function ourService() {
    return <>
        
         <div className="block sm:hidden">
          <OurServicesHeroMobile />
        </div>
        <div className="hidden sm:block">
          <OurServicesHero />
        </div>
        <OurService3A />
        <LookingForSection />
        
    </>
}; 





