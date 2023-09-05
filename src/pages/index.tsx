import Layout from "@/components/layout"
import { useRef } from "react"
import { Carousel } from '@mantine/carousel'
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import { Button } from "@mantine/core"
import { IconArrowUpRight as UpRightArrow } from "@tabler/icons-react"
import makima from "../assets/banners/makima.jpg"

export default function Home() {
  const autoplay = useRef(Autoplay({ delay: 3000 }))

  return (
    <Layout>
      <Carousel maw={"100%"} withIndicators={true} withControls={false}
        height={500} loop slideGap={0} withKeyboardEvents
        plugins={[autoplay.current]}
        onMouseEnter={() => autoplay.current.play}
        onMouseLeave={() => autoplay.current.play}
      >
        <Carousel.Slide className="bg-black">
          <Image alt="banner" src={makima} layout="fill" objectFit="cover" />
        </Carousel.Slide>
        <Carousel.Slide className="bg-black">
          <Image alt="banner" src="/media/profile.webp" layout="fill" objectFit="cover" />
        </Carousel.Slide>
        <Carousel.Slide className="bg-black">
          <Image alt="banner" src="/media/profile.webp" layout="fill" objectFit="cover" />
        </Carousel.Slide>
      </Carousel>
      <div className="relative flex h-[300px] w-[98%] mb-5 mx-auto rounded-b-[40px] overflow-clip" >
        <div className="z-20 text-black p-5 w-[50%] justify-center flex items-center flex-col gap-5">
          <div className="text-4xl">NEWEST ARRIVALS</div>
          <Button variant="filled" rightIcon={<UpRightArrow />} size="lg"
            className="text-black bg-white hover:text-white block transition-colors duration-200"
          > <div>SHOP NOW</div></Button>
        </div>
        <Image alt="banner" src="/media/profile.webp" fill objectFit="cover" className="z-10" />
      </div>
    </Layout >
  )
}
