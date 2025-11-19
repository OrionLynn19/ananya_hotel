"use client";
import React from "react";

type Feature = {
  key: string;
  label: string;
  value: string;
  icon: string;
};

type Props = { features: Feature[] };

export default function RoomSpecs({ features }: Props): JSX.Element {
  return (
    <div className="flex gap-4 flex-wrap mt-4" style={{ gap: "16px" }}>
      {features.map((f) => (
        <div
          key={f.key}
          className="flex items-center bg-white rounded shadow-sm feature-card"
          style={{
            width: "242px",
            height: "80px",
            borderRadius: "46px",
            border: "0.5px solid transparent",
            backgroundImage:
              "linear-gradient(white, white), linear-gradient(251.08deg, rgba(70, 50, 20, 0.2) 3.46%, #FFFFFF 51.73%, rgba(70, 50, 20, 0.2) 100%)",
            backgroundOrigin: "border-box",
            backgroundClip: "padding-box, border-box",
            paddingTop: "10px",
            paddingRight: "24px",
            paddingBottom: "10px",
            paddingLeft: "24px",
            gap: "16px",
          }}
        >
          <img
            src={f.icon}
            alt={f.label}
            className="feature-icon"
            style={{ width: "16px", height: "16px" }}
          />
          <span className="feature-label text-sm font-medium">
            {f.label}: {f.value}
          </span>
        </div>
      ))}

      <style jsx>{`
        @media (max-width: 768px) {
          .feature-card {
            width: 120px !important;
            height: 40px !important;
            border-radius: 20px !important;
            padding-top: 8px !important;
            padding-right: 12px !important;
            padding-bottom: 8px !important;
            padding-left: 12px !important;
            gap: 8px !important;
          }

          .feature-icon {
            width: 12px !important;
            height: 12px !important;
          }

          .feature-label {
            font-size: 9px !important;
            line-height: 1.2 !important;
            white-space: nowrap !important;
            overflow: hidden !important;
            text-overflow: ellipsis !important;
          }

          div[style*="gap: 16px"] {
            gap: 8px !important;
          }
        }
      `}</style>
    </div>
  );
}
