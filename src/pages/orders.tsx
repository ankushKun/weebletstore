import { useSession, getSession, signIn } from "next-auth/react"
import Image from "next/image";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrderData } from "./api/my-orders";
import Link from "next/link";
import { Item } from "@/types";
import { getURL } from "next/dist/shared/lib/utils";
import { urlFor } from "@/utils/sanity/client";

export default function Orders() {
    const { data: session, status } = useSession()
    const emailSafe = session?.user?.email?.replace(".", "_")
    const [orders, setOrders] = useState<OrderData>({})

    async function fetchMyOrders() {
        const orders = await fetch(`/api/my-orders`, { method: "GET" })
        const ordersJson = await orders.json()
        console.log(ordersJson)
        setOrders(ordersJson)
    }

    useEffect(() => {
        if (status !== "authenticated") return
        fetchMyOrders()
    }, [status])

    function OrderItem({ orderId }: { orderId: string }) {
        const [items, setItems] = useState<Item[]>([])
        const [fetched, setFetched] = useState(false)

        useEffect(() => {
            if (fetched) return
            const getUrl = `/api/get-items?items=${(orders[orderId].items.map(r => r._id)).join(",")}`
            fetch(getUrl, { method: "GET" })
                .then(res => res.json())
                .then(res => {
                    setItems(res)
                    setFetched(true)
                })
        }, [])

        return <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full md:w-1/2 p-5 ring-1 ring-white/60 rounded-md shadow-md " >
            <div className="flex flex-col justify-center items-start gap-2">
                <div className="text-lg font-bold">Order ID: {orderId} | {orders[orderId].status} {orders[orderId].status == "unpaid" && <Link href={`/pay/${orderId}`} className="inline text-sm font-light underline underline-offset-2">(pay now)</Link>}</div>
                <details>
                    <summary className="text-lg font-bold">{orders[orderId].items.length} items</summary>
                    <div className="flex flex-col gap-1">
                        {
                            items.map((item, index) => {
                                return <div key={index} className="flex flex-row justify-between items-center gap-2">
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <Image src={urlFor(item.images[0])} width={50} height={50} alt={""} className="rounded" />
                                        <div className="flex flex-col justify-center items-start gap-1">
                                            <div className="text-sm">{item.name}</div>
                                            <div className="text-sm font-light text-gray-500">{item.description}</div>
                                        </div>
                                    </div>
                                    <div className="text-sm font-light">x{(orders[orderId].items.find((o => o._id == item._id)))?.qty}</div>
                                </div>
                            })
                        }
                    </div>
                </details>
            </div>
            <div className="flex flex-col justify-center items-center gap-2 text-green-300">
                ₹{orders[orderId].total}
            </div>
        </div>
    }

    if (status === "loading") return <Layout title="Loading...">Loading...</Layout>
    if (status === "unauthenticated") signIn("google")
    else
        return <Layout title="Your Orders">
            <div className="flex flex-col justify-center items-center p-5 gap-5">
                <div className="text-xl ring-1 ring-white/50 p-1 w-full md:w-1/2 text-center">Order History</div>
                {
                    Object.keys(orders).map((orderId, index) => {
                        return <OrderItem orderId={orderId} key={index} />
                    })
                }
            </div>
        </Layout>
}