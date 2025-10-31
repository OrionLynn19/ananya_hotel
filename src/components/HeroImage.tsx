// src/components/HeroImage.tsx
import Image from "next/image";

export default function HeroImage() {
  return (
    <section className="relative w-full h-[90vh] overflow-hidden">
      <Image
        src="/Images/wallpaper.png"   
        alt="Hero"
        fill
        className="object-cover object-center"
        priority
      />
    </section>
  );
}
