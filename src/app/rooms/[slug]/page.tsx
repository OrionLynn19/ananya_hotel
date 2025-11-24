import { notFound } from "next/navigation";
import { Metadata } from "next";
import RoomGallery from "../../components/room_detail/RoomGallery";
import RoomSpecs from "../../components/room_detail/RoomSpecs";
import FacilitiesGrid from "../../components/room_detail/FacilitiesGrid";
import BookNowButton from "../../components/room_detail/BookNowButton";

type Props = {
  params: Promise<{ slug: string }>;
};

// Fetch room from API
async function getRoomById(id: string) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/rooms/${id}`,
      {
        cache: 'no-store', // or 'force-cache' for static generation
      }
    );
    
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error('Error fetching room:', error);
    return null;
  }
}

// Fetch all rooms for static generation
async function getAllRooms() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/rooms`,
      {
        cache: 'force-cache',
      }
    );
    
    if (!res.ok) return [];
    return await res.json();
  } catch (error) {
    console.error('Error fetching rooms:', error);
    return [];
  }
}

// Generate static params for all rooms
export async function generateStaticParams() {
  const rooms = await getAllRooms();
  return rooms.map((room: any) => ({
    slug: room.id.toString(),
  }));
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = await getRoomById(slug);

  if (!room) {
    return {
      title: "Room Not Found",
    };
  }

  return {
    title: `${room.name} — ANANYA`,
    description: room.description?.slice(0, 150) || `Book ${room.name} at ANANYA Hotel`,
  };
}

// Helper function to map amenity names to icons
function getIconForAmenity(name: string): string {
  const iconMap: Record<string, string> = {
    'Parking': '/images/fac1.png',
    'Wifi': '/images/fac2.png',
    'Sea View': '/images/fac3.png',
    'Breakfast': '/images/fac4.png',
    'Pool': '/images/fac2.png',
    'Rain Shower': '/images/fac4.png',
  };
  
  return iconMap[name] || '/images/fac1.png';
}

// Helper to map amenity names to feature icons
function getFeatureIcon(label: string): string {
  const iconMap: Record<string, string> = {
    'Room Size': '/images/construction.png',
    'Ideal For': '/images/user.png',
    'Bed Type(s)': '/images/construction.png',
    'Capacity': '/images/user.png',
    'Number of Beds': '/images/construction.png',
    'Inter-connecting Rooms': '/images/construction.png',
  };
  
  return iconMap[label] || '/images/construction.png';
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = await getRoomById(slug);

  if (!room) {
    notFound();
  }

  // Map API data to component format for RoomSpecs
  const features = [
    { key: "size", label: "Room Size", value: room.size, icon: getFeatureIcon("Room Size") },
    { key: "ideal", label: "Ideal For", value: room.ideal_for, icon: getFeatureIcon("Ideal For") },
    { key: "beds", label: "Bed Type(s)", value: room.bed_types, icon: getFeatureIcon("Bed Type(s)") },
    { key: "capacity", label: "Capacity", value: `${room.capacity} guests`, icon: getFeatureIcon("Capacity") },
    { key: "numbeds", label: "Number of Beds", value: `${room.beds} bed(s)`, icon: getFeatureIcon("Number of Beds") },
  ];

  if (room.interconnect) {
    features.push({ 
      key: "interconnect", 
      label: "Inter-connecting Rooms", 
      value: "Available",
      icon: getFeatureIcon("Inter-connecting Rooms")
    });
  }

  // Map amenities to facilities format
  const facilities = room.amenities.map((amenity: any) => ({
    id: amenity.name.toLowerCase().replace(/\s+/g, '_'),
    name: amenity.name,
    icon: getIconForAmenity(amenity.name),
  }));

  // Convert image URL to array format for gallery
  const images = room.image_url 
    ? [{ url: room.image_url, alt: room.name }]
    : [{ url: '/images/placeholder.jpg', alt: room.name }];

  return (
    <main className="w-full">
      <RoomGallery images={images} title={room.name} />

      <section className="w-full px-4 py-8 md:px-8 lg:px-16">
        <div className="w-full mb-8">
          <div className="flex justify-between items-start mb-4 flex-wrap gap-4">
            <div className="flex-1">
              <h1
                className="text-2xl md:text-3xl font-semibold"
                style={{ color: "var(--text-color, rgba(70, 50, 20, 1))" }}
              >
                {room.name}
              </h1>
              
              {/* Additional info tags */}
              <div className="mt-4 flex gap-3 flex-wrap">
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#fffaf1] border border-[#d8c8ae] text-sm font-medium">
                  📍 {room.destination}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#fffaf1] border border-[#d8c8ae] text-sm font-medium">
                  🏢 {room.category}
                </span>
                <span className="inline-flex items-center px-4 py-2 rounded-full bg-[#fffaf1] border border-[#d8c8ae] text-sm font-medium">
                  {room.wing_label}
                </span>
              </div>
            </div>
            
            <div className="text-right">
              <p className="text-3xl md:text-4xl font-bold text-[#3b2a16]">
                ${room.price}
                <span className="text-sm md:text-base font-normal text-gray-600 ml-1">/night</span>
              </p>
            </div>
          </div>
          
          {room.description && (
            <p className="mt-6 text-gray-700 leading-relaxed text-base md:text-lg">
              {room.description}
            </p>
          )}
        </div>

        <div className="w-full">
          {/* Room Specifications */}
          <div className="mb-8">
            <h2
              className="text-xl md:text-2xl font-semibold mb-4"
              style={{ color: "var(--text-color, rgba(70, 50, 20, 1))" }}
            >
              Room Specifications
            </h2>
            <RoomSpecs features={features} />
          </div>

          {/* Facilities & Amenities */}
          <div className="mt-12">
            <h2
              className="text-xl md:text-2xl font-semibold mb-6"
              style={{ color: "var(--text-color, rgba(70, 50, 20, 1))" }}
            >
              Facilities & Amenities
            </h2>
            <FacilitiesGrid items={facilities} />
          </div>

          {/* Book Now Button */}
          <div className="flex justify-center mt-12">
            <BookNowButton roomId={room.id} />
          </div>
        </div>
      </section>
    </main>
  );
}
