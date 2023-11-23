import Link from "next/link";
import Image, { StaticImageData } from "next/image";

export default function CollectionItem({ src, alt, url }: { src: StaticImageData; alt: string, url: string }) {
    return (
        <Link href={url} className="relative flex cursor-pointer items-center justify-center transition-transform duration-150 hover:scale-105">
            <Image src={src} alt={alt} />
        </Link>
    );
}