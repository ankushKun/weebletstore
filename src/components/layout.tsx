import Navbar from "./navbar"
export default function Layout({ children }: any) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    )
}