import Image from "next/image"
import { TextInput, Menu, Button } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { useViewportSize } from '@mantine/hooks'
import { IconChevronDown as DownArrowIcon, IconSearch, IconMenu2 as MenuIcon, IconX as X } from "@tabler/icons-react"
import logo from "@/assets/weebletstore-transparent.png"
import { useEffect } from "react"
import Link from "next/link"

export default function Navbar() {
    const { height, width } = useViewportSize()
    const [menuVisible, setMenuVisible] = useInputState(false)
    const [menuVisibleProxy, setMenuVisibleProxy] = useInputState(false)
    const [searchInput, setSearchInput] = useInputState("")

    useEffect(() => {
        if (menuVisible)
            setMenuVisibleProxy(true)
        else
            setTimeout(() => setMenuVisibleProxy(false), 500)
    }, [menuVisible])


    return <nav className="bg-black text-white p-6 flex justify-between md:justify-evenly items-center h-24">
        <Link href="/" className="text-xl">
            <Image alt="Logo" src={logo} width={150} height={200} />
        </Link>
        {width > 768 && <>
            <div className="flex gap-4">
                <Menu trigger="hover" openDelay={100} closeDelay={100}>
                    <Menu.Target>
                        <Button rightIcon={<DownArrowIcon />}>Shop</Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                        <Menu.Item>
                            Stickers
                        </Menu.Item>
                        <Menu.Item>
                            Posters
                        </Menu.Item>
                        <Menu.Item>
                            Bookmarks
                        </Menu.Item>
                        <Menu.Item>
                            Coasters
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

            </div>
            <div>
                <TextInput placeholder="Search by name" variant="unstyled" className="border-b"
                    icon={<IconSearch />} value={searchInput} onChange={setSearchInput} />
            </div>
            <div className="flex gap-5 items-center">
                <div><Button>Cart(0)</Button></div>
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
            <button onClick={() => setMenuVisible(!menuVisible)}>
                {menuVisible ? <X size={30} /> : <MenuIcon size={30} />}
            </button>
            {menuVisibleProxy && <>
                <div className={`absolute left-0 top-24 bottom-0 w-screen h-full z-30 bg-black bg-opacity-80 flex flex-col items-center justify-center gap-10 ${menuVisible ? "slide-in-bottom" : "slide-out-bottom"}`}>
                    <div className="w-[90%] h-[80%] flex flex-col justify-start items-end gap-5">
                        <Button>Shop</Button>
                        <Button>About</Button>
                        <Button>Contact Us</Button>
                        <Button>Cart(0)</Button>
                    </div>
                </div>
            </>}
        </>}
    </nav>
}