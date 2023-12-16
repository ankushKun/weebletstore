// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Description, Item, PromoDetails } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import app from "@/firebase.config";
import { get, push, getDatabase, ref } from "firebase/database";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_KEY);

const db = getDatabase(app);

type OrderDetails = {
    items: { _id: string, qty: number },
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
        const userInfo = (await get(ref(db, `users/${emailSafe}`))).val()
        const { name, email } = userInfo

        const message = `<center>
    <img src="weebletstore.in/logo.png" width="200px" alt="store logo" />

    <h1>Order Placed</h1>

    <p>
        Hi ${name},<br>
        Thank you for your recent order at Weeblet Store.
    </p>

    <p>
        Your order id is <b>${order.key}</b>.<br><br>
        Please pay the amount of <b>₹${total}</b> at the given UPI QR code to complete
        the order.
    </p>

    <a href="https://weebletstore.in/pay/${order.key}" target="_blank">
        <button>Visit payment page</button>
    </a>
    <br>

    <p>Visit <a href="https://weebletstore.in/orders" target="_blank">weebletstore.in/orders</a> to view your order status</p>

    <p>Thank you for shopping with us ♥️</p>

    <hr>

    <a href="https://weebletstore.in" target="_blank">Weeblet Store</a><br>
    <a href="https://instagram.com/weeblets_anime_store" target="_blank">@weeblets_anime_store</a><br>
</center>
`;

        const subject = `Order Placed | Weeblet Store`;
        const from = process.env.FROM_EMAIL

        await resend.emails.send({
            from: `Weeblet Store <${from}>`,
            to: [email],
            subject,
            html: message,
        })

        return res.status(200).json({ orderId: order.key! })
    } catch (e: any) {
        return res.status(500).json({ name: "SERVER ERROR", message: e.message })
    }


}
