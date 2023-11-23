import Layout from "@/components/layout";
import { ItemResponse } from "@/types";
import { useEffect, useState } from "react";

export default function Cart() {
    const [cartItems, setCartItems] = useState<ItemResponse>({})

    useEffect(() => {
        if (!window) return
        const cart = window.localStorage.getItem("cart")
        if (!cart) return
        const cartObject = JSON.parse(cart)
        fetch("/api/item-details", {
            method: "POST",
            body: JSON.stringify(cartObject)
        }).then(res => res.json()).then(res => {
            console.log(res)
            setCartItems(res)
        })
    }, [])

    return <Layout title="Cart | Weeblet Store">
        hello :3
    </Layout>
}