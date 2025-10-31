import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="relative w-full overflow-hidden">
      <Image
        src="/Images/wallpaper.png"     
        alt="About Ananya"
        width={1920}
        height={1080}
        className="block w-full h-auto object-contain"
        priority
      />
    </div>
  );
}
