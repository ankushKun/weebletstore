// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Item, ItemResponse, PromoDetails } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
// import { request } from 'https'
import app from "@/firebase.config";
import { get, getDatabase, ref } from "firebase/database";
// import PaytmChecksum from '@/PaytmChecksum'
import { Item } from "@/types";

const db = getDatabase(app);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    items: ItemResponse;
    productTotal: number;
    discount: number;
    delivery: number;
    orderTotal: number;
    valid: boolean;
  }>,
) {
  const data = req.query;
  const id = data.id;

  const itemRef = ref(db, `items/${id}`);
  const snapshot = await get(itemRef);
  if (snapshot.exists()) {
    const itemDetails: Item = snapshot.val();
    const itype = itemDetails.itype;
    const descRef = ref(db, `descriptions/${itype}`);
    const descSnapshot = await get(descRef);
    if (descSnapshot.exists()) {
      itemDetails.description = descSnapshot.val();
    }
    res.status(200).json(itemDetails);
  }
}
