import Layout from "@/components/layout";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";
import { IconArrowUpRight as UpRightArrow } from "@tabler/icons-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import ProductCard from "@/components/productCard";
import CollectionItem from "@/components/collectionItem";
import makimaBanner from "@/assets/banners/makima.png";
import zoroBanner from "@/assets/banners/zoro.png";
import powerBanner from "@/assets/banners/power.png";
import newArrivals from "@/assets/banners/new-arrivals.png";
import stickers from "@/assets/collection/stickers.png";
import coasters from "@/assets/collection/coasters.png";
import posters from "@/assets/collection/posters.png";
import bookmarks from "@/assets/collection/bookmarks.png";

function CarouselSlide({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className="bg-black min-h-[250px] md:min-h-[450px]">
      <Image alt={alt} src={src} fill className="object-cover object-center" />
    </div>
  );
}

export default function Home() {

  return (
    <Layout>
      <Carousel autoPlay dynamicHeight emulateTouch infiniteLoop renderIndicator={undefined} showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} swipeable>
        <CarouselSlide src={makimaBanner} alt="makima" />
        <CarouselSlide src={zoroBanner} alt="zoro" />
        <CarouselSlide src={powerBanner} alt="power" />
      </Carousel>
      <div className="relative mx-auto mb-5 flex h-[300px] w-[98%] overflow-clip rounded-b-[40px]">
        <div className="z-20 flex w-[50%] flex-col items-center justify-center gap-5 p-5 text-black">
          <div className="text-4xl font-bold">NEWEST ARRIVALS</div>
          <Link href="/shop">
            <Button
              variant="filled"
              rightIcon={<UpRightArrow />}
              size="lg"
              className="block bg-white text-black transition-colors duration-200 hover:text-white"
            >
              {" "}
              <div>SHOP NOW</div>
            </Button>
          </Link>
        </div>
        <Image
          alt="banner"
          src={newArrivals}
          fill
          className="z-10 object-cover object-center"
        />
      </div>
      <div className="py-10">
        <div className="text-center text-3xl">COLLECTIONS</div>
        <div className="my-10 grid grid-cols-2 p-5 items-center justify-center gap-7 lg:grid-cols-4">
          <CollectionItem url="/shop/stickers" alt="stickers" src={stickers} />
          <CollectionItem url="/shop/coasters" alt="coasters" src={coasters} />
          <CollectionItem url="/shop/posters" alt="posters" src={posters} />
          <CollectionItem url="/shop/bookmarks" alt="bookmarks" src={bookmarks} />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div>
          <div className="mb-5 pl-20 text-3xl">Latest Stickers</div>
          <div className="flex overflow-scroll p-0.5 gap-4 px-2">
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
        </div>
        <div>
          <div className="mb-5 pl-20 text-3xl">Latest Coasters</div>
          <div className="flex overflow-scroll p-0.5 gap-4 px-2">
            <ProductCard
              src={stickers}
              alt="coaster"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="coaster"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="coaster"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="coaster"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
          </div>
        </div>
        <div>
          <div className="mb-5 pl-20 text-3xl">Latest Posters</div>
          <div className="flex overflow-scroll p-0.5 gap-4 px-2">
            <ProductCard
              src={stickers}
              alt="poster"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="poster"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="poster"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="poster"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
          </div>
        </div>
        <div>
          <div className="mb-5 pl-20 text-3xl">Latest Bookmarks</div>
          <div className="flex overflow-scroll p-0.5 gap-4 px-2">
            <ProductCard
              src={stickers}
              alt="bookmark"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="bookmark"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="bookmark"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
            <ProductCard
              src={stickers}
              alt="bookmark"
              title="Gojo Satoru Jujustu Kaisen sticker"
              price={5}
            />
          </div>
        </div>
        <Link href="/shop" className="w-full">
          <Button
            variant="filled"
            rightIcon={<UpRightArrow />}
            size="lg"
            radius={0}
            className="w-full block bg-white text-black transition-colors duration-200 hover:text-white"
          >
            {" "}
            <div>BROWSE ALL</div>
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
