import type { Metadata } from "next";
import "./globals.css";
import "swiper/css";
import "swiper/css/effect-coverflow"; // Crucial for the 3D depth effect
import "swiper/css/pagination";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";
import HideNavFooter from "./HideNavFooter";

export const metadata: Metadata = {
  title: "ANANYA HOTEL",
  description: "Hotel Project",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-dvh flex flex-col bg-white text-neutral-900">
        <HideNavFooter>{children}</HideNavFooter>
      </body>
    </html>
  );
}
