"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: string | null;            
  options: string[];               
  onChange: (v: string | null) => void;
};

const pretty = (s: string) => s.replace(/^Ananya\s+/i, "").trim();

export default function DestinationPicker({ value, options, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!rootRef.current) return;
      if (!rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const title = value ? pretty(value) : "Pick a Destination";

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className={[
          "flex items-center justify-between gap-3 rounded-full",
          "bg-[#4a331a] text-white px-6 py-2.5 text-[15px] font-semibold",
          "shadow-[0_6px_20px_rgba(0,0,0,0.18)] ring-1 ring-black/10",
          "transition-all duration-300",
          open ? "translate-y-[-1px] shadow-[0_10px_28px_rgba(0,0,0,0.22)]" : "hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,0,0,0.2)]",
          "min-w-[230px]"
        ].join(" ")}
      >
        <span>{title}</span>
        <span aria-hidden className={`inline-block transition-transform duration-300 ${open ? "rotate-180" : ""}`}>▾</span>
      </button>

      {open && (
        <div role="listbox" tabIndex={-1} className="absolute left-0 right-0 z-30 mt-2 origin-top animate-[picker-pop_180ms_ease-out]">
          <ul className="flex flex-col gap-2">
            
            {options.map((opt, i) => (
              <li key={opt}>
                <button
                  type="button"
                  role="option"
                  aria-selected={opt === value}
                  onClick={() => { onChange(opt); setOpen(false); }}
                  className={[
                    "w-full rounded-full px-6 py-2.5 text-[15px] font-semibold",
                    "bg-[#4a331a] text-white shadow-md ring-1 ring-black/10",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_rgba(0,0,0,0.22)]",
                    opt === value ? "opacity-100" : "opacity-95 hover:opacity-100"
                  ].join(" ")}
                  style={{ animation: `item-fade 240ms ease-out both`, animationDelay: `${80 + i * 60}ms` }}
                >
                  {pretty(opt)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      <style jsx>{`
        @keyframes picker-pop {
          0%   { opacity: 0; transform: translateY(-6px) scale(0.98); }
          100% { opacity: 1; transform: translateY(0)    scale(1); }
        }
        @keyframes item-fade {
          0%   { opacity: 0; transform: translateY(-6px); }
          100% { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
