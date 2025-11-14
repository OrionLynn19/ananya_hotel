// src/app/data/faq.data.ts

export type FaqRow = {
  question: string;
  answer: string;
};

export const FAQ_DATA: FaqRow[] = [
  {
    question: "What are the check-in and check-out times?",
    answer:
      "Check-in is from 2:00 PM and check-out is until 12:00 PM. Early check-in or late check-out may be available upon request depending on room availability.",
  },
  {
    question: "Do you offer airport transfers?",
    answer:
      "Yes, we provide airport transfer services. Please contact us 24 hours before arrival to arrange transportation.",
  },
  {
    question: "What amenities are included in the rooms?",
    answer:
      "Rooms include premium bedding, high-speed Wi-Fi, minibar, coffee maker, and complimentary bathroom amenities.",
  },
  {
    question: "How do I contact the hotel directly?",
    answer:
      "You can contact us through the Contact page or call our 24/7 reception hotline for assistance.",
  },
  {
    question: "Are there nearby attractions or activities?",
    answer:
      "Yes, guests can enjoy beach activities, local tours, nature trails, shopping areas, and cultural landmarks near the resort.",
  },
];
