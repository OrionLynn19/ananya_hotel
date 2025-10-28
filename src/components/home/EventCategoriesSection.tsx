import EventCategories from "@/components/home/EventCategories";

export default function EventCategoriesSection() {
  return (
    <EventCategories
      items={[
        {
          title: "Weddings",
          blurb:
            "Beachfront vows, elegant receptions, and a dedicated team to perfect every moment.",
          imgSrc: "/images/weddings.jpg",
          imgAlt: "Beach wedding ceremony",
          href: "/events/weddings",
        },
        {
          title: "Events",
          blurb:
            "From seaside ceremonies to elegant banquets—meticulous planning, seamless execution.",
          imgSrc: "/images/events.jpg",
          imgAlt: "Ballroom celebration",
          href: "/events",
        },
        {
          title: "Workshops",
          blurb:
            "Inspiring venues with ocean views, breakout spaces, and full-service catering.",
          imgSrc: "/images/workshops.jpg",
          imgAlt: "Outdoor workshop by the beach",
          href: "/events/workshops",
        },
        {
          title: "Creators",
          blurb:
            "Picture-perfect backdrops, natural light, and production-friendly spaces.",
          imgSrc: "/images/creators.jpg",
          imgAlt: "Content creator filming brunch by the beach",
          href: "/events/creators",
        },
      ]}
      className="py-14 sm:py-20"
    />
  );
}
