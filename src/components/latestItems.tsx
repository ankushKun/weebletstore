import { ItemResponse, item } from "@/types"
import { useEffect, useState } from "react"
import ProductCard from "@/components/productCard"

export default function Latest({ itype, limit, randomize = false }: { itype: string, limit: number, randomize?: boolean }) {
    const [items, setItems] = useState<ItemResponse>({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        var l = randomize ? limit * 2 : limit
        setLoading(true)
        setTimeout(() => {
            setLoading(false)
        }, 30 * 1000)
        fetch(`/api/latest?itype=${itype}&limit=${l}`)
            .then(res => res.json())
            .then(res => {
                const randomItems = Object.keys(res).sort(() => Math.random() - 0.5).slice(0, limit)
                const randomItemsObject: ItemResponse = {}
                randomItems.forEach((key) => {
                    randomItemsObject[key] = res[key]
                })
                setItems(randomItemsObject)
                setLoading(false)
            })
    }, [itype, limit, randomize])


    return <>
        {
            Object.keys(items).map((key) => {
                const item: item = items[key]
                return <ProductCard
                    key={key}
                    src={item.images[0]}
                    alt={item.name}
                    title={item.name}
                    price={item.price}
                    id={item.id}
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