import { ItemResponse, item } from "@/types"
import { useEffect, useState } from "react"
import ProductCard from "@/components/productCard"

export default function Latest({ itype, limit }: { itype: string, limit: number }) {
    const [items, setItems] = useState<ItemResponse>({})

    useEffect(() => {
        fetch(`/api/latest?itype=${itype}&limit=${limit}`)
            .then(res => res.json())
            .then(setItems)
    }, [itype, limit])


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
                />
            })
        }
    </>
}