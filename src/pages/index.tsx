import { useEffect, useState, useRef } from "react";
import Layout from "@/components/layout";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";
import { IconArrowUpRight as UpRightArrow } from "@tabler/icons-react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import makimaBanner from "@/assets/banners/makima.png";
import zoroBanner from "@/assets/banners/zoro.png";
import powerBanner from "@/assets/banners/power.png";
import newArrivals from "@/assets/banners/new-arrivals.png";
import Collections from "@/components/collections";
import Latest from "@/components/latestItems";
import { useHorizontalScroll } from "@/hooks/sideScroll";

function CarouselSlide({ src, alt }: { src: StaticImageData; alt: string }) {
  return (
    <div className="bg-black min-h-[250px] md:min-h-[450px]">
      <Image alt={alt} src={src} fill className="object-cover object-center" />
    </div>
  );
}

export default function Home() {
  const sticker = useHorizontalScroll();
  const coaster = useHorizontalScroll();
  const poster = useHorizontalScroll();
  const bookmark = useHorizontalScroll();
  const [activeRef, setActiveRef] = useState<any>();
  const [direction, setDirection] = useState(0)

  return (
    <Layout>
      <Carousel autoPlay dynamicHeight emulateTouch infiniteLoop renderIndicator={undefined} showArrows={false} showStatus={false} showThumbs={false} showIndicators={false} swipeable>
        <CarouselSlide src={makimaBanner} alt="makima" />
        <CarouselSlide src={zoroBanner} alt="zoro" />
        <CarouselSlide src={powerBanner} alt="power" />
      </Carousel>

      <div className="relative mx-auto mb-5 flex h-[300px] w-full overflow-clip rounded-b-[40px]">
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
      <Collections />
      <div className="flex flex-col gap-16">
        <div>
          <div className="mb-5 pl-20 text-3xl">Browse Stickers</div>
          <div className="flex overflow-scroll p-0.5 gap-4 px-2"
            ref={sticker}>
            <Latest itype="sticker" limit={4} randomize />
          </div>
        </div>
        <div>
          <div className="mb-5 pl-20 text-3xl">Browse Coasters</div>
          <div className="flex overflow-scroll p-0.5 gap-4 px-2"
            ref={coaster}>
            <Latest itype="coaster" limit={4} randomize />
          </div>
        </div>
        <div>
          <div className="mb-5 pl-20 text-3xl">Browse Posters</div>
          <div className="flex overflow-scroll p-0.5 gap-4 px-2"
            ref={poster} >
            <Latest itype="poster" limit={4} randomize />
          </div>
        </div>
        <div>
          <div className="mb-5 pl-20 text-3xl">Browse Bookmarks</div>
          <div className="flex overflow-scroll p-0.5 gap-4 px-2"
            ref={bookmark}>
            <Latest itype="bookmark" limit={4} randomize />
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
