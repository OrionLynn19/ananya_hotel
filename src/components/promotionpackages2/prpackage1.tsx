"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const photos = [
  {
    id: 1,
    src: '/images/pr1.png',
    alt: 'Promotion Package 1',
  },
  {
    id: 2,
    src: '/images/pr2.png',
    alt: 'Promotion Package 2',
  },
  {
    id: 3,
    src: '/images/pr3.png',
    alt: 'Promotion Package 3',
  },
  {
    id: 4,
    src: '/images/pr4.png',
    alt: 'Promotion Package 4',
  },
  {
    id: 5,
    src: '/images/pr5.png',
    alt: 'Promotion Package 5',
  },
];

export default function PromoPackage1() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div 
      className="w-full mx-auto relative promo-container -mt-30 md:-mt-38 z-0"
      style={{
        height: '824px',
        opacity: 1,
      }}
    >
      <div className="relative w-full h-full">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: '.custom-next',
            prevEl: '.custom-prev',
          }}
          pagination={{
            el: '.custom-pagination',
            clickable: true,
            renderBullet: (index, className) => {
              return `<span class="${className} custom-bullet"></span>`;
            },
          }}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
          }}
          effect="fade"
          fadeEffect={{
            crossFade: true,
          }}
          loop={true}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          className="w-full h-full rounded-2xl overflow-hidden"
        >
          {photos.map((photo, index) => (
            <SwiperSlide key={photo.id}>
              <motion.div
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                className="relative w-full h-full"
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  priority={index === 0}
                  sizes="100vw"
                />
            
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent pointer-events-none" />
                
                <div 
                  className="absolute left-0 right-0 z-10 mobile-text-container"
                  style={{
                    top: '514px', 
                  }}
                >
                  <div className="text-center max-w-4xl mx-auto desktop-padding">
                   
                    <motion.h1
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="text-white promo-title"
                      style={{
                        fontFamily: 'Poltawski Nowy, serif',
                        fontWeight: 700,
                        fontSize: '48px',
                        lineHeight: '100%',
                        letterSpacing: '0px',
                        marginBottom: '32px',
                        textShadow: '0 4px 20px rgba(0,0,0,0.5), 0 2px 8px rgba(0,0,0,0.3)',
                      }}
                    >
                      Exclusive Special Offers & Packages
                    </motion.h1>
                    
                   
                    <motion.p
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, delay: 0.4 }}
                      className="text-white promo-paragraph"
                      style={{
                        fontFamily: 'Montserrat, sans-serif',
                        fontWeight: 500,
                        fontSize: '21px',
                        lineHeight: '100%',
                        letterSpacing: '0px',
                        textAlign: 'center',
                        maxWidth: '1218px',
                        margin: '0 auto',
                        textShadow: '0 2px 12px rgba(0,0,0,0.4)',
                      }}
                    >
                      Discover extraordinary experiences with our curated selection of luxury packages, each designed to create unforgettable memories.
                    </motion.p>
                  </div>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>

       
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-8 navigation-controls">
          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="custom-prev rounded-full bg-white border border-white/40 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all group"
            aria-label="Previous slide"
            style={{
              width: '64px',
              height: '64px',
              minWidth: '64px',
              minHeight: '64px',
            }}
          >
            <svg 
              className="w-7 h-7 text-black group-hover:text-gray-800 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
          </motion.button>

          
          <div className="custom-pagination flex items-center gap-3"></div>

          
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="custom-next rounded-full bg-white border border-white/40 flex items-center justify-center shadow-lg hover:bg-gray-100 transition-all group"
            aria-label="Next slide"
            style={{
              width: '64px',
              height: '64px',
              minWidth: '64px',
              minHeight: '64px',
            }}
          >
            <svg 
              className="w-7 h-7 text-black group-hover:text-gray-800 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
            </svg>
          </motion.button>
        </div>
      </div>

     
      <style jsx global>{`
        
        @import url('https://fonts.googleapis.com/css2?family=Poltawski+Nowy:wght@400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&display=swap');

        
        .custom-bullet {
          width: 20px;
          height: 20px;
          background: rgba(255, 255, 255, 0.4);
          border-radius: 50%;
          display: inline-block;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .custom-bullet:hover {
          background: rgba(255, 255, 255, 0.6);
          transform: scale(1.15);
        }

        .custom-bullet.swiper-pagination-bullet-active {
          background: rgba(255, 255, 255, 1);
          width: 21px;
          height: 21px;
          border: 2px solid rgba(255, 255, 255, 0.5);
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.6);
        }

        
        .desktop-padding {
          padding-left: 111px;
          padding-right: 111px;
        }

        
        @media (max-width: 768px) {
          .promo-container {
            width: 100% !important;
            height: 568.57px !important;
            margin-top: -120px !important;
          }

         
          .mobile-text-container {
            top: 464px  !important;
            transform: translateY(-50%);
            padding: 0 !important;
           
          }

          .desktop-padding {
            padding-left: 0 !important;
            padding-right: 0 !important;
            max-width: 100% !important;
          }

         
          .promo-title {
            font-size: 28px !important;
            line-height: 110% !important;
            margin-bottom: 16px !important;
          }

         
          .promo-paragraph {
            display: none !important;
          }

          
          .navigation-controls {
            bottom: 20px !important;
            gap: 0 !important;
          }

         
          .custom-prev,
          .custom-next {
            display: none !important;
          }

         
          .custom-bullet {
            width: 16px !important;
            height: 16px !important;
          }

          .custom-bullet.swiper-pagination-bullet-active {
            width: 17px !important;
            height: 17px !important;
          }

          /* Mobile swiper rounded corners */
          .swiper {
            border-radius: 12px !important;
          }
        }

       
        .swiper-button-next,
        .swiper-button-prev {
          display: none;
        }

        
        .swiper-slide {
          transition: opacity 0.8s ease-in-out;
        }
      `}</style>
    </div>
  );
}