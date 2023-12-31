import Image from "next/image";
import { Menu, Button, Select } from "@mantine/core";
import { useInputState } from "@mantine/hooks";
import { useViewportSize } from "@mantine/hooks";
import {
  IconChevronDown as DownArrowIcon,
  IconSearch,
  IconMenu2 as MenuIcon,
  IconX as X,
  IconShoppingCartFilled as Cart,
} from "@tabler/icons-react";
import logo from "@/assets/weebletstore-transparent.png";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import profilePlaceholder from "@/assets/profile.webp";
import { Item } from "@/types";
import { urlFor } from "@/utils/sanity/client";

export default function Navbar() {
  const { height, width } = useViewportSize();
  const [menuVisible, setMenuVisible] = useInputState(false);
  const [menuVisibleProxy, setMenuVisibleProxy] = useInputState(false);
  const [cartCount, setCartCount] = useInputState(0);
  const [searchQuery, setSearchQuery] = useInputState("");
  const [searchQueryProxy, setSearchQueryProxy] = useInputState("");
  const [searchResults, setSearchResults] = useState<Item[]>([]);

  const session = useSession();

  useEffect(() => {
    if (!searchQuery) return;
    fetch(`/api/search?query=${searchQuery}`)
      .then((res) => res.json())
      .then((res) => setSearchResults(res));
  }, [searchQuery]);

  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(searchQueryProxy), 250);
    return () => clearTimeout(t);
  }, [searchQueryProxy]);

  useEffect(() => {
    if (!window) return;
    function updateCartCount() {
      if (!window) return;
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      setCartCount(Object.keys(cart).length);
    }
    updateCartCount();
    window.addEventListener("storage", updateCartCount);
  }, []);

  useEffect(() => {
    if (menuVisible) setMenuVisibleProxy(true);
    else setTimeout(() => setMenuVisibleProxy(false), 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuVisible]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-30 flex h-24 items-center justify-between bg-black p-6 text-white md:justify-evenly">
      <Link href="/" className="text-xl">
        <Image alt="Logo" src={logo} width={150} height={200} />
      </Link>
      {width > 768 && (
        <>
          <div className="flex gap-4">
            <Menu trigger="hover" openDelay={100} closeDelay={100}>
              <Menu.Target>
                <Link href="/shop">
                  <Button rightIcon={<DownArrowIcon />}>Shop</Button>
                </Link>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item>
                  <Link href="/shop/stickers">Stickers</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/shop/posters">Posters</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/shop/bookmarks">Bookmarks</Link>
                </Menu.Item>
                <Menu.Item>
                  <Link href="/shop/coasters">Coasters</Link>
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </div>
          <div>
            <Select
              data={searchResults.map((item) => {
                return { value: item._id, label: item.name };
              })}
              searchable
              placeholder="Search by name"
              variant="unstyled"
              className="border-b"
              icon={<IconSearch />}
              onSearchChange={setSearchQueryProxy}
              limit={10}
              dropdownComponent={() => {
                return (
                  <div className="flex w-full flex-col gap-1 overflow-scroll rounded p-0.5">
                    {searchResults.map((item) => {
                      return (
                        <Link href={`/product/${item.slug.current}`}>
                          <div className="flex w-full items-center gap-2 rounded p-1 hover:bg-slate-900">
                            <Image
                              src={urlFor(item.images[0])}
                              width={50}
                              height={50}
                              alt={item.slug.current}
                              className="rounded"
                            />
                            <div>
                              <div>{item.name}</div>
                              <div className="text-sm text-white/70">
                                {item.anime}
                              </div>
                              <div className="text-sm text-white/70">
                                {item.itype}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              }}
            />
          </div>
          <div className="flex items-center gap-5">
            <Link href="/cart">
              <Button className="relative">
                <div className="rounded-full bg-white p-0.5 px-1 font-extrabold text-black ">
                  {cartCount}
                </div>
                <Cart size={30} className="z-0" />
              </Button>
            </Link>
            <Menu trigger="hover" openDelay={100} closeDelay={100}>
              <Menu.Target>
                <Image
                  alt="Profile"
                  src={
                    session.status == "unauthenticated"
                      ? profilePlaceholder
                      : (session.data?.user?.image as string)
                  }
                  className="cursor-pointer rounded-full"
                  width={50}
                  height={50}
                  onClick={() => {
                    if (session.status != "authenticated") signIn("google");
                  }}
                />
              </Menu.Target>
              {session.status != "unauthenticated" && (
                <Menu.Dropdown>
                  <>
                    <Menu.Item>
                      <Link href="/me">Profile</Link>
                    </Menu.Item>
                    <Menu.Item>
                      <Link href="/orders">Orders</Link>
                    </Menu.Item>
                    {/* <Menu.Item>Settings</Menu.Item> */}
                    <Menu.Item color="red" onClick={() => signOut()}>
                      Logout
                    </Menu.Item>
                  </>
                </Menu.Dropdown>
              )}
            </Menu>
          </div>
        </>
      )}

      {width <= 768 && (
        <>
          <div className="flex gap-2">
            <Link href="/cart">
              <Button className="relative">
                <div className="rounded-full bg-white p-0.5 px-1 font-extrabold text-black ">
                  {cartCount}
                </div>
                <Cart size={30} className="z-0" />
              </Button>
            </Link>
            <button onClick={() => setMenuVisible(!menuVisible)}>
              {menuVisible ? <X size={30} /> : <MenuIcon size={30} />}
            </button>
          </div>
          {menuVisibleProxy && (
            <>
              <div
                className={`fixed bottom-0 left-0 top-24 z-30 flex h-full w-screen flex-col items-center justify-center gap-10 bg-black bg-opacity-80 backdrop-blur ${menuVisible ? "slide-in-bottom" : "slide-out-bottom"
                  }`}
              >
                <div className="flex h-[80%] w-[90%] flex-col items-end justify-start gap-5">
                  <Image
                    alt="profile"
                    src={
                      session.status == "unauthenticated"
                        ? profilePlaceholder
                        : (session.data?.user?.image as string)
                    }
                    className="mr-5 cursor-pointer rounded-full"
                    width={50}
                    height={50}
                    onClick={() => {
                      if (session.status != "authenticated") signIn("google");
                    }}
                  />
                  <Select
                    data={searchResults.map((item) => {
                      return { value: item._id, label: item.name };
                    })}
                    searchable
                    placeholder="Search by name"
                    variant="unstyled"
                    className="border-b"
                    icon={<IconSearch />}
                    onSearchChange={setSearchQueryProxy}
                    limit={10}
                    dropdownComponent={() => {
                      return (
                        <div className="flex w-full flex-col gap-1 overflow-scroll rounded p-0.5">
                          {searchResults.map((item) => {
                            return (
                              <Link href={`/product/${item.slug.current}`}>
                                <div className="flex w-full items-center gap-2 rounded p-1 hover:bg-slate-900">
                                  <Image
                                    src={urlFor(item.images[0])}
                                    width={50}
                                    height={50}
                                    alt={item.slug.current}
                                    className="rounded"
                                  />
                                  <div>
                                    <div>{item.name}</div>
                                    <div className="text-sm text-white/70">
                                      {item.anime}
                                    </div>
                                    <div className="text-sm text-white/70">
                                      {item.itype}
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      );
                    }}
                  />
                  <Link href="/me">
                    <Button>Profile</Button>
                  </Link>
                  <Link href="/orders">
                    <Button>Orders</Button>
                  </Link>
                  <Link href="/shop">
                    <Button>Shop</Button>
                  </Link>
                  <Link href="/cart">
                    <Button>Cart({cartCount})</Button>
                  </Link>
                  {session.status == "authenticated" && (
                    <Button color="red" onClick={() => signOut()}>
                      Logout
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </nav>
  );
}
