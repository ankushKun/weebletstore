// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import app from '@/firebase.config'
// import { getDatabase, get, ref, orderByKey, orderByValue, query, orderByChild, limitToLast, onValue, equalTo } from 'firebase/database'
import { ErrorResponse, Item } from '@/types'
import { client } from '@/utils/sanity/client'

// const db = getDatabase(app)

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Item[] | ErrorResponse>
) {
  const itype: string = req.query.itype as string
  if (!itype) {
    res.status(400).json({ error: "itype is required" })
    return
  }
  const limit: number = parseInt(req.query.limit as string) || 5

  const query = `*[_type == "items" && itype == "${itype}"] | order(_id desc) [0..${limit - 1}]`

  client.fetch(query).then((data: Item[]) => {
    res.status(200).json(data)
  }).catch((error) => {
    res.status(500).json({ error: error.message })
  })

  // const q = query(ref(db, 'items'), orderByChild("itype"), equalTo(itype), limitToLast(limit))
  // onValue(q, (snapshot) => {
  //   const data = snapshot.val()
  //   const keys = Object.keys(data)
  //   keys.reverse()
  //   const newData: ItemResponse = {}
  //   keys.forEach((key: string) => {
  //     newData[key] = data[key]
  //   })
  //   res.status(200).json(newData)
  // })


}
