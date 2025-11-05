"use client"; 
import React, { useState } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import type { ImageItem } from '../../lib/types';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

type Props = {
  images: ImageItem[];
  title?: string;
};

export default function RoomGallery({ images, title }: Props): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  if (!images || images.length === 0) {
    return <div className="h-64 bg-gray-100 flex items-center justify-center">No images available</div>;
  }

  const hero = images[activeIndex];
  const displayThumbs = images.slice(0, 5); // Show max 5 thumbnails

  return (
    <div className="relative w-full">
      {/* Desktop View - Hero Banner with Thumbnails */}
      <div className="hidden md:block relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={hero.url}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            <Image
              src={hero.url}
              alt={hero.alt ?? title ?? 'Room image'}
              fill
              style={{ objectFit: 'cover' }}
              priority
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Dark Gradient Overlay at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />

        {/* Thumbnail Container Overlay */}
        <div 
          className="absolute left-0 right-0 pointer-events-none"
          style={{
            bottom: 0,
            height: '184.08px',
            background: 'rgba(70, 50, 20, 0.15)',
            paddingTop: '24px',
            paddingBottom: '24px',
            paddingLeft: '348px',
            paddingRight: '348px',
          }}
        >
          {/* Thumbnail Overlay */}
          <div className="flex justify-center pointer-events-auto" style={{ gap: '5.6px' }}>
            {displayThumbs.map((img, idx) => {
              const isActive = idx === activeIndex;
              return (
                <button
                  key={`thumb-${img.url}`}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    isActive 
                      ? 'ring-4 ring-white scale-105 opacity-100' 
                      : 'opacity-70 hover:opacity-90 hover:scale-105'
                  }`}
                  style={{
                    width: '138.88px',
                    height: '136.08px',
                    borderRadius: '13.44px',
                    padding: '5.6px',
                  }}
                >
                  <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                      src={img.url}
                      alt={img.alt ?? `Thumbnail ${idx + 1}`}
                      fill
                      style={{ objectFit: 'cover' }}
                      loading="lazy"
                      sizes="139px"
                    />
                  </div>
                  
                  {isActive && (
                    <div className="absolute inset-0 border-2 border-white" style={{ borderRadius: '13.44px' }} />
                  )}
                </button>
              );
            })}
          </div>

          {/* View All Images Button (if more than 5) */}
          {images.length > 5 && (
            <button
              className="mt-4 mx-auto block px-6 py-2 bg-white/90 hover:bg-white text-black font-semibold rounded-full transition-all duration-300 pointer-events-auto"
              onClick={() => {}}
            >
              View All {images.length} Photos
            </button>
          )}
        </div>
      </div>

      {/* Mobile View - Swiper */}
      <div className="md:hidden relative w-full">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={0}
          slidesPerView={1}
          className="mobile-room-swiper w-full h-[250px]"
        >
          {images.map((img, idx) => (
            <SwiperSlide key={`mobile-${img.url}`}>
              <div className="relative w-full h-full">
                <Image
                  src={img.url}
                  alt={img.alt ?? title ?? `Slide ${idx + 1}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority={idx === 0}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                  sizes="100vw"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Pagination Styles */}
      <style jsx global>{`
        .mobile-room-swiper .swiper-pagination-bullet {
          width: 16px;
          height: 16px;
          background: rgba(252, 249, 246, 0.5);
          opacity: 1;
        }
        .mobile-room-swiper .swiper-pagination-bullet-active {
          background: rgba(252, 249, 246, 1);
        }
      `}</style>
    </div>
  );
}
