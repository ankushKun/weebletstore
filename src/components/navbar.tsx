import Image from "next/image"
import { TextInput, Menu, Button } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { useViewportSize } from '@mantine/hooks'
import { IconChevronDown as DownArrowIcon, IconSearch, IconMenu2 as MenuIcon, IconX as X, IconShoppingCartFilled as Cart } from "@tabler/icons-react"
import logo from "@/assets/weebletstore-transparent.png"
import { useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
    const { height, width } = useViewportSize()
    const [menuVisible, setMenuVisible] = useInputState(false)
    const [menuVisibleProxy, setMenuVisibleProxy] = useInputState(false)
    const [searchInput, setSearchInput] = useInputState("")
    const [cartCount, setCartCount] = useInputState(0)


    useEffect(() => {
        if (!window) return
        function updateCartCount() {
            if (!window) return
            const cart = JSON.parse(localStorage.getItem("cart") || "{}")
            setCartCount(Object.keys(cart).length)
        }
        updateCartCount()
        window.addEventListener("storage", updateCartCount)
    }, [])

    useEffect(() => {
        if (menuVisible)
            setMenuVisibleProxy(true)
        else
            setTimeout(() => setMenuVisibleProxy(false), 500)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [menuVisible])


    return <nav className="bg-black text-white p-6 flex justify-between md:justify-evenly items-center h-24 fixed left-0 top-0 right-0 z-30">
        <Link href="/" className="text-xl">
            <Image alt="Logo" src={logo} width={150} height={200} />
        </Link>
        {width > 768 && <>
            <div className="flex gap-4">
                <Menu trigger="hover" openDelay={100} closeDelay={100}>
                    <Menu.Target>
                        <Link href="/shop"><Button rightIcon={<DownArrowIcon />}>Shop</Button></Link>
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
                <TextInput placeholder="Search by name" variant="unstyled" className="border-b"
                    icon={<IconSearch />} value={searchInput} onChange={setSearchInput} />
            </div>
            <div className="flex gap-5 items-center">
                <Link href="/cart"><Button className="relative">
                    <div className="text-black p-0.5 px-1 font-extrabold bg-white rounded-full ">{cartCount}</div>
                    <Cart size={30} className="z-0" />
                </Button></Link>
                {/* <Menu trigger="hover" openDelay={100} closeDelay={100} >
                    <Menu.Target>
                        <Image alt="Profile" src="/media/profile.webp" className="rounded-full cursor-pointer" width={50} height={50} />
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item>
                            Profile
                        </Menu.Item>
                        <Menu.Item>
                            Orders
                        </Menu.Item>
                        <Menu.Item>
                            Settings
                        </Menu.Item>
                        <Menu.Item color="red">
                            Logout
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu> */}
            </div>
        </>}

        {width <= 768 && <>
            <div className="flex gap-2">
                <Link href="/cart"><Button className="relative">
                    <div className="text-black p-0.5 px-1 font-extrabold bg-white rounded-full ">{cartCount}</div>
                    <Cart size={30} className="z-0" />
                </Button></Link>
                <button onClick={() => setMenuVisible(!menuVisible)}>
                    {menuVisible ? <X size={30} /> : <MenuIcon size={30} />}
                </button>
            </div>
            {menuVisibleProxy && <>
                <div className={`fixed left-0 top-24 bottom-0 w-screen h-full z-30 bg-black backdrop-blur bg-opacity-80 flex flex-col items-center justify-center gap-10 ${menuVisible ? "slide-in-bottom" : "slide-out-bottom"}`}>
                    <div className="w-[90%] h-[80%] flex flex-col justify-start items-end gap-5">
                        <Link href="/shop"><Button>Shop</Button></Link>
                        <Link href="/about"><Button>About</Button></Link>
                        <Link href="/contact"><Button>Contact Us</Button></Link>
                        <Link href="/cart"><Button>Cart({cartCount})</Button></Link>
                    </div>
                </div>
            </>}
        </>}
    </nav>
}