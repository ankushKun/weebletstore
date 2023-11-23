import Layout from "@/components/layout";
import Link from "next/link";

export default function Contact() {
    return <Layout title="Contact | Weeblet Store">
        <div className="text-center text-lg md:text-2xl mx-5 md:mx-10 md:leading-10  min-h-[80%] flex flex-col justify-center items-center p-3">
            <div>You can mail us at <Link href="mailto:ankush4singh@gmail.com" className=" underline underline-offset-4 hover:text-green-500"> ankush4singh@gmail.com</Link></div>
            <div>Or you can DM us on <Link href="https://instagram.com/weeblets_anime_store" className="underline underline-offset-4 hover:text-green-500">Instagram (@weeblets_anime_store)</Link></div>
        </div>
    </Layout>
}