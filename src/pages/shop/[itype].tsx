import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Layout from "@/components/layout";
import Latest from "@/components/latestItems";

export default function Stickers() {
    const router = useRouter()
    const itype = (router.query.itype as string)
    const itypeFixed = itype?.slice(0, -1)
    const [count, setCount] = useState(12)

    useEffect(() => {
        const getScrollPercent = () => {
            const h = document.documentElement,
                b = document.body,
                st = "scrollTop",
                sh = "scrollHeight";
            return ((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100;
        };

        const handleScroll = () => {
            const scrollPercent = getScrollPercent();
            if (scrollPercent > 70) {
                setCount(count + 8)
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [count]);

    return (
        <Layout>
            <div className="my-5 text-center text-3xl capitalize">Browse All {itype}</div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center justify-center p-1">
                <Latest itype={itypeFixed} limit={count} />
            </div>
        </Layout>
    );
}
