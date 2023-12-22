// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Description, Item, PromoDetails } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
import app from "@/firebase.config";
import { get, getDatabase, ref } from "firebase/database";
// import PaytmChecksum from '@/PaytmChecksum'
import { client } from "@/utils/sanity/client";

const db = getDatabase(app);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const orderId = req.query.orderId as string
  const orderRef = ref(db, `orders/${orderId}`)
  const orderSnapshot = await get(orderRef)
  if (orderSnapshot.exists()) {
    const order = orderSnapshot.val()
    const items = order.items.map((item: any) => item._id)
    const query = `*[_type == "items" && _id in ${JSON.stringify(items)}]`;
    const itemDetails: Item[] = await client.fetch(query);
    order.items = order.items.map((item: any) => {
      const itemDetail = itemDetails.find((detail: any) => detail._id === item._id)
      if (itemDetail) itemDetail.quantity = item.qty
      return { ...item, ...itemDetail }
    })
    return res.status(200).json(order)
  } else {
    return res.status(404).json({ name: "NOT FOUND", message: "Order not found" })
  }

  // const items: string = req.query.items as string
  // const idList = items.split(',')
  // const query = `*[_type == "items" && _id in ${JSON.stringify(idList)}]`;
  // const itemDetails: Item[] = await client.fetch(query);
  // res.status(200).json(itemDetails);
}
