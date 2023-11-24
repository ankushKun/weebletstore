// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ItemResponse, PromoDetails } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
// import { request } from 'https'
import app from '@/firebase.config'
import { get, getDatabase, ref } from 'firebase/database'
// import PaytmChecksum from '@/PaytmChecksum'

const db = getDatabase(app)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ items: ItemResponse, productTotal: number, discount: number, delivery: number, orderTotal: number, valid: boolean }>
) {
    const data = req.body
    const items = data.items
    const promo = data.promo
    const keys = Object.keys(items)

    const itemDetails: ItemResponse = {}
    let productTotal = 0
    let discount = 0
    let delivery = 75
    let orderTotal = 0

    for (const key of keys) {
        const itemRef = ref(db, `items/${key}`)
        const snapshot = await get(itemRef)
        if (snapshot.exists()) {
            itemDetails[key] = snapshot.val()
            itemDetails[key].quantity = items[key]
            productTotal += snapshot.val().price * items[key]
        }
    }

    var valid = false
    if (promo) {
        const p = await get(ref(db, `promos/${promo}`))
        const promoDetails: PromoDetails = p.val()
        if (promoDetails) {
            if (promoDetails.discount) {
                discount = promoDetails.discount
                productTotal += discount
            }
            if (promoDetails.delivery) {
                delivery += promoDetails.delivery
            }
            if (promoDetails.easteregg) {
                itemDetails[promoDetails.easteregg].quantity = 1
            }
            valid = true
        }
    }

    if (productTotal > 500) {
        delivery = -75
    }

    orderTotal = productTotal + delivery

    res.status(200).json({ items: itemDetails, productTotal, delivery, discount, orderTotal, valid })
}
