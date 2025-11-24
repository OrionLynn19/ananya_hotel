import EventCategories from "@/components/home/EventCategories";

export default function EventCategoriesSection() {
  return (
    <EventCategories
      items={[
        {
          title: "Weddings",
          blurb:
            "Celebrate your special day with us. Our dedicated team ensures every detail is perfect, from beachfront ceremonies to elegant receptions.",
          imgSrc: "/images/weddings.jpg",
          imgAlt: "Beach wedding ceremony",
          href: "/events/weddings",
        },
        {
          title: "Events",
          blurb:
            "Celebrate your special day with us. Our dedicated team ensures every detail is perfect, from beachfront ceremonies to elegant receptions.",
          imgSrc: "/images/events.jpg",
          imgAlt: "Ballroom celebration",
          href: "/events",
        },
        {
          title: "Workshops",
          blurb:
            "Celebrate your special day with us. Our dedicated team ensures every detail is perfect, from beachfront ceremonies to elegant receptions.",
          imgSrc: "/images/workshops.jpg",
          imgAlt: "Outdoor workshop by the beach",
          href: "/events/workshops",
        },
        {
          title: "Creators",
          blurb:
            "Celebrate your special day with us. Our dedicated team ensures every detail is perfect, from beachfront ceremonies to elegant receptions.",
          imgSrc: "/images/creators.jpg",
          imgAlt: "Content creator filming brunch by the beach",
          href: "/events/creators",
        },
      ]}
      className="py-14 sm:py-20"
    />
  );
}
