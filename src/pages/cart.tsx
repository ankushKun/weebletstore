import Image from "next/image";
import Layout from "@/components/layout";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Button, Input, CloseButton } from "@mantine/core";
import { Item } from "@/types";
import { urlFor } from "@/utils/sanity/client";
import { useRouter } from "next/navigation";
import copy from "@/assets/copy.svg"

export default function Cart() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<Item[]>([]);
  const [productTotal, setProductTotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [promoOuter, setPromoOuter] = useState("");
  const [valid, setValid] = useState(false);
  const [emptyCart, setEmptyCart] = useState(false);

  const CartItem = ({
    title,
    img,
    price,
    quantity,
    id,
  }: {
    title: string;
    img: string;
    price: number;
    quantity: number;
    id: string;
  }) => {
    function deleteFromCart() {
      const cart = window.localStorage.getItem("cart");
      if (!cart) return;
      const cartObject = JSON.parse(cart);
      delete cartObject[id];
      localStorage.setItem("cart", JSON.stringify(cartObject));
      dispatchEvent(new Event("storage"));
      toast.success("Item removed from cart");
      setEmptyCart(Object.keys(cartObject).length == 0);
    }

    function decrement() {
      const cart = window.localStorage.getItem("cart");
      if (!cart) return;
      const cartObject = JSON.parse(cart);
      cartObject[id]--;
      if (cartObject[id] <= 0) delete cartObject[id];
      localStorage.setItem("cart", JSON.stringify(cartObject));
      dispatchEvent(new Event("storage"));
      toast.success("Item quantity decreased");
      setEmptyCart(Object.keys(cartObject).length == 0);
    }

    function increment() {
      const cart = window.localStorage.getItem("cart");
      if (!cart) return;
      const cartObject = JSON.parse(cart);
      cartObject[id]++;
      localStorage.setItem("cart", JSON.stringify(cartObject));
      dispatchEvent(new Event("storage"));
      toast.success("Item quantity increased");
      setEmptyCart(Object.keys(cartObject).length == 0);
    }

    // return <div className="flex gap-5 pb-5 px-5 border-b border-white/20">
    return (
      <div className="grid w-full grid-cols-5 gap-3 border-b border-white/20 px-5 pb-5">
        <div className="relative h-full w-full">
          <Image
            src={img}
            alt={title}
            fill
            className="rounded object-cover object-center"
          />
        </div>
        <div className="col-span-3 flex flex-col items-start justify-center gap-3">
          <div className="text-xl font-semibold text-white">{title}</div>
          <div className="text-lg text-white">₹{price}</div>
          <div className="flex items-center gap-5 text-lg text-white">
            <button onClick={decrement}>-</button> {quantity}{" "}
            <button onClick={increment}>+</button>
            <button onClick={deleteFromCart}>
              <IconTrash size={20} />
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="text-xl font-semibold">₹ {price * quantity}</div>
        </div>
      </div>
    );
  };

  async function checkout() {
    // checks
    const userData = await fetch("/api/my-profile", { method: "GET" })
    const userDataJson = await userData.json()
    if (userData.status != 200) return toast.error("Please update profile before checking out")
    if (!userDataJson.number) return toast.error("Please add phone number to your profile before checking out")
    if (!userDataJson.address) return toast.error("Please add address to your profile before checking out")
    if (!userDataJson.name) return toast.error("Please add name before to your profile checking out")
    if (!userDataJson.email) return toast.error("Please add email address to your profile before checking out")

    // return toast.success("Please wait while we redirect you to payment gateway")

    const items = cartItems.map((item) => { return { _id: item._id, qty: item.quantity } })
    const res = await fetch("/api/create-order", {
      method: "POST",
      body: JSON.stringify({
        items,
        promo: promoOuter,
        total: orderTotal
      }),
      headers: { "Content-Type": "application/json" },
    })
    const resData = await res.json()
    if (res.status != 200) return toast.error(resData.message)

    window.localStorage.removeItem("cart")
    router.push(`/pay/${resData.orderId}`)

    console.log(resData)
  }

  useEffect(() => {
    function fetchDetails() {
      if (!window) return;
      const cart = window.localStorage.getItem("cart");
      if (!cart) return;
      const cartObject = JSON.parse(cart);
      setEmptyCart(Object.keys(cartObject).length == 0);

      fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ items: cartObject, promo: promoOuter }),
        headers: { "Content-Type": "application/json" },
      })
        .then((res) => res.json())
        .then((res) => {
          setCartItems(res.items);
          setProductTotal(res.productTotal);
          setDelivery(res.delivery);
          setDiscount(res.discount);
          setOrderTotal(res.orderTotal);
          setValid(res.valid);
          if (res.valid) {
            toast.success(`${promoOuter} applied`);
          }
        });
    }

    fetchDetails();
    window.addEventListener("storage", fetchDetails);
  }, [promoOuter]);

  const Slip = () => {
    const [promoInner, setPromoInner] = useState(promoOuter);

    useEffect(() => {
      const timeOutId = setTimeout(() => setPromoOuter(promoInner), 400);
      return () => clearTimeout(timeOutId);
    }, [promoInner]);

    return (
      <div className="col-span-3 md:col-span-1 lg:mx-10">
        <div className="flex h-fit justify-center rounded-2xl py-5 ring-1 ring-white">
          <div className="flex h-fit w-[80%] flex-col gap-5">
            <div className="mb-5 text-center text-2xl uppercase">
              your order
            </div>
            {/* <input type="text" placeholder="Promo Code" className={`p-1 bg-transparent outline-none border-b ${(valid) ? "text-green-500" : "text-red-500"}`} autoFocus value={query} onChange={(e) => setQuery(e.target.value)} /> */}
            <Input
              placeholder="Promo Code"
              variant="unstyled"
              error={!valid && promoOuter}
              className={`border-b bg-transparent p-1 outline-none ${valid ? "text-green-500" : "text-red-500"
                }`}
              autoFocus
              value={promoInner}
              onChange={(e) => setPromoInner(e.target.value)}
              styles={{ input: { color: valid ? "rgb(34 197 94)" : "white" } }}
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={() => {
                    setPromoInner("");
                  }}
                  style={{ display: promoOuter ? undefined : "none" }}
                />
              }
            />
            <div className="grid grid-cols-2 gap-y-2 border-b pb-4">
              <div className="flex justify-start">Price</div>
              <div className="flex justify-end">₹ {productTotal}</div>
              <div
                className={`flex justify-start ${delivery == 0 && "text-green-500"
                  }`}
              >
                Delivery
              </div>
              <div
                className={`flex justify-end ${delivery == 0 && "text-green-500"
                  }`}
              >
                ₹ {delivery}
              </div>
              <div
                className={`flex justify-start ${discount < 0 ? "text-green-500" : " text-white/30"
                  }`}
              >
                Discount
              </div>
              <div
                className={`flex justify-end ${discount < 0 ? " text-green-500" : " text-white/30"
                  }`}
              >
                ₹ {discount}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-y-2 text-xl font-semibold">
              <div className="flex justify-start">Total</div>
              <div className="flex justify-end">₹ {orderTotal}</div>
            </div>
          </div>
        </div>
        <div className="flex justify-center p-5">
          <Button
            variant="light"
            color="gray"
            className="bg-white/80 text-black hover:text-white"
            onClick={checkout}
          >
            Proceed to Checkout
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Layout title="Cart | Weeblet Store">
      <div className="mx-10 grid grid-cols-3 gap-5">
        {!emptyCart ? (
          <>
            {/* <div className="col-span-3 mt-5 grid grid-cols-3 md:hidden">
              <Slip />
            </div> */}
            <div className="col-span-3 py-5 text-center text-2xl capitalize text-white">
              Your Cart
            </div>
            <div className="col-span-3 md:col-span-2">
              <div className="grid grid-cols-5">
                <div className="col-span-4"></div>
                <div className="flex items-center justify-center">
                  <div className="pr-6">subtotal</div>
                </div>
              </div>
              <div className="flex flex-col gap-5 border-t pt-5">
                {cartItems.map((item: Item) => {
                  return (
                    <CartItem
                      key={item._id}
                      id={item._id}
                      title={item.name}
                      img={urlFor(item.images[0])}
                      price={item.price}
                      quantity={item.quantity || 1}
                    />
                  );
                })}
              </div>
              <button className="flex gap-1 items-center justify-center mx-auto m-3" onClick={() => {
                const cart = window.localStorage.getItem("cart");
                if (!cart) return;
                const cartObject = JSON.parse(cart);
                const cartItems = Object.keys(cartObject).map((key) => {
                  return key.toString() + "x" + cartObject[key].toString()
                }).join(",")
                navigator.clipboard.writeText(cartItems)
                toast.success("Cart copied to clipboard")
              }}>copy cart
                <Image src={copy} alt="copy cart" width={17} height={17} />
              </button>
            </div>
            {/* SLIP */}
            <Slip />
          </>
        ) : (
          <div className="w-full py-5 text-center">no items in cart</div>
        )}
      </div>
    </Layout>
  );
}
