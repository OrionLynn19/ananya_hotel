"use client";

type Props = {
  value: string;
  options: string[];
  onChange: (v: string) => void;
};

export default function DestinationPicker({ value, options, onChange }: Props) {
  return (
    <label className="inline-flex items-center gap-2 rounded-full bg-[#3b2a16] text-white px-4 py-2 text-[13px]">
      <span className="opacity-90">Pick a Destination</span>
      <span className="text-white/40">•</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="bg-transparent text-[13px] outline-none appearance-none cursor-pointer pr-6"
      >
        {options.map(opt => (
          <option key={opt} value={opt} className="text-black">
            {opt}
          </option>
        ))}
      </select>
      {/* caret */}
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="h-4 w-4 -ml-4 pointer-events-none"
      >
        <path d="M7 10l5 5 5-5" stroke="white" strokeWidth="2" fill="none" />
      </svg>
    </label>
  );
}
