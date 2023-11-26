// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Item, PromoDetails } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
// import { request } from 'https'
// import app from '@/firebase.config'
// import { get, getDatabase, ref } from 'firebase/database'
// import PaytmChecksum from '@/PaytmChecksum'
import { client } from '@/utils/sanity/client'

// const db = getDatabase(app)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ items: Item[], productTotal: number, discount: number, delivery: number, orderTotal: number, valid: boolean }>
) {
    const data = req.body
    const items = data.items
    const promo = data.promo
    const keys = Object.keys(items)

    let itemDetails: Item[] = []
    let productTotal = 0
    let discount = 0
    let delivery = 75
    let orderTotal = 0

    const query = `*[_type == "items" && _id in $ids]`
    itemDetails = await client.fetch(query, { ids: keys })
    itemDetails.forEach((item: Item) => {
        item.quantity = items[item._id]
        productTotal += item.price * items[item._id]
    })

    var valid = false
    if (promo) {
        const pQuery = `*[_type == "promo" && promoCode == "${promo}"]`
        const promoDetails: PromoDetails[] = await client.fetch(pQuery)
        if (promoDetails.length > 0) {
            if (promoDetails[0].promoType == "discount") {
                discount += promoDetails[0].value
            }
            if (promoDetails[0].promoType == "delivery") {
                delivery += promoDetails[0].value
            }
            valid = true
        }
    }

    if (productTotal > 500)
        delivery = 0

    orderTotal = productTotal + delivery + discount
    if (orderTotal < 0)
        orderTotal = 0
    if (productTotal < 0)
        productTotal = 0

    res.status(200).json({ items: itemDetails, productTotal, delivery, discount, orderTotal, valid })
}
