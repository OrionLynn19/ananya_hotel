export type Room = {
  id: string;
  destination: string;
  category: "All" | "Suite Ocean Front Wing" | "Ocean Front Wing" | "Deluxe Room";
  wingLabel: string;
  title: string;
  size: string;
  idealFor: string;
  bedTypes: string;
  interconnect?: boolean;
  amenities: Array<"Parking" | "Wifi" | "Sea View" | "Breakfast">;
  price: number;
  image: string;
};

export const DESTINATIONS = ["Phuket", "Pattaya", "Hua Hin"];

export const ROOM_TABS = [
  "All",
  "Suite Ocean Front Wing",
  "Ocean Front Wing",
  "Deluxe Room",
];

export const ROOMS: Room[] = [
  {
    id: "r1",
    destination: "Phuket",
    category: "Suite Ocean Front Wing",
    wingLabel: "Suite Ocean Front Wing",
    title: "Suite Ocean Front Room",
    size: "33 sqm.",
    idealFor: "2 adults and 1 child or 3 adults",
    bedTypes: "King or twin beds",
    interconnect: true,
    amenities: ["Parking", "Wifi", "Sea View", "Breakfast"],
    price: 499,
    image: "/images/Suite.jpg",
  },
  {
    id: "r2",
    destination: "Phuket",
    category: "Ocean Front Wing",
    wingLabel: "Ocean Front Wing",
    title: "Ocean Front Room",
    size: "33 sqm.",
    idealFor: "2 adults and 1 child or 3 adults",
    bedTypes: "King or twin beds",
    interconnect: true,
    amenities: ["Parking", "Wifi", "Sea View"],
    price: 499,
    image: "/images/Ocean.jpg",
  },
  {
    id: "r3",
    destination: "Pattaya", // fixed
    category: "Ocean Front Wing",
    wingLabel: "Ocean Front Wing",
    title: "Ocean Front Room",
    size: "33 sqm.",
    idealFor: "2 adults and 1 child or 3 adults",
    bedTypes: "King or twin beds",
    interconnect: true,
    amenities: ["Parking", "Wifi", "Sea View"],
    price: 499,
    image: "/images/Ocean1.jpg",
  },
  {
    id: "r4",
    destination: "Pattaya",
    category: "Suite Ocean Front Wing", // fixed
    wingLabel: "Suite Ocean Front Wing",
    title: "Suite Ocean Front Room",
    size: "33 sqm.",
    idealFor: "2 adults and 1 child or 3 adults",
    bedTypes: "King or twin beds",
    interconnect: true,
    amenities: ["Parking", "Wifi", "Sea View", "Breakfast"],
    price: 599,
    image: "/images/Suite1.jpg",
  },
  {
    id: "r5",
    destination: "Hua Hin",
    category: "Deluxe Room", // moved to correct tab
    wingLabel: "Deluxe Room",
    title: "Deluxe Room",
    size: "33 sqm.",
    idealFor: "2 adults and 1 child or 3 adults",
    bedTypes: "King or twin beds",
    interconnect: true,
    amenities: ["Parking", "Wifi", "Sea View", "Breakfast"],
    price: 499,
    image: "/images/Delux Room1.jpg",
  },
  {
    id: "r6",
    destination: "Hua Hin",
    category: "Deluxe Room",
    wingLabel: "Deluxe Room",
    title: "Deluxe Room",
    size: "33 sqm.",
    idealFor: "2 adults and 1 child or 3 adults",
    bedTypes: "King or twin beds",
    interconnect: true,
    amenities: ["Parking", "Wifi", "Sea View", "Breakfast"],
    price: 399,
    image: "/images/Delux Room2.jpg",
  },
];
