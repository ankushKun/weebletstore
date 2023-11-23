// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp } from 'firebase/app'
import { firebaseConfig } from "@/firebase.config"
import { getDatabase, get, ref, orderByKey, orderByValue, query, orderByChild, limitToLast, onValue, equalTo } from 'firebase/database'
import { ItemResponse, ErrorResponse } from '@/types'

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ItemResponse | ErrorResponse>
) {
  const itype: string = req.query.itype as string
  if (!itype) {
    res.status(400).json({ error: "itype is required" })
    return
  }
  const limit: number = parseInt(req.query.limit as string) || 5
  const q = query(ref(db, 'items'), orderByChild("itype"), equalTo(itype), limitToLast(limit))
  onValue(q, (snapshot) => {
    const data = snapshot.val()
    const keys = Object.keys(data)
    keys.reverse()
    const newData: ItemResponse = {}
    keys.forEach((key: string) => {
      newData[key] = data[key]
    })
    res.status(200).json(newData)
  })
}
