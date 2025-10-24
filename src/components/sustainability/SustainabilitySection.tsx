import SustainabilityShowcase, { SustainabilityItem } from "./SustainabilityShowcase";
export default function SustainabilitySection() {
  const items: SustainabilityItem[] = [
  {
    title: "Growing life",
    focusTitle: "Growing life 🌱",
    blurb:
      "Celebrate your special day with us. Our dedicated team ensures every detail is perfect, from beachfront ceremonies to elegant receptions.",
    imgSrc: "/images/susImage1.jpg",
    imgAlt: "Coastal resort with trees and people on the beach",
    focus: "object-bottom",
  },
  {
    title: "Living responsibly",
    focusTitle: "Living responsibly 🌍",
    blurb:
      "Celebrate your special day with us. Our dedicated team ensures every detail is perfect, from beachfront ceremonies to elegant receptions.",
    imgSrc: "/images/susImage2.jpg",
    imgAlt: "Solar panels and fresh produce",
    focus: "object-top",
  },
  {
    title: "Protecting the beach",
    focusTitle: "Protecting the beach 🌊",
    blurb:
      "Celebrate your special day with us. Our dedicated team ensures every detail is perfect, from beachfront ceremonies to elegant receptions.",
    imgSrc: "/images/susImage3.jpg",
    imgAlt: "Beach and resort at sunset",
    focus: "object-center",
  },
];

  return (
    <section className="mx-auto max-w-7xl py-10 md:py-16">
      <header className="mx-auto mb-10 md:mb-12 max-w-3xl text-center">
        <h2 className="text-[18px] font-[700] md:text-[48px] text-[#463214]">
          Sustainability at Heart
        </h2>
        <p className="mt-4 text-[14px] md:text-[24px] text-[#463214]/90">
          At ANANYA, we're committed to creating a stay that's as kind to nature as it is
          comfortable for you.
        </p>
      </header>

      <SustainabilityShowcase
        items={items}
        cardHeightPx={550}
        gapClass="md:gap-5"
      />
    </section>
  );
}
