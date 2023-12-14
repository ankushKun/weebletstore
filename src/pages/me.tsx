import { useSession, getSession, signIn } from "next-auth/react"
import Image from "next/image";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Me() {
    const { data: session, status } = useSession()

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [address, setAddress] = useState("")
    const [email, setEmail] = useState("")
    const [fetched, setFetched] = useState(false)


    async function fetchData() {
        const emailSafe = session?.user?.email?.replace(".", "_")
        const res = await fetch(`/api/my-profile?email=${emailSafe}`)
        const data = await res.json()
        console.log(data)
        if (res.status !== 200) return toast.error(`Profile data not found, please enter your details`)
        setName(data.name)
        setNumber(data.number)
        setAddress(data.address)
        setEmail(data.email)
    }

    useEffect(() => {
        fetchData()
    }, [])

    async function saveDetails() {
        const emailSafe = session?.user?.email?.replace(".", "_")
        const userData = { name, number, address, email }
        const res = await fetch("/api/my-profile", {
            method: "POST",
            body: JSON.stringify(userData),
            headers: {
                "Content-Type": "application/json",
            },
        })
        console.log(await res.json())
        if (res.status === 200) toast.success("Details saved!")
        else toast.error(`${res.status} - ${res.statusText}`)
    }

    if (status === "loading") return <Layout title="Loading...">Loading...</Layout>
    if (status === "unauthenticated") signIn("google")
    else
        return <Layout title="Your Profile">
            <div className="flex flex-col justify-center items-center">
                <div className="flex flex-col md:flex-row justify-center items-center m-10">
                    <Image src={session?.user?.image || ""} alt="profile pic" className="rounded-full p-5" width={169} height={169} />
                    <div className="flex flex-col gap-2 items-center">
                        <div className="flex flex-col w-full">
                            <label htmlFor="name">Name</label>
                            <input type="text" name="name" id="name" className="p-1 px-2 rounded" defaultValue={name} placeholder="Kimi no namae wa?" onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="phone">Number (+91)</label>
                            <input type="tel" name="phone" id="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" defaultValue={number} className="p-1 px-2 rounded" placeholder="888-888-8888" onChange={(e) => setNumber(e.target.value)} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="email">Email</label>
                            <input type="text" name="email" id="email" className="p-1 px-2 rounded" defaultValue={email} placeholder="Senpai, your email?" onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="flex flex-col w-full">
                            <label htmlFor="address">Full Address</label>
                            <textarea name="address" id="address" cols={40} rows={6} className="p-1 px-2 rounded" defaultValue={address} placeholder="Where do you live senpai?" onChange={(e) => setAddress(e.target.value)} />
                        </div>
                        <button className="hover:bg-white/10 active:translate-y-1 p-2 rounded-lg" onClick={saveDetails}>save</button>
                    </div>
                </div><div className="text-xl ring-1 ring-white w-1/2 text-center">Order History</div>
            </div>
        </Layout>
}