import Link from "next/link";
import Image, { StaticImageData } from "next/image";

import stickers from "@/assets/collection/stickers.png";
import coasters from "@/assets/collection/coasters.png";
import posters from "@/assets/collection/posters.png";
import bookmarks from "@/assets/collection/bookmarks.png";

export default function Collections() {

    function CollectionItem({ src, alt, url }: { src: StaticImageData; alt: string, url: string }) {
        return (
            <Link href={url} className="relative flex cursor-pointer items-center justify-center transition-transform duration-150 hover:scale-105">
                <Image src={src} alt={alt} />
            </Link>
        );
    }

    return <div className="py-10">
        <div className="text-center text-3xl">COLLECTIONS</div>
        <div className="my-10 grid grid-cols-2 p-5 items-center justify-center gap-7 lg:grid-cols-4">
            <CollectionItem url="/shop/stickers" alt="stickers" src={stickers} />
            <CollectionItem url="/shop/coasters" alt="coasters" src={coasters} />
            <CollectionItem url="/shop/posters" alt="posters" src={posters} />
            <CollectionItem url="/shop/bookmarks" alt="bookmarks" src={bookmarks} />
        </div>
    </div>
}