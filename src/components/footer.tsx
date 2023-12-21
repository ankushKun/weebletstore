import Link from "next/link";
import { Button } from "@mantine/core";
import { IconBrandInstagram } from "@tabler/icons-react";

export default function Footer() {
  return (
    <div className="mt-5 flex w-full flex-col justify-around gap-6 bg-black p-10 md:flex-row">
      <div>
        <Link
          href="https://instagram.com/weebletstore"
          target="_blank"
          className="flex items-center justify-center gap-2"
        >
          <IconBrandInstagram size={30} />
          @weebletstore
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        <div className="text-center">© weebletstore.in 2023</div>
        <div className="flex w-full items-center justify-center gap-4">
          <Link href="/about">
            <Button>About</Button>
          </Link>
          <Link href="/contact">
            <Button>Contact Us</Button>
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-2 text-center">
        <Link href="/tnc">Terms & Conditions</Link>
        <Link href="/privacy">Privacy Policy</Link>
        <Link href="/shipping">Shipping Policy</Link>
      </div>
    </div>
  );
}
