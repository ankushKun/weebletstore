// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Description, Item, PromoDetails } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import app from "@/firebase.config";
import { get, set, getDatabase, ref, orderByValue, query, equalTo, orderByKey, orderByChild } from "firebase/database";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const db = getDatabase(app);

export type OrderData = {
    [key: string]: {
        createdAt: number;
        items: { _id: string, qty: number }[];
        promo: string;
        status: string;
        total: number;
        user: string;
    };
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<OrderData | Error>,
) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ name: "AUTH ERROR", message: "You need to be signed in to use this api" })
    const { user } = session
    if (!user?.email) return res.status(401).json({ name: "AUTH ERROR", message: "No email address found for the logged in user" })
    const emailSafe = user?.email.replaceAll(".", "_")
    if (req.method !== "GET") return res.status(401).json({ name: "METHOD ERROR", message: "Only GET requests allowed" })

    // fetch orders by user key == email
    const ordersRef = ref(db, `orders`)
    const ordersQuery = query(ordersRef, orderByChild("user"), equalTo(user?.email))

    const ordersSnapshot = await get(ordersQuery)

    if (ordersSnapshot.exists()) {
        const orders = ordersSnapshot.val()
        return res.status(200).json(orders)
    }
}
