import Navbar from "./navbar"
export default function Layout({ children }: any) {
    return (
        <main className="bg-[#131313]">
            <Navbar />
            {children}
        </main>
    )
}