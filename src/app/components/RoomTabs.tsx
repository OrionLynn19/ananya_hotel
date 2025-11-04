"use client";

type Props = {
  tabs: string[];
  active: string;
  onChange: (tab: string) => void;
};

export default function RoomTabs({ tabs, active, onChange }: Props) {
  return (
    <div className="flex flex-wrap gap-3">
      {tabs.map((tab) => {
        const isActive = tab === active;
        return (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={[
              "rounded-full px-5 py-2.5 text-[13px] md:text-[14px] font-semibold transition-all duration-300",
              "shadow-[0_2px_6px_rgba(0,0,0,0.05)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.12)] hover:-translate-y-0.5 hover:scale-[1.03]",
              isActive
                ? "bg-[#4a331a] text-white"
                : "bg-white text-[#4a3a24] border border-[#e8e0d2] hover:bg-[#f5ede2]"
            ].join(" ")}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
