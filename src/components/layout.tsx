import Head from "next/head"
import Navbar from "./navbar"
import Footer from "./footer"
import { Toaster } from "react-hot-toast"

export default function Layout({ children, title = "Weeblet Store" }: { children: any, title?: string }) {
    return (
        <main className="bg-[#131313]">
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <Toaster position="bottom-center" />
            <div className="min-h-[85vh] mt-24">{children}</div>
            <Footer />
        </main>
    )
}