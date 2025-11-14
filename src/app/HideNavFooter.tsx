"use client";

import { usePathname } from "next/navigation";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

export default function HideNavFooter({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isBookingPage = pathname.startsWith("/booking");

  if (isBookingPage) {
    
    return <>{children}</>;
  }

  
  return (
    <>
      <Navbar />
      <main className="flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
