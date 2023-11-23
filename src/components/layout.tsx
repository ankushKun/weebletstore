import Head from "next/head"
import Navbar from "./navbar"
import Footer from "./footer"
export default function Layout({ children, title = "Weeblet Store" }: { children: any, title?: string }) {
    return (
        <main className="bg-[#131313]">
            <Head>
                <title>{title}</title>
            </Head>
            <Navbar />
            <div className="min-h-[85vh] p-3 px-5">{children}</div>
            <Footer />
        </main>
    )
}