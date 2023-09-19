import Layout from "@/components/layout"
import { useRef } from "react"
import { Carousel } from '@mantine/carousel'
import Autoplay from "embla-carousel-autoplay"
import Image, { StaticImageData } from "next/image"
import { Button } from "@mantine/core"
import { IconArrowUpRight as UpRightArrow } from "@tabler/icons-react"
import ProductCard from "@/components/productCard"
import makimaBanner from "../assets/banners/makima.png"
import zoroBanner from "../assets/banners/zoro.png"
import powerBanner from "../assets/banners/power.png"
import newArrivals from "../assets/banners/new-arrivals.png"
import stickers from "../assets/collection/stickers.png"
import coasters from "../assets/collection/coasters.png"
import posters from "../assets/collection/posters.png"
import bookmarks from "../assets/collection/bookmarks.png"

function CarouselSlide({ src, alt }: { src: StaticImageData, alt: string }) {
  return <Carousel.Slide className="bg-black">
    <Image alt={alt} src={src} fill />
  </Carousel.Slide>
}

function CollectionItem({ src, alt }: { src: StaticImageData, alt: string }) {
  return <div className="relative cursor-pointer hover:scale-105 transition-transform duration-150">
    <Image src={src} alt={alt} />
  </div>
}

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 3000 }))

  return (
    <Layout>
      <Carousel maw={"100%"} withIndicators={true} withControls={false}
        height={450} loop slideGap={0} withKeyboardEvents
        plugins={[autoplay.current]}
        onMouseEnter={() => autoplay.current.play}
        onMouseLeave={() => autoplay.current.play}
      >
        <CarouselSlide src={zoroBanner} alt="zoro banner" />
        <CarouselSlide src={makimaBanner} alt="makima banner" />
        <CarouselSlide src={powerBanner} alt="power banner" />
      </Carousel>
      <div className="relative flex h-[300px] w-[98%] mb-5 mx-auto rounded-b-[40px] overflow-clip" >
        <div className="z-20 text-black p-5 w-[50%] justify-center flex items-center flex-col gap-5">
          <div className="text-4xl">NEWEST ARRIVALS</div>
          <Button variant="filled" rightIcon={<UpRightArrow />} size="lg"
            className="text-black bg-white hover:text-white block transition-colors duration-200"
          > <div>SHOP NOW</div></Button>
        </div>
        <Image alt="banner" src={newArrivals} fill objectFit="cover" className="z-10" />
      </div>
      <div className="py-10">
        <div className="text-center text-3xl">COLLECTIONS</div>
        <div className="flex justify-evenly items-baseline my-10">
          <CollectionItem alt="stickers" src={stickers} />
          <CollectionItem alt="coasters" src={coasters} />
          <CollectionItem alt="posters" src={posters} />
          <CollectionItem alt="bookmarks" src={bookmarks} />
        </div>
      </div>
      <div className="flex flex-col gap-16">
        <div>
          <div className="pl-20 text-3xl mb-5">Latest Stickers</div>
          <div className="flex justify-evenly">
            <ProductCard src={stickers} alt="sticker" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="sticker" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="sticker" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="sticker" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
          </div>
        </div>
        <div>
          <div className="pl-20 text-3xl mb-5">Latest Coasters</div>
          <div className="flex justify-evenly">
            <ProductCard src={stickers} alt="coaster" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="coaster" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="coaster" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="coaster" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
          </div>
        </div>
        <div>
          <div className="pl-20 text-3xl mb-5">Latest Posters</div>
          <div className="flex justify-evenly">
            <ProductCard src={stickers} alt="poster" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="poster" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="poster" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="poster" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
          </div>
        </div>
        <div>
          <div className="pl-20 text-3xl mb-5">Latest Bookmarks</div>
          <div className="flex justify-evenly">
            <ProductCard src={stickers} alt="bookmark" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="bookmark" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="bookmark" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
            <ProductCard src={stickers} alt="bookmark" title="Gojo Satoru Jujustu Kaisen sticker" price={5} />
          </div>
        </div>
        <Button variant="filled" rightIcon={<UpRightArrow />} size="lg"
          className="text-black bg-white hover:text-white block transition-colors duration-200"
        > <div>BROWSE ALL</div></Button>
      </div>
    </Layout>
  )
}
