import Image from "next/image";
import Layout from "@/components/layout";
import { ItemResponse } from "@/types";
import { useEffect, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import toast from "react-hot-toast";
import { Button, Input, CloseButton } from "@mantine/core";

export default function Cart() {
  const [cartItems, setCartItems] = useState<ItemResponse>({});
  const [productTotal, setProductTotal] = useState(0);
  const [delivery, setDelivery] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [orderTotal, setOrderTotal] = useState(0);
  const [query, setQuery] = useState("");
  const [coupon, setCoupon] = useState("");
  const [valid, setValid] = useState(false);

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
    }

    function increment() {
      const cart = window.localStorage.getItem("cart");
      if (!cart) return;
      const cartObject = JSON.parse(cart);
      cartObject[id]++;
      localStorage.setItem("cart", JSON.stringify(cartObject));
      dispatchEvent(new Event("storage"));
      toast.success("Item quantity increased");
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

  function checkout() {
    toast.success("Checkout coming soon");
  }

  useEffect(() => {
    const timeOutId = setTimeout(() => setCoupon(query), 250);
    return () => clearTimeout(timeOutId);
  }, [query]);

  useEffect(() => {
    function fetchDetails() {
      if (!window) return;
      const cart = window.localStorage.getItem("cart");
      if (!cart) return;
      const cartObject = JSON.parse(cart);

      fetch("/api/cart", {
        method: "POST",
        body: JSON.stringify({ items: cartObject, promo: coupon }),
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
        });
    }

    fetchDetails();
    window.addEventListener("storage", fetchDetails);
  }, [coupon]);

  const Slip = () => {
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
              error={!valid && coupon}
              className={`border-b bg-transparent p-1 outline-none ${
                valid ? "text-green-500" : "text-red-500"
              }`}
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              styles={{ input: { color: valid ? "rgb(34 197 94)" : "white" } }}
              rightSection={
                <CloseButton
                  aria-label="Clear input"
                  onClick={() => {
                    setCoupon("");
                    setQuery("");
                  }}
                  style={{ display: coupon ? undefined : "none" }}
                />
              }
            />
            <div className="grid grid-cols-2 gap-y-2 border-b pb-4">
              <div className="flex justify-start">Price</div>
              <div className="flex justify-end">₹ {productTotal}</div>
              <div
                className={`flex justify-start ${
                  delivery == 0 && "text-green-500"
                }`}
              >
                Delivery
              </div>
              <div
                className={`flex justify-end ${
                  delivery == 0 && "text-green-500"
                }`}
              >
                ₹ {delivery}
              </div>
              <div
                className={`flex justify-start ${
                  discount < 0 ? "text-green-500" : " text-white/30"
                }`}
              >
                Discount
              </div>
              <div
                className={`flex justify-end ${
                  discount < 0 ? " text-green-500" : " text-white/30"
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
        {Object.keys(cartItems).length > 0 ? (
          <>
            <div className="col-span-3 mt-5 grid grid-cols-3 md:hidden">
              <Slip />
            </div>
            <div className="col-span-3 py-5 text-center text-2xl capitalize text-white">
              Cart Items
            </div>
            <div className="col-span-3 md:col-span-2">
              <div className="grid grid-cols-5">
                <div className="col-span-4"></div>
                <div className="flex items-center justify-center">
                  <div className="pr-6">subtotal</div>
                </div>
              </div>
              <div className="flex flex-col gap-5 border-t pt-5">
                {Object.keys(cartItems).map((key) => {
                  const item = cartItems[key];
                  return (
                    <CartItem
                      key={key}
                      id={item.id}
                      title={item.name}
                      img={item.images[0]}
                      price={item.price}
                      quantity={item.quantity || 1}
                    />
                  );
                })}
              </div>
            </div>
            {/* SLIP */}
            <Slip />
          </>
        ) : (
          <>no items</>
        )}
      </div>
    </Layout>
  );
}
