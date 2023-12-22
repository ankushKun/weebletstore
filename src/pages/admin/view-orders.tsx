import { useState, useEffect } from "react"
import Image from "next/image"
import Layout from "@/components/layout"
import { Item } from "@/types"
import { urlFor } from "@/utils/sanity/client"

export default function View() {
    const [orderId, setOrderId] = useState("")
    const [cartStr, setCartStr] = useState("")
    const [orderItems, setOrderItems] = useState<Item[]>([])

    async function fetchOrderItems() {
        if (!orderId) return
        const order = await fetch(`/api/get-order?orderId=${orderId}`, { method: "GET" })
        if (order.status != 200) return alert("Order not found")
        const orderItems = await order.json()
        console.log(orderItems)
        setOrderItems(orderItems.items)
    }

    async function fetchCartItems() {
        if (!cartStr) return
        const querystr = cartStr.split(",").map((item, _) => { return item.split("x")[0] })
        const ires = await fetch(`/api/get-items?items=${querystr}`, { method: "GET" })
        if (ires.status != 200) return alert("Items not found")
        const items: Item[] = await ires.json()
        const itemsWithQuantity = items.map((item: Item, _: number) => {
            item.quantity = parseInt(cartStr.split(",")[_].split("x")[1])
            return item
        })
        setOrderItems(itemsWithQuantity)
    }

    return <Layout title="View Order">
        <div className="p-2 flex gap-2 flex-col items-center">
            <div className="text-xl">View Orders</div>
            <div className="flex gap-1">
                <input type="text" placeholder="Order ID" className="p-2 bg-transparent rounded-lg border border-white/50 focus:outline-none" onChange={(e) => setOrderId(e.target.value)} />
                <button className="p-2 rounded-lg border border-white/50" onClick={fetchOrderItems}>GO</button>
            </div>
            <div className="flex gap-1">
                <input type="text" placeholder="Cart String" className="p-2 bg-transparent rounded-lg border border-white/50 focus:outline-none" onChange={(e) => setCartStr(e.target.value)} />
                <button className="p-2 rounded-lg border border-white/50" onClick={fetchCartItems}>GO</button>
            </div>
            <div className="flex flex-col gap-1">
                {
                    orderItems.map((item, _) => <div key={_} className="flex gap-2 border p-1 rounded-lg border-white/50 grow">
                        <Image alt={item.name} src={urlFor(item.images[0])} className="rounded-lg object-contain" width={200} height={200} />
                        <div className="flex flex-col">
                            <div>{item.name} | {item.anime}</div>
                            <div className="text-green-200">₹{item.price}</div>
                            <div>x{item.quantity}</div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </Layout>
}