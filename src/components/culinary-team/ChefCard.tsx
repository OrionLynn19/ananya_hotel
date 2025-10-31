"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export type Chef = {
    id: string;
    name: string;
    description: string;
    image: string;
};

type ChefCardProps = {
    chef: Chef;
    isActive: boolean;
    onActivate: () => void;
    onDeactivate: () => void;
};

export default function ChefCard({
    chef,
    isActive,
    onActivate,
    onDeactivate,
}: ChefCardProps) {
    return (
        <motion.div
            layout
            onMouseEnter={onActivate}
            onMouseLeave={onDeactivate}
            onClick={onActivate}
            transition={{ type: "spring", stiffness: 250, damping: 25 }}
            className={`
                relative rounded-[16px] overflow-hidden flex-shrink-0 cursor-pointer
                ${isActive ? "w-[700px] h-[594px] z-10" : "w-[236px] h-[594px]"}
            `}
        >
            {/* image */}
            <motion.div
                className="absolute inset-0"
                animate={{ scale: isActive ? 1.08 : 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <Image
                    src={chef.image ?? "/placeholder.png"}
                    alt={chef.name}
                    width={360}
                    height={594}
                    className="w-full h-full object-cover"
                />
            </motion.div>

            {/* overlay */}
            <motion.div
                className={`
                    absolute inset-x-0 bottom-0 bg-black/80 text-white
                    flex flex-col items-center justify-center text-center
                    px-6
                `}
                animate={{ height: isActive ? 150 : 120 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
            >
                <p className="font-semibold text-2xl leading-tight">{chef.name}</p>

                {isActive && (
                    <motion.p
                        className="mt-3 text-sm md:text-base text-left text-white/90 leading-snug w-full"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.25 }}
                    >
                        {chef.description}
                    </motion.p>
                )}
            </motion.div>
        </motion.div>
    );
}
