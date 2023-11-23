// https://media.tenor.com/vPi50OlSEM4AAAAC/sorry-anime.gif

import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";
import { IconArrowUpRight as UpRightArrow } from "@tabler/icons-react";

export default function E404() {
    return <Layout title="404 | Weeblet Store">
        <div className="flex flex-col items-center justify-center h-[86vh]">
            <Image src="https://media.tenor.com/vPi50OlSEM4AAAAC/sorry-anime.gif" alt="cri" width={400} height={400} className="object-cover object-center rounded-xl" />
            <div className="sm:text-xl relative -top-8 text-black backdrop-blur px-5 font-bold">I cant find what you are looking for</div>
            <Link href="/shop">
                <Button
                    variant="filled"
                    rightIcon={<UpRightArrow />}
                    size="lg"
                    className="block bg-white text-black transition-colors duration-200 hover:text-white my-10"
                >
                    {" "}
                    <div>BROWSE OTHER PRODUCTS</div>
                </Button>
            </Link>
        </div>
    </Layout>
}