import Image from "next/image";
import { TextInput, Menu, Button } from "@mantine/core";
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
import { useEffect } from "react";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import profilePlaceholder from "@/assets/profile.webp";

export default function Navbar() {
  const { height, width } = useViewportSize();
  const [menuVisible, setMenuVisible] = useInputState(false);
  const [menuVisibleProxy, setMenuVisibleProxy] = useInputState(false);
  const [searchInput, setSearchInput] = useInputState("");
  const [cartCount, setCartCount] = useInputState(0);

  const session = useSession();

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
            <TextInput
              placeholder="Search by name"
              variant="unstyled"
              className="border-b"
              icon={<IconSearch />}
              value={searchInput}
              onChange={setSearchInput}
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
                      : session.data?.user?.image
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
                    <Menu.Item>Profile</Menu.Item>
                    <Menu.Item>Orders</Menu.Item>
                    <Menu.Item>Settings</Menu.Item>
                    <Menu.Item color="red" onClick={signOut}>
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
                className={`fixed bottom-0 left-0 top-24 z-30 flex h-full w-screen flex-col items-center justify-center gap-10 bg-black bg-opacity-80 backdrop-blur ${
                  menuVisible ? "slide-in-bottom" : "slide-out-bottom"
                }`}
              >
                <div className="flex h-[80%] w-[90%] flex-col items-end justify-start gap-5">
                  <Image
                    alt="profile"
                    src={
                      session.status == "unauthenticated"
                        ? profilePlaceholder
                        : session.data?.user?.image
                    }
                    className="mr-5 cursor-pointer rounded-full"
                    width={50}
                    height={50}
                    onClick={() => {
                      if (session.status != "authenticated") signIn("google");
                    }}
                  />
                  <Link href="/shop">
                    <Button>Shop</Button>
                  </Link>
                  <Link href="/about">
                    <Button>About</Button>
                  </Link>
                  <Link href="/contact">
                    <Button>Contact Us</Button>
                  </Link>
                  <Link href="/cart">
                    <Button>Cart({cartCount})</Button>
                  </Link>
                  {session.status == "authenticated" && (
                    <Button color="red" onClick={signOut}>
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
