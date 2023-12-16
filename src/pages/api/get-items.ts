// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Description, Item, PromoDetails } from "@/types";
import type { NextApiRequest, NextApiResponse } from "next";
// import { request } from 'https'
// import app from "@/firebase.config";
// import { get, getDatabase, ref } from "firebase/database";
// import PaytmChecksum from '@/PaytmChecksum'
import { client } from "@/utils/sanity/client";

// const db = getDatabase(app);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>,
) {
  const items: string = req.query.items as string
  const idList = items.split(',')
  const query = `*[_type == "items" && _id in ${JSON.stringify(idList)}]`;
  const itemDetails: Item[] = await client.fetch(query);
  res.status(200).json(itemDetails);
}
