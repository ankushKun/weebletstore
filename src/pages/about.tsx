import Layout from "@/components/layout";
import logo from "@/assets/OC.png";
import Image from "next/image";
import Link from "next/link";

export default function About() {
    return <Layout title="About | Weeblet Store">
        <div className="text-center text-lg md:text-2xl mx-5 md:mx-10 md:leading-10  min-h-[80%] flex flex-col justify-center items-center p-3">
            <Image alt="icon" src={logo} width={300} height={300} className="mx-auto my-10" draggable={false} />
            Hi, I am Weeblet 👋<br />
            I am a 19 year old engineering sophomore from India<br />
            I am a software developer and I love to code<br /> (Built this entire website on my own)<br />
            I usually do freelancing and have started this website to sell cool anime merch<br />
            <div>Checkout my <Link href="https://ankushKun.github.io" target="_blank" className="underline underline-offset-8 hover:text-green-500">portfolio &gt;_&lt;</Link></div>
        </div>
    </Layout>
}