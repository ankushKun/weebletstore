import { Item } from "@/types";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCard";
import { urlFor } from "@/utils/sanity/client";

export default function Latest({
  itype,
  limit,
  randomize = false,
}: {
  itype: string;
  limit: number;
  randomize?: boolean;
}) {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    var l = randomize ? limit * 5 : limit;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 30 * 1000);
    fetch(`/api/latest?itype=${itype}&limit=${l}`)
      .then((res) => res.json())
      .then((res: Item[]) => {
        let itms = res.sort();
        if (randomize) itms = itms.sort(() => Math.random() - 0.5);
        itms = itms.slice(0, limit);

        setLoading(false);
        setItems(itms);
      });
  }, [itype, limit, randomize]);

  return (
    <>
      {items.map((item: Item) => {
        return <ProductCard key={item._id} item={item} alt={item.name} />;
      })}
      {
        // custom loader
        loading && (
          <div className="col-span-4 row-span-4 mx-auto flex flex-col items-center justify-center gap-5">
            <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
            <div className="text-xl text-white">Loading...</div>
          </div>
        )
      }
    </>
  );
}
