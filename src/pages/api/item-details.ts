// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ItemResponse } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { firebaseConfig } from '@/firebase.config'

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<ItemResponse>
) {


    // res.status(200).json({ name: 'John Doe' })
}
