import Navbar from "./navbar"
import Footer from "./footer"
export default function Layout({ children }: any) {
    return (
        <main className="bg-[#131313]">
            <Navbar />
            {children}
            <Footer />
        </main>
    )
}