"use client";
import Image from "next/image";

interface RoomCardsProps {
    image: string;
    name: string;
    description: string;
}
export default function RoomCards({ image, name, description }: RoomCardsProps) {
    return (
        <div className="bg-[#fcf9f6]/80 h-auto min-h-[350px] md:min-h-[400px] md:h-[530px] min-[375px]:w-[270px] min-[391px]:w-[300px] min-[340px]:w-[245px] md:w-[360px] lg:w-[390px] mx-auto md:rounded-4xl rounded-lg p-3 md:p-5">            <div>
            <Image
                src={image}
                alt={name}
                width={350}
                height={200}
                className="w-full h-[150px] md:h-[200px] md:rounded-2xl rounded-lg object-cover items-center"
            />
        </div>
            <div className="mt-2 md:mt-4">
                <h3 className="font-bold text-lg md:text-2xl font-poltawski text-[#463214]">{name}</h3>
                <p className="font-montserrat text-sm md:text-lg font-medium text-[#000000] mt-1">{description}</p>
            </div>
        </div>

    )
} 