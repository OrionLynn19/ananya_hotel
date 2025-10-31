export type Customer = {
  name: string;
  quote: string;
  avatar: string;
};

export const customers: Customer[] = [
  {
    name: "Emily Myer",
    quote:
      "An absolutely unforgettable hotel experience, with luxurious accommodations and impeccable service that exceeded all expectations!",
    avatar: "/images/customer2.jpg",
  },
  {
    name: "James Carter",
    quote:
      "The perfect escape. Beautiful ocean views, warm staff, and attention to every little detail. I can’t wait to come back.",
    avatar: "/images/customer1.jpg",
  },
  {
    name: "Ava Thompson",
    quote:
      "From check-in to checkout, everything was flawless. This felt more like a private sanctuary than a hotel.",
    avatar: "/images/customer3.jpg",
  },
  {
    name: "Oliver Bennett",
    quote:
      "Hands down the best stay I’ve ever had. Luxury, comfort, and genuine hospitality in one place.",
    avatar: "/images/customer4.jpg",
  },
];
