"use client";
import OurServicesHero from "../../components/ourservice/OurServicesHero";
import OurServicesHeroMobile from "../../components/ourservice/OurServicesHeroMobile";

export default function OurService() {
  return (
    <main>
      {/* ourservice hero par*/}
      <>
        <div className="block sm:hidden">
          <OurServicesHeroMobile />
        </div>
        <div className="hidden sm:block">
          <OurServicesHero />
        </div>
      </>
    </main>
  );
}
