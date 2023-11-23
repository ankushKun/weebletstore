import { Button } from "@mantine/core"

export default function Footer() {
    return <div className="bg-black w-full p-10 mt-5">
        <div className="text-center mb-5">© weebletstore.in 2023</div>
        <div className="w-full flex items-center justify-center gap-4">
            <Button>About</Button>
            <Button>Contact Us</Button>
        </div>
    </div>
}