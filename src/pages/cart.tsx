import Image from "next/image";
import Layout from "@/components/layout";
import { ItemResponse } from "@/types";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Button } from "@mantine/core";

export default function Cart() {
    const [cartItems, setCartItems] = useState<ItemResponse>({})
    const [total, setTotal] = useState(0)
    const [delivery, setDelivery] = useState(75)
    const [discount, setDiscount] = useState(0)
    const [deliveryFree, setDeliveryFree] = useState(false)
    const [coupon, setCoupon] = useState("")

    const CartItem = ({ title, img, price, quantity, id }: {
        title: string
        img: string
        price: number
        quantity: number
        id: string
    }) => {
        function deleteFromCart() {
            const cart = window.localStorage.getItem("cart")
            if (!cart) return
            const cartObject = JSON.parse(cart)
            delete cartObject[id]
            localStorage.setItem("cart", JSON.stringify(cartObject))
            dispatchEvent(new Event("storage"))
            toast.success("Item removed from cart")
        }

        function decrement() {
            const cart = window.localStorage.getItem("cart")
            if (!cart) return
            const cartObject = JSON.parse(cart)
            cartObject[id]--
            localStorage.setItem("cart", JSON.stringify(cartObject))
            dispatchEvent(new Event("storage"))
            toast.success("Item quantity decreased")
        }

        function increment() {
            const cart = window.localStorage.getItem("cart")
            if (!cart) return
            const cartObject = JSON.parse(cart)
            cartObject[id]++
            localStorage.setItem("cart", JSON.stringify(cartObject))
            dispatchEvent(new Event("storage"))
            toast.success("Item quantity increased")
        }

        // return <div className="flex gap-5 pb-5 px-5 border-b border-white/20">
        return <div className="grid grid-cols-5 pb-5 px-5 border-b border-white/20 w-full gap-3">
            <div className="relative w-full h-full">
                <Image src={img} alt={title} fill className="rounded object-cover object-center" />
            </div>
            <div className="flex flex-col items-start justify-center gap-3 col-span-3">
                <div className="text-white text-xl font-semibold">{title}</div>
                <div className="text-white text-lg">₹{price}</div>
                <div className="text-white flex items-center gap-5 text-lg">
                    <button onClick={decrement}>-</button> {quantity} <button onClick={increment}>+</button>
                    <button onClick={deleteFromCart}><IconTrash size={20} /></button>
                </div>

            </div>
            <div className="flex items-center justify-center">
                <div className="font-semibold text-xl">₹ {price * quantity}</div>
            </div>
        </div>
    }

    function checkout() {
        toast.success("Checkout coming soon")
    }

    useEffect(() => {
        function fetchDetails() {
            if (!window) return
            const cart = window.localStorage.getItem("cart")
            if (!cart) return
            const cartObject = JSON.parse(cart)

            fetch("/api/item-details", {
                method: "POST",
                body: JSON.stringify(cartObject),
                headers: { "Content-Type": "application/json" }
            }).then(res => res.json()).then(res => {
                setCartItems(res.items)
                setTotal(res.total)
            })
        }

        fetchDetails()
        window.addEventListener("storage", fetchDetails)
    }, [])

    const Slip = () => {
        return <div className="col-span-3 md:col-span-1 lg:mx-10">
            <div className="flex justify-center ring-1 ring-white h-fit py-5 rounded-2xl">
                <div className="w-[80%] flex flex-col gap-5 h-fit">
                    <div className="text-2xl uppercase text-center mb-5">your order</div>
                    <input type="text" placeholder="Discount Code" className="p-1 bg-transparent border-b " />
                    <div className="grid grid-cols-2 gap-y-2 border-b pb-4">
                        <div className="flex justify-start">Price</div>
                        <div className="flex justify-end">₹ {total}</div>
                        <div className={`flex justify-start ${deliveryFree && "text-red-500 line-through"}`}>Delivery</div>
                        <div className={`flex justify-end ${deliveryFree && "text-red-500 line-through"}`}>₹ {delivery}</div>
                        <div className={`flex justify-start ${discount > 0 ? "text-green-500" : " text-white/30"}`}>Discount</div>
                        <div className={`flex justify-end ${discount > 0 ? " text-green-500" : " text-white/30"}`}>₹ {discount}</div>
                    </div>
                    <div className="grid grid-cols-2 gap-y-2 text-xl font-semibold">
                        <div className="flex justify-start">Total</div>
                        <div className="flex justify-end">₹ {total + delivery - discount}</div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center p-5">
                <Button variant="light" color="gray" className="bg-white/80 text-black hover:text-white" onClick={checkout}>Proceed to Checkout</Button>
            </div>
        </div>
    }

    return <Layout title="Cart | Weeblet Store">
        <div className="grid grid-cols-3 gap-5 mx-10">
            <div className="grid grid-cols-3 mt-5 md:hidden col-span-3">
                <Slip />
            </div>
            <div className="capitalize text-2xl text-white text-center py-5 col-span-3">Cart Items</div>
            <div className="col-span-3 md:col-span-2">
                <div className="grid grid-cols-5">
                    <div className="col-span-4"></div>
                    <div className="flex items-center justify-center"><div className="pr-6">subtotal</div></div>
                </div>
                <div className="flex flex-col gap-5 border-t pt-5">
                    {
                        Object.keys(cartItems).map((key) => {
                            const item = cartItems[key]
                            return <CartItem key={key} id={item.id} title={item.name} img={item.images[0]} price={item.price} quantity={item.quantity || 1} />
                        })
                    }
                </div>
            </div>
            {/* SLIP */}
            <Slip />
        </div>
    </Layout>
}