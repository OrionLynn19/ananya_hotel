import React from "react";
import WhatsNearbyMobile from "@/components/WhatsNearbyMobile";
import WhatsNearbyDesktop from "@/components/WhatsNearbyDesktop";

export const metadata = {
  title: "Discover",
};

export default function DiscoverPage() {
  return (
    <main style={{ display: "flex", justifyContent: "center" }}>
      {/* mobile */}
      <div className="w-full lg:hidden">
        <WhatsNearbyMobile />
      </div>

      {/* desktop */}
      <div className="hidden lg:block w-full">
        <WhatsNearbyDesktop />
      </div>
    </main>
  );
}
