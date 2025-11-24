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

