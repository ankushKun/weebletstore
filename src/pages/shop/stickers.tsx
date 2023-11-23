import Layout from "@/components/layout";
import Image, { StaticImageData } from "next/image";
import { Button } from "@mantine/core";
import { IconArrowUpRight as UpRightArrow } from "@tabler/icons-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import ProductCard from "@/components/productCard";
import stickers from "@/assets/collection/stickers.png";

export default function Shop() {
    return (
        <Layout>
            <div className="my-5 text-center text-3xl">Browse All Stickers</div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 items-center justify-center p-1">
                <ProductCard
                    src={stickers}
                    alt="sticker"
                    title="Gojo Satoru Jujustu Kaisen sticker"
                    price={5}
                />
                <ProductCard
                    src={stickers}
                    alt="sticker"
                    title="Gojo Satoru Jujustu Kaisen sticker"
                    price={5}
                />
                <ProductCard
                    src={stickers}
                    alt="sticker"
                    title="Gojo Satoru Jujustu Kaisen sticker"
                    price={5}
                />
                <ProductCard
                    src={stickers}
                    alt="sticker"
                    title="Gojo Satoru Jujustu Kaisen sticker"
                    price={5}
                />
            </div>
        </Layout>
    );
}
