// components/customersData.ts

export type Customer = {
  id: number;
  name: string;
  avatar: string;
  quote: string;
};

export const customers: Customer[] = [
  {
    id: 1,
    name: "Emily Myer",
    avatar: "/images/customers/emily.jpg",
    quote:
      "An absolutely unforgettable hotel experience, with luxurious accommodations and impeccable service that exceeded all expectations!",
  },
  {
    id: 2,
    name: "James Carter",
    avatar: "/images/customers/james.jpg",
    quote:
      "The perfect escape. Beautiful ocean views, warm staff, and attention to every little detail. I can’t wait to come back.",
  },
  {
    id: 3,
    name: "Ava Thompson",
    avatar: "/images/customers/ava.jpg",
    quote:
      "From check-in to checkout, everything was flawless. This felt more like a private sanctuary than a hotel.",
  },
  {
    id: 4,
    name: "Oliver Bennett",
    avatar: "/images/customers/oliver.jpg",
    quote:
      "Hands down the best stay I’ve ever had. Luxury, comfort, and genuine hospitality in one place.",
  },
];
