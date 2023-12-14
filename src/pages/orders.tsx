import { useSession, getSession, signIn } from "next-auth/react"
import Image from "next/image";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Me() {
    const { data: session, status } = useSession()
    const emailSafe = session?.user?.email?.replace(".", "_")

    useEffect(() => {

    }, [])

    if (status === "loading") return <Layout title="Loading...">Loading...</Layout>
    if (status === "unauthenticated") signIn("google")
    else
        return <Layout title="Your Orders">
            <div className="flex flex-col justify-center items-center p-5">
                <div className="text-xl ring-1 ring-white/50 p-1 w-full md:w-1/2 text-center">Order History</div>
            </div>
        </Layout>
}