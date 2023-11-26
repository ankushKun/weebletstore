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
  res: NextApiResponse<Item>,
) {
  const data = req.query;
  const id = data.id;

  // const itemRef = ref(db, `items/${id}`);
  // const snapshot = await get(itemRef);
  // if (snapshot.exists()) {
  //   const itemDetails: Item = snapshot.val();
  //   const itype = itemDetails.itype;
  //   const descRef = ref(db, `descriptions/${itype}`);
  //   const descSnapshot = await get(descRef);
  //   if (descSnapshot.exists()) {
  //     itemDetails.description = descSnapshot.val();
  //   }
  //   res.status(200).json(itemDetails);
  // }

  const query = `*[_type == "items" && id == "${id}"]`;
  const itemDetails: Item[] = await client.fetch(query);
  const itype = itemDetails[0].itype;
  const descQuery = `*[_type == "descriptions" && itype == "${itype}"]`;
  const descDetails: Description[] = await client.fetch(descQuery);
  itemDetails[0].description = descDetails[0].description;
  res.status(200).json(itemDetails[0]);
}
