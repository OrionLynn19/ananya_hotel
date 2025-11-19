export const ROOMS_DATA = [
  {
    id: "r1",
    title: "Superior Comfort",
    images: ["room1.1.png", "room1.2.png", "room1.3.png"],
    pricePerNight: 1300,
    oldPricePerNight: 0,
    pointsPrice: 23450,
    size: "23-29m²",
    maxGuests: 3,
    beds: ["Twin Bed"],
    amenities: ["Free Wifi", "Parking Available", "Swimming Pool"],
    description: "Comfortable room with ocean view and modern amenities.",
  },
  {
    id: "r2",
    title: "Urban Nest",
    images: ["room1.2.png", "room1.3.png", "room1.4.png"],
    pricePerNight: 1800,
    oldPricePerNight: 0,
    pointsPrice: 23450,
    size: "28-34m²",
    maxGuests: 2,
    beds: ["Twin Bed"],
    amenities: ["Free Wifi", "Pet Friendly", "Sea View"],
    description: "Cozy urban-style room with elegant furnishings.",
  },
  {
    id: "r3",
    title: "Gallery Suite",
    images: ["Suite.jpg", "Suite1.jpg"],
    pricePerNight: 7200,
    oldPricePerNight: 2900,
    pointsPrice: 50000,
    size: "60m²",
    maxGuests: 4,
    beds: ["Single Bed"],
    amenities: ["Swimming Pool", "Spa", "Free Wifi"],
    description: "Spacious suite with private balcony and premium services.",
  },
];

export function getRooms() {
  return ROOMS_DATA;
}

export function getRoomById(id: string) {
  return ROOMS_DATA.find((r) => r.id === id) ?? null;
}
