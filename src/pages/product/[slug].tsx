import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Item } from "@/types";
import { urlFor } from "@/utils/sanity/client";
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { useHorizontalScroll } from "@/hooks/sideScroll";
import { Button } from "@mantine/core";
import toast from "react-hot-toast";
import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";


export async function getServerSideProps({ query }: { query: any }) {
  const slug = query.slug;
  const base =
    process.env.ENV === "DEV" ? process.env.DEV_URL : process.env.PROD_URL;
  const item = await fetch(base + `/api/item-details?slug=${slug}`).then(
    (res) => res.json()
  );
  return { props: { item } };
}

export default function Product({ item }: { item: Item }) {
  const [imagePos, setImagePos] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [count, setCount] = useState(0);
  const images = useHorizontalScroll()

  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    setInCart(cart[item._id] ? true : false);
    setCount(cart[item._id] || 0);
  }, [count]);

  function addToCart(e: any) {
    e.stopPropagation();
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[item._id] = cart[item._id] ? cart[item._id] + 1 : 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("storage"));
    toast.success("Added to cart");
    setInCart(true);
    setCount(cart[item._id]);
  }

  function decrement() {
    const cart = window.localStorage.getItem("cart");
    if (!cart) return;
    const cartObject = JSON.parse(cart);
    cartObject[item._id]--;
    if (cartObject[item._id] <= 0) delete cartObject[item._id];
    localStorage.setItem("cart", JSON.stringify(cartObject));
    dispatchEvent(new Event("storage"));
    toast.success("Item quantity decreased");
    setCount(cartObject[item._id] || 0);
    if (cartObject[item._id] <= 0) {
      setInCart(false)
      deleteFromCart()
    }
  }

  function increment() {
    const cart = window.localStorage.getItem("cart");
    if (!cart) return;
    const cartObject = JSON.parse(cart);
    cartObject[item._id]++;
    localStorage.setItem("cart", JSON.stringify(cartObject));
    dispatchEvent(new Event("storage"));
    toast.success("Item quantity increased");
    setCount(cartObject[item._id] || 0);
  }

  function deleteFromCart() {
    const cart = window.localStorage.getItem("cart");
    if (!cart) return;
    const cartObject = JSON.parse(cart);
    delete cartObject[item._id];
    localStorage.setItem("cart", JSON.stringify(cartObject));
    dispatchEvent(new Event("storage"));
    toast.success("Item removed from cart");
  }

  return (
    <Layout>
      <div className="flex gap-10 pt-10 justify-center min-h-[80vh]">
        <div className="flex flex-col gap-5 justify-center">
          <Image
            src={urlFor(item.images[imagePos])}
            alt={item.name}
            width={400}
            height={400}
            className="rounded-lg block"
          />
          <div className=" overflow-scroll flex w-fit gap-1 max-w-[400px]" ref={images}>
            {item.images.map((image, index) => (
              <Image
                key={index}
                src={urlFor(image)}
                alt={item.name}
                width={100}
                height={100}
                onClick={() => setImagePos(index)}
                className="rounded-lg cursor-pointer"
              />
            ))}
          </div>
          <div className="flex justify-evenly gap-2 px-2">
            {inCart && <Button variant="unstyled" className="bg-white text-black hover:bg-white/80 active:bg-black active:text-white"
              onClick={decrement}
            >
              -1
            </Button>}
            {!inCart && <Button variant="unstyled" className="bg-white text-black hover:bg-white/80 active:bg-black active:text-white grow"
              onClick={addToCart}>Add to Cart</Button>}
            {inCart && <Link href="/cart" className="grow">
              <Button variant="unstyled" className="bg-white text-black grow w-full">
                {count} in Cart <IconArrowRight size={20} className="-rotate-45 relative bottom-0.5" /></Button>
            </Link>
            }
            {inCart && <Button variant="unstyled" className="bg-white text-black hover:bg-white/80 active:bg-black active:text-white"
              onClick={increment}>
              +1
            </Button>}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="text-4xl">{item.name} - {item.anime}</div>
          <div className="text-lg">{item.itype}</div>
          <div className="text-3xl text-green-500">₹{item.price} <span className="text-red-500/80 text-base tracking-widest line-through">₹{(item.price * 4 / 3).toFixed(0)}</span></div>
          <Markdown remarkPlugins={[remarkGfm]} className="text-lg my-5">{item.description}</Markdown>
          <Markdown remarkPlugins={[remarkGfm]} className="text-lg my-5">{item.postDescription}</Markdown>
        </div>
      </div>
    </Layout>
  );
}
