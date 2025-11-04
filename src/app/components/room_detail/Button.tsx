"use client";
import React from 'react';

export default function BookNowButton(): JSX.Element {
  return (
    <>
      <button
        className="book-now-btn hover:scale-105"
        style={{
          width: '261px',
          height: '82px',
          borderRadius: '24px',
          border: '1px solid ',
          backgroundImage: 'linear-gradient(white, white), linear-gradient(251.08deg, rgba(70, 50, 20, 0.2) 3.46%, #FFFFFF 51.73%, rgba(70, 50, 20, 0.2) 100%)',
          backgroundOrigin: 'border-box',
          backgroundClip: 'padding-box, border-box',
          paddingTop: '15px',
          paddingRight: '35px',
          paddingBottom: '15px',
          paddingLeft: '35px',
          color: 'rgba(70, 50, 20, 1)',
          fontWeight: '600',
          fontSize: '24px',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
        }}
      >
        Book Now
      </button>

      <style jsx>{`
        @media (max-width: 768px) {
          .book-now-btn {
            width: 102px !important;
            height: 34px !important;
            border-radius: 8px !important;
            padding-top: 8px !important;
            padding-right: 18px !important;
            padding-bottom: 8px !important;
            padding-left: 18px !important;
            font-size: 10px !important;
          }
        }
      `}</style>
    </>
  );
}