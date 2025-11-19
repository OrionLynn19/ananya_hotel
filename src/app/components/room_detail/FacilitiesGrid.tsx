"use client";
import React from "react";
import Image from "next/image";
import { Facility } from "../../../lib/types";

type Props = { items: Facility[] };

export default function FacilitiesGrid({ items }: Props): React.ReactElement {
  return (
    <div className="flex flex-wrap facility-grid" style={{ gap: "48px" }}>
      {items.map((it) => (
        <div key={it.id} className="flex flex-col items-center facility-item">
          <div
            className="relative overflow-hidden rounded shadow-sm facility-image"
            style={{
              width: "185px",
              height: "185px",
              borderRadius: "16px",
            }}
          >
            <Image
              src={it.icon}
              alt={it.name}
              fill
              style={{ objectFit: "cover" }}
              sizes="185px"
            />
          </div>
          <div
            className="text-center mt-2 px-2 facility-name"
            style={{
              width: "185px",
              color: "rgba(70, 50, 20, 1)",
              fontSize: "24px",
              fontWeight: "700",
            }}
          >
            {it.name}
          </div>
        </div>
      ))}

      {/* Mobile-specific styles */}
      <style jsx>{`
        @media (max-width: 768px) {
          .facility-grid {
            gap: 4px !important;
          }

          .facility-item {
            padding: 4px;
          }

          .facility-image {
            width: 66px !important;
            height: 66px !important;
            border-radius: 8px !important;
          }

          .facility-name {
            width: 66px !important;
            font-size: 8px !important;
            font-weight: 600 !important;
            margin-top: 4px !important;
            padding: 0 2px !important;
            line-height: 1.2 !important;
          }
        }
      `}</style>
    </div>
  );
}
