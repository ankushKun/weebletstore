import Image from "next/image";
import { StaticImageData } from "next/image";
import { Button } from "@mantine/core";
import { IconShoppingCartPlus as AddCart } from "@tabler/icons-react";
import toast from "react-hot-toast";
import kroniBuffer from "@/assets/kroni-buffer.gif";
import { useState } from "react";
import Link from "next/link";

export default function ProductCard({
  src,
  alt,
  title,
  price,
  id,
}: {
  src: StaticImageData | string;
  alt: string;
  title: string;
  price: number;
  id: string;
}) {
  function addToCart(e) {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[id] = cart[id] ? cart[id] + 1 : 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    toast.success("Added to cart");
  }

  return (
    <div className="mx-auto flex w-fit min-w-max  flex-col items-center justify-center rounded-lg p-3 ring-white/40 transition-all duration-150 hover:ring-1">
      <Link href={`/product/${id}`}>
        <Image
          src={src}
          alt={alt}
          width={269}
          height={269}
          className={`rounded-lg transition-transform duration-150 hover:scale-105`}
          loader={() => {
            return src + "?width=269&height=269";
          }}
        />
      </Link>

      {/* <Image src={kroniBuffer} alt={alt} width={269} height={269} className={`hover:scale-105 transition-transform duration-150 rounded-lg opacity-70 ${loaded ? "hidden" : "visible"}`} /> */}
      <div className="relative mt-2 w-full">
        <Button onClick={addToCart} className="absolute right-0 top-0 p-0">
          <AddCart size={30} />
        </Button>
        <div className="mr-auto w-[87%] text-left text-2xl text-white ">
          {title}
        </div>
        <div className="flex w-full justify-between">
          <div className="text-xl text-green-500">
            <span className="mr-2 font-bold text-red-500/50 line-through">
              ₹{((price * 5) / 4).toFixed(0)}
            </span>
            ₹{price}
          </div>
        </div>
      </div>
    </div>
  );
}
