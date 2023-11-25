import Image from "next/image"
import { StaticImageData } from "next/image"
import { Button } from "@mantine/core"
import { IconShoppingCartPlus as AddCart } from "@tabler/icons-react"
import toast from "react-hot-toast"
import kroniBuffer from "@/assets/kroni-buffer.gif"
import { useState } from "react"

export default function ProductCard({ src, alt, title, price, id }: { src: StaticImageData | string, alt: string, title: string, price: number, id: string }) {
    const [loaded, setLoaded] = useState(true)

    function addToCart() {
        const cart = JSON.parse(localStorage.getItem("cart") || "{}")
        cart[id] = cart[id] ? cart[id] + 1 : 1
        localStorage.setItem("cart", JSON.stringify(cart))
        window.dispatchEvent(new Event("storage"))
        toast.success("Added to cart")
    }

    return <div className="flex flex-col min-w-max items-center justify-center cursor-pointer w-fit mx-auto rounded-lg ring-white/40 hover:ring-1 transition-all duration-150 p-3">

        <Image src={src} alt={alt} width={269} height={269} className={`hover:scale-105 transition-transform duration-150 rounded-lg`} />
        <Image src={src} loader={() => { setLoaded(false); return (src as string) + "?width=512&height=512" }} onLoad={(e) => { console.log("OK"); setLoaded(true) }} alt={alt} width={269} height={269} className={`hover:scale-105 transition-transform duration-150 rounded-lg ${loaded ? " visible" : "hidden"}`} />
        {/* <Image src={kroniBuffer} alt={alt} width={269} height={269} className={`hover:scale-105 transition-transform duration-150 rounded-lg opacity-70 ${loaded ? "hidden" : "visible"}`} /> */}
        <div className="relative w-full mt-2">
            <Button onClick={addToCart} className="p-0 absolute right-0 top-0"><AddCart size={30} /></Button>
            <div className="text-2xl text-white text-left mr-auto w-[87%] ">{title}</div>
            <div className="flex justify-between w-full">
                <div className="text-xl text-green-500"><span className="line-through mr-2 font-bold text-red-500/50">₹{(price * 5 / 4).toFixed(0)}</span>₹{price}</div>
            </div>
        </div>
    </div>
}
