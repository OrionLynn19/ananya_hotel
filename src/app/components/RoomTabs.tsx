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
              "rounded-full border px-4 py-2 text-[12px] md:text-[13px]",
              isActive
                ? "border-[#3b2a16] bg-[#efe6db] text-[#3b2a16]"
                : "border-[#e7dccd] bg-white text-[#4a3a24] hover:bg-[#faf4ec]"
            ].join(" ")}
          >
            {tab}
          </button>
        );
      })}
    </div>
  );
}
