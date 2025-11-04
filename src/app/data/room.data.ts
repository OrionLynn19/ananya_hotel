export type Room = {
  id: string;
  destination: string;
  category: "All" | "Suit Ocean Front Wing" | "Ocean Front Wing" | "Deluxe Room";
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

export const DESTINATIONS = [
  "Ananya Phuket",
  "Ananya Samui",
  "Ananya Krabi",
];

export const ROOM_TABS = [
  "All",
  "Suit Ocean Front Wing",
  "Ocean Front Wing",
  "Deluxe Room",
];

export const ROOMS: Room[] = [
  {
    id: "r1",
    destination: "Ananya Phuket",
    category: "Suit Ocean Front Wing",
    wingLabel: "Suite Ocean Front Wing",
    title: "Suite Ocean Front Room",
    size: "33 sqm.",
    idealFor: "2 adults and 1 child or 3 adults",
    bedTypes: "King or twin beds",
    interconnect: true,
    amenities: ["Parking", "Wifi", "Sea View", "Breakfast"],
    price: 499,
    image: "/images/rooms/suite-ocean-front.jpg",
  },
  {
    id: "r2",
    destination: "Ananya Phuket",
    category: "Ocean Front Wing",
    wingLabel: "Ocean Front Wing",
    title: "Ocean Front Room",
    size: "33 sqm.",
    idealFor: "2 adults and 1 child or 3 adults",
    bedTypes: "King or twin beds",
    interconnect: true,
    amenities: ["Parking", "Wifi", "Sea View", "Breakfast"],
    price: 499,
    image: "/images/rooms/ocean-front.jpg",
  },
  
];
