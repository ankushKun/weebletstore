// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Description, Item, PromoDetails } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import app from "@/firebase.config";
import { get, push, getDatabase, ref } from "firebase/database";
import qrcode from "qrcode"

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
    qrImgB64: string,
    amount: number,
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<OrderResponse | Error>,
) {
    const { orderId } = req.query

    const orderRef = ref(db, `orders/${orderId}`)

    try {
        const order = await get(orderRef)
        if (!order.exists()) return res.status(404).json({ name: "NOT FOUND", message: "Order not found" })
        const orderDetails: OrderDetails = order.val()
        const { total } = orderDetails

        const MERCHANT_VPA = process.env.PAYTM_VPA
        const upiUrl = `upi://pay?pa=${MERCHANT_VPA}&pn=WeebletStore&am=${total}&cu=INR&tn=OrderID ${orderId}&tid=${orderId}`
        const qrImgB64 = await qrcode.toDataURL(upiUrl)
        return res.status(200).json({ qrImgB64, amount: total })
    } catch (e: any) {
        return res.status(500).json({ name: "SERVER ERROR", message: e.message })
    }
}

