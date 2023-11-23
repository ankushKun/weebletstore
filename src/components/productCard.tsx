import Image from "next/image"
import { StaticImageData } from "next/image"
import { Button } from "@mantine/core"

export default function ProductCard({ src, alt, title, price }: { src: StaticImageData, alt: string, title: string, price: number }) {
    return <div className=" flex flex-col items-center justify-center cursor-pointer w-fit mx-auto rounded-lg ring-white/40 hover:ring-1 transition-all duration-150 p-3">
        <Image src={src} alt={alt} width={200} height={200} className="hover:scale-105 transition-transform duration-150" />
        <div className="text-xl text-white">{title}</div>
        <div className="flex justify-between w-[98%]">
            <div className="text-xl text-white"><span className="line-through mr-2 text-white/50">₹50</span>₹{price}</div>
            <Button>+Add</Button>
        </div>
    </div>
}