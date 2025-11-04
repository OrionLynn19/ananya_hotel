import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import RoomGallery from '../../components/room_detail/RoomGallery';
import RoomSpecs from '../../components/room_detail/RoomSpecs';
import FacilitiesGrid from '../../components/room_detail/FacilitiesGrid';
import BookNowButton from '../../components/room_detail/BookNowButton';
import { listRoomSlugs, readRoomBySlug } from '../../lib/data';

type Props = {
  params: Promise<{ slug: string }>;
};

// Generate static params for all rooms (replaces getStaticPaths)
export async function generateStaticParams() {
  const slugs = listRoomSlugs();
  return slugs.map((slug) => ({
    slug: slug,
  }));
}

// Generate metadata (replaces Head component)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const room = readRoomBySlug(slug);
  
  if (!room) {
    return {
      title: 'Room Not Found',
    };
  }

  return {
    title: `${room.title} — ANANYA`,
    description: room.description.slice(0, 150),
  };
}

export default async function RoomPage({ params }: Props) {
  const { slug } = await params;
  const room = readRoomBySlug(slug);

  if (!room) {
    notFound();
  }

  return (
    <main className="w-full">
      
      <RoomGallery images={room.images} title={room.title} />
      
      
      <section className="w-full px-4 py-8 md:px-8 lg:px-16">
        
        <div className="w-full mb-8">
          <h1 
            className="text-2xl md:text-3xl font-semibold"
            style={{ color: 'var(--text-color, rgba(70, 50, 20, 1))' }}
          >
            {room.title}
          </h1>
          <p className="mt-4 text-gray-700 leading-relaxed">{room.description}</p>
        </div>

        <div className="w-full">
          <div className="mb-6">
            <RoomSpecs features={room.features} />
          </div>

          <div className="mt-8">
            <h2 
              className="text-xl font-medium mb-4"
              style={{ color: 'var(--text-color, rgba(70, 50, 20, 1))' }}
            >
              Facilities
            </h2>
            <FacilitiesGrid items={room.facilities} />
          </div>

          {/* Button below facilities */}
          <div className="flex justify-center mt-12">
            <BookNowButton />
          </div>
        </div>
      </section>
    </main>
  );
}
