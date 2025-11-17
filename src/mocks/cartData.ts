export const CART_DATA = {
  items: [
    {
      id: "room-1",
      title: "Superior Comfort",
      image: "room1.1.png",
      beds: ["Twin Bed"],
      extraBed: true,
      persons: 3,
      quantity: 1,
      pricePerNight: 1300,
      startDate: "2025-09-25",
      endDate: "2025-09-28",
      nights: 3,
      location: "Hua Hin",
    },
    {
      id: "room-2",
      title: "Urban Nest",
      image: "room1.2.png",
      beds: ["Twin Bed"],
      extraBed: false,
      persons: 2,
      quantity: 1,
      pricePerNight: 1800,
      startDate: "2025-09-25",
      endDate: "2025-09-28",
      nights: 3,
      location: "Hua Hin",
    },
    {
      id: "room-3",
      title: "Gallery Suite",
      image: "Suite.jpg",
      beds: ["Single Bed"],
      extraBed: false,
      persons: 3,
      quantity: 1,
      pricePerNight: 7200,
      startDate: "2025-09-25",
      endDate: "2025-09-28",
      nights: 3,
      location: "Hua Hin",
    },
  ],
  summary: {
    totalGuests: "4 Adults",
    totalCost: 40800,
  },
};

export function getCartData() {
  return CART_DATA;
}
