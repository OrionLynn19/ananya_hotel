import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/NavBar";
import Footer from "./components/Footer";

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
        <Navbar />
        <main className="flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
