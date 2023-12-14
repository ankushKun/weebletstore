import { useSession, getSession, signIn } from "next-auth/react"
import Image from "next/image";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OrderData } from "./api/my-orders";

export default function Me() {
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

    if (status === "loading") return <Layout title="Loading...">Loading...</Layout>
    if (status === "unauthenticated") signIn("google")
    else
        return <Layout title="Your Orders">
            <div className="flex flex-col justify-center items-center p-5 gap-5">
                <div className="text-xl ring-1 ring-white/50 p-1 w-full md:w-1/2 text-center">Order History</div>
                {
                    Object.keys(orders).map((orderId, index) => {
                        return <div className="flex flex-col md:flex-row md:justify-between md:items-center w-full md:w-1/2 p-5 ring-1 ring-white/60 rounded-md shadow-md " key={index}>
                            <div className="flex flex-col justify-center items-start gap-2">
                                <div className="text-lg font-bold">Order ID: {orderId} | {orders[orderId].status}</div>
                                <div className="text-lg font-bold">{orders[orderId].items.length} items</div>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2 text-green-300">
                                ₹{orders[orderId].total}
                            </div>
                        </div>
                    })
                }
            </div>
        </Layout>
}