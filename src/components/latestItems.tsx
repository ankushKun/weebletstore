import { Item } from "@/types"
import { useEffect, useState } from "react"
import ProductCard from "@/components/productCard"
import { urlFor } from "@/utils/sanity/client"

export default function Latest({ itype, limit, randomize = false }: { itype: string, limit: number, randomize?: boolean }) {
    const [items, setItems] = useState<Item[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        var l = randomize ? limit * 5 : limit
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 30 * 1000)
        fetch(`/api/latest?itype=${itype}&limit=${l}`)
            .then(res => res.json())
            .then((res: Item[]) => {
                let itms = res.sort()
                if (randomize)
                    itms = itms.sort(() => Math.random() - 0.5)
                itms = itms.slice(0, limit)

                setLoading(false)
                setItems(itms)

            })
    }, [itype, limit, randomize])


    return <>
        {
            items.map((item: Item) => {
                return <ProductCard
                    key={item._id}
                    src={urlFor(item.images[0])}
                    alt={item.name}
                    title={item.name}
                    price={item.price}
                    id={item._id}
                />
            })
        }
        {
            // custom loader
            loading && <div className="flex flex-col items-center justify-center gap-5 col-span-4">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-white"></div>
                <div className="text-white text-xl">Loading...</div>
            </div>
        }
    </>
}