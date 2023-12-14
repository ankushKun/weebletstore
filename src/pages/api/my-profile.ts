// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Description, Item, PromoDetails } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import app from "@/firebase.config";
import { get, set, getDatabase, ref } from "firebase/database";
import { getServerSession } from "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

const db = getDatabase(app);

export type UserData = {
    name: string,
    email: string,
    number: string,
    address: string,
    orders?: {
        [key: string]: {
            items: Item[],
            promoDetails: PromoDetails,
            description: Description,
            total: number,
            date: string,
            status: string
        }
    },
    [key: string]: any
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<UserData | Error>,
) {
    const session = await getServerSession(req, res, authOptions)
    if (!session) return res.status(401).json({ name: "AUTH ERROR", message: "You need to be signed in to use this api" })
    const { user } = session
    if (!user?.email) return res.status(401).json({ name: "AUTH ERROR", message: "No email address found for the logged in user" })
    const emailSafe = user?.email.replaceAll(".", "_")
    const userRef = ref(db, `users/${emailSafe}`)
    if (req.method === "GET") {
        const snapshot = await get(userRef)
        if (snapshot.exists()) {
            const userData = snapshot.val()
            return res.status(200).json(userData)
        } else {
            return res.status(404).json({ name: "NOT FOUND", message: "User not found" })
        }

    } else if (req.method === "POST") {
        const { name, email, number, address } = req.body
        const snapshot = await get(userRef)
        const val = snapshot.val() || {}
        const userData = {
            ...val,
            name: name || val.name,
            email: email || val.email,
            number: number || val.number,
            address: address || val.address
        }
        await set(userRef, userData)
        return res.status(200).json(userData)
    }
}
