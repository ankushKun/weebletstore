import { useSession, getSession, signIn } from "next-auth/react"
import Image from "next/image";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import copy from "@/assets/copy.svg"
import upi from "@/assets/upi.png"
import { OrderResponse } from "../api/checkout";
import { Button } from "@mantine/core";

export default function Checkout() {
    const router = useRouter()
    const { orderId } = router.query
    const [qr, setQr] = useState("")
    const [url, setUrl] = useState("")
    const [amount, setAmount] = useState(0)
    const { data: session, status } = useSession()
    const emailSafe = session?.user?.email?.replace(".", "_")

    async function getCheckoutDetails() {
        const res = await fetch(`/api/checkout?orderId=${orderId}`, { method: "GET" })
        const data: OrderResponse = await res.json()
        if (res.status !== 200) return toast.error(data.message!)
        console.log(data)
        setQr(data.qrImgB64)
        setAmount(data.amount)
        setUrl(data.upiUrl)
    }

    function copyUrl() {
        navigator.clipboard.writeText(`https://weebletstore.in/pay/${orderId}`)
        toast.success("Copied to clipboard")
    }

    useEffect(() => {
        if (orderId) getCheckoutDetails()
    }, [orderId])


    return <Layout title="Checkout Order">
        <div className="grid grid-cols-1 md:grid-cols-2 p-5 mx-auto w-fit">
            <div className="flex flex-col justify-center items-center">
                <div className="text-2xl p-1 w-full md:w-1/2 text-center">
                    Pay and Checkout
                    <br /> <span className="text-base">Order ID: <pre className="inline text-green-200">{orderId}</pre></span>
                </div>
                <div className="text-center w-full md:w-2/3 text-red-200 my-5">You dont need to enter any details, just scan the QR code and pay with UPI.<br /> Shipment details and order confirmation will be sent through email once payment is verified.</div>
            </div>
            <div className="flex flex-col justify-center items-center">
                <div className=" p-1 text-center ring-1 ring-white bg-white pb-5 text-black rounded-xl my-5">
                    <div className="text-green-600 font-extrabold text-2xl flex items-center justify-center gap-2 pt-3">
                        <Image src={upi} alt="UPI logo" height={18} className="" />₹{amount}</div>
                    <div className="text-xl font-medium">WeebletStore (Ankush Singh)</div>
                    <Image src={qr} alt="UPI QR code" width={300} height={300} className="rounded-lg bg-black" />
                    <div>scan or</div>
                    <Button className="bg-green-200 hover:bg-green-300 active:bg-green-400" color="dark" variant="outline" onClick={() => router.push(url, "_blank")}>Pay with UPI App</Button>
                    <div>if you are on mobile</div>
                </div>
                <div className="text-center p-1">
                    You can copy and share this url to pay<br /> <div className="inline text-green-200 cursor-pointer underline underline-offset-2" onClick={copyUrl}>weebletstore.in/pay/{orderId}</div>
                    <Image src={copy} alt="Copy" width={20} height={20} className="inline mx-1 cursor-pointer" onClick={copyUrl} />
                </div>
            </div>
        </div>
    </Layout>
}