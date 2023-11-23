// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ItemResponse } from '@/types'
import type { NextApiRequest, NextApiResponse } from 'next'
// import { request } from 'https'
import app from '@/firebase.config'
import { get, getDatabase, ref } from 'firebase/database'
// import PaytmChecksum from '@/PaytmChecksum'

const db = getDatabase(app)

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<{ items: ItemResponse, total: number }>
) {
    const data = req.body


    const keys = Object.keys(data)

    const itemDetails: ItemResponse = {}
    let total = 0

    for (const key of keys) {
        const itemRef = ref(db, `items/${key}`)
        const snapshot = await get(itemRef)
        if (snapshot.exists()) {
            itemDetails[key] = snapshot.val()
            itemDetails[key].quantity = data[key]
            total += snapshot.val().price * data[key]
        }
    }

    // var paytmParams: any = {};

    // paytmParams.body = {
    //     "mid": process.env.MID,
    //     "orderId": `${new Date().getTime()}`,
    //     "amount": `${parseFloat(total.toString()).toFixed(2)}`,
    //     "businessType": "UPI_QR_CODE",
    //     "posId": "WBSTORE"
    // }

    // PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.MERCHANT_KEY).then(function (checksum: any) {
    //     paytmParams.head = {
    //         "clientId": "C00",
    //         "version": "v1",
    //         "signature": checksum
    //     }
    //     var post_data = JSON.stringify(paytmParams);

    //     var options = {

    //         /* for Staging */
    //         hostname: 'securegw-stage.paytm.in',

    //         /* for Production */
    //         // hostname: 'securegw.paytm.in',

    //         port: 443,
    //         path: '/paymentservices/qr/create',
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             'Content-Length': post_data.length
    //         }
    //     };

    //     var response = "";
    //     var post_req = request(options, function (post_res) {
    //         post_res.on('data', function (chunk) {
    //             response += chunk;
    //         });

    //         post_res.on('end', function () {
    //             console.log('Response: ', response);
    //         });
    //     });
    //     post_req.write(post_data);
    //     post_req.end();
    // })

    res.status(200).json({ items: itemDetails, total })
}
