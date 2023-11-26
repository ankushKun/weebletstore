import { useRouter } from "next/router";
import Layout from "@/components/layout";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Item } from "@/types";

export async function getServerSideProps({ query }) {
  const base =
    process.env.ENV === "DEV" ? process.env.DEV_URL : process.env.PROD_URL;
  const item = await fetch(base + `/api/item-details?id=${query.id}`).then(
    (res) => res.json(),
  );

  return { props: { item } };
}

export default function Product({ item }: { item: Item }) {
  const [imagePos, setImagePos] = useState(0);

  return (
    <Layout>
      <div className="flex">
        <div className="flex">
          <Image
            src={item.images[imagePos]}
            alt={item.name}
            width={500}
            height={500}
          />
          <div>
            {item.images.map((image, index) => (
              <Image
                key={index}
                src={image}
                alt={item.name}
                width={100}
                height={100}
                onClick={() => setImagePos(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
