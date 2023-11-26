// https://media.tenor.com/vPi50OlSEM4AAAAC/sorry-anime.gif

import Layout from "@/components/layout";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@mantine/core";
import { IconArrowUpRight as UpRightArrow } from "@tabler/icons-react";

export default function E404() {
  return (
    <Layout title="404 | Weeblet Store">
      <div className="flex h-[86vh] flex-col items-center justify-center">
        <div className="px-5 font-bold text-white sm:text-xl">Error 404</div>
        <Image
          src="https://media.tenor.com/vPi50OlSEM4AAAAC/sorry-anime.gif"
          alt="cri"
          width={400}
          height={400}
          className="rounded-xl object-cover object-center"
        />
        <div className="px-5 font-bold text-white sm:text-xl">
          I cant find what you are looking for
        </div>
        <Link href="/shop">
          <Button
            variant="filled"
            rightIcon={<UpRightArrow />}
            size="lg"
            className="my-10 block bg-white text-black transition-colors duration-200 hover:text-white"
          >
            {" "}
            <div>BROWSE OTHER PRODUCTS</div>
          </Button>
        </Link>
      </div>
    </Layout>
  );
}
