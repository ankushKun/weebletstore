// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Description, Item, PromoDetails } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import app from "@/firebase.config";
import { get, push, getDatabase, ref } from "firebase/database";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const db = getDatabase(app);

type OrderDetails = {
    items: { id: string, qty: number },
    promo: string,
    total: number,
    user: string,
    status: "unpaid" | "paid" | "processing" | "shipped" | "delivered" | "cancelled",
    createdAt: number,
}

type OrderResponse = {
    orderId: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<OrderResponse | Error>,
) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ name: "AUTH ERROR", message: "You need to be signed in to use this api" })
    const { user } = session
    if (!user?.email) return res.status(401).json({ name: "AUTH ERROR", message: "No email address found for the logged in user" })
    const emailSafe = user?.email.replaceAll(".", "_")
    const userRef = ref(db, `orders`)
    if (req.method !== "POST") return res.status(401).json({ name: "METHOD ERROR", message: "Only POST requests allowed" })

    const { items, promo, total } = req.body

    const orderRef = ref(db, `orders`)
    const orderDetails: OrderDetails = {
        items,
        promo,
        total,
        user: user?.email,
        status: "unpaid",
        createdAt: Date.now()
    }
    try {
        const order = await push(orderRef, orderDetails)
        return res.status(200).json({ orderId: order.key! })
    } catch (e: any) {
        return res.status(500).json({ name: "SERVER ERROR", message: e.message })
    }


}
