# 🏨 Ananya Hotel

A full-stack hotel booking platform built with **Next.js 15** and **Supabase**. Guests can browse rooms, manage reservations through a shopping-cart flow, and apply discount coupons — all backed by a real-time PostgreSQL database.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [API Reference](#api-reference)
- [Database Schema](#database-schema)
- [Booking Flow](#booking-flow)
- [Deployment](#deployment)

---

## Features

- **Room browsing** — Filter by destination, category, and price range
- **Room detail pages** — Amenities, images, bed types, capacity, and package options
- **Cart-based booking** — Add multiple rooms to a session-persistent cart
- **Guest checkout** — Check-in / check-out dates, adult & child guest counts, special requests
- **Coupon & discount system** — Percentage or fixed-amount codes with usage limits and validity windows
- **User authentication** — Email/password sign-up and sign-in via Supabase Auth
- **Booking history** — Guests can view all past and upcoming reservations
- **Contact form** — Messages stored directly in the database
- **Rich content pages** — Gallery, dining menu, services, sustainability, culinary team, FAQ

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 15](https://nextjs.org) (App Router) |
| Language | TypeScript 5 |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Database & Auth | [Supabase](https://supabase.com) (PostgreSQL) |
| Carousel | [Swiper](https://swiperjs.com) |
| Icons | Lucide React, React Icons |
| Build | Turbopack |

---

## Project Structure

```
ananya_hotel/
├── src/
│   ├── app/
│   │   ├── api/                  # Next.js route handlers (REST API)
│   │   │   ├── auth/             # sign-up / sign-in
│   │   │   ├── rooms/            # room CRUD, categories, destinations
│   │   │   ├── bookings/         # booking CRUD, my-bookings
│   │   │   ├── booking/          # cart-based booking creation
│   │   │   ├── cart/             # session cart management
│   │   │   ├── amenities/
│   │   │   ├── coupon/
│   │   │   ├── roomavailability/
│   │   │   └── contact/
│   │   ├── booking/              # Booking UI pages (cart, payment, confirmation)
│   │   ├── rooms/                # Room listing and detail pages
│   │   ├── components/           # Page-level components
│   │   ├── data/                 # Static seed data
│   │   ├── lib/                  # Server-side helpers (dbhelper, bookingHelper, supabase)
│   │   └── types/                # Shared TypeScript types
│   ├── components/               # Shared/global components (Hero, NavBar, Footer, …)
│   └── lib/                      # Shared utilities and Supabase browser client
├── public/
│   ├── images/
│   └── videos/
├── next.config.ts
├── tsconfig.json
└── package.json
```

---

## Getting Started

### Prerequisites

- **Node.js** v18 or later
- **npm** (or another Node package manager)
- A [Supabase](https://supabase.com) project with the schema described below

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/OrionLynn19/ananya_hotel.git
cd ananya_hotel

# 2. Install dependencies
npm install

# 3. Add environment variables (see next section)
cp .env.example .env.local   # or create .env.local manually

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Environment Variables

Create a `.env.local` file in the project root with the following values:

```env
NEXT_PUBLIC_SUPABASE_URL=<your-supabase-project-url>
NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-supabase-anon-key>
```

Both values are available in your Supabase dashboard under **Project Settings → API**.

---

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server with Turbopack |
| `npm run build` | Create a production build |
| `npm start` | Run the production server |
| `npm run lint` | Run ESLint |

---

## API Reference

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/sign-up` | Register a new user |
| POST | `/api/auth/sign-in` | Log in an existing user |

### Rooms

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/rooms` | List rooms (supports `?destination`, `?category`, `?minPrice`, `?maxPrice`) |
| POST | `/api/rooms` | Create a room (admin) |
| GET | `/api/rooms/[id]` | Get a single room |
| GET | `/api/rooms/categories` | List all room categories |
| GET | `/api/rooms/destinations` | List all destinations |

### Bookings

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/bookings` | List bookings (admin) or filter by `?email` |
| POST | `/api/bookings` | Create a direct booking |
| GET | `/api/bookings/my-bookings` | Get the current user's bookings |
| GET | `/api/bookings/[id]` | Get a single booking |
| POST | `/api/booking/create` | Create a booking from the session cart |
| GET | `/api/booking/rooms` | Get rooms available for a date range |

### Cart

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/cart` | Retrieve cart items for the current session |
| POST | `/api/cart` | Add an item to the cart |
| DELETE | `/api/cart/[id]` | Remove an item from the cart |

### Other

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/amenities` | List all amenities |
| GET/POST | `/api/coupon` | Validate or apply a coupon code |
| GET | `/api/roomavailability` | Check room availability for dates |
| POST | `/api/contact` | Submit a contact message |

---

## Database Schema

The application uses a Supabase PostgreSQL database with the following core tables:

| Table | Purpose |
|---|---|
| `rooms` | Room inventory (name, price, capacity, category, destination, …) |
| `amenities` | Amenity catalogue |
| `room_amenities` | Junction table linking rooms to amenities |
| `packages` | Room packages / promotional offers |
| `bookings` | Guest reservations with pricing and status |
| `booking_amenities` | Point-in-time amenity snapshot for each booking |
| `cart_items` | Session-scoped shopping cart |
| `coupons` | Discount codes with validity, type, and usage tracking |
| `profiles` | Extended user profiles (linked to Supabase Auth) |
| `contact_messages` | Contact form submissions |

---

## Booking Flow

1. **Browse** — Guest filters and selects rooms from the catalogue
2. **Add to cart** — A session cookie is created on the first addition
3. **Cart review** — Guest reviews selected rooms and total price
4. **Sign in / Sign up** — Authentication is required to proceed to checkout
5. **Guest details** — Enter names, contact info, and special requests
6. **Coupon** — Optionally apply a discount code
7. **Payment** — Select payment method and confirm
8. **Confirmation** — Booking is created in the database and a confirmation page is shown
9. **My Bookings** — Guest can review all past and upcoming reservations

### Pricing breakdown

| Item | Calculation |
|---|---|
| Room | `room_price × nights` |
| Package | `package_price × nights` |
| Extra bed | 800 THB × nights |
| Discount | Coupon (percentage or fixed amount) |

---

## Deployment

The easiest way to deploy this application is with [Vercel](https://vercel.com):

1. Push your repository to GitHub.
2. Import the project in the [Vercel dashboard](https://vercel.com/new).
3. Add the `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variables.
4. Deploy — Vercel will run `npm run build` automatically.

For more details, see the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying).
