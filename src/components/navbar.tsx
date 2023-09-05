import Image from "next/image"
import { TextInput, Menu, Button } from "@mantine/core"
import { useInputState } from "@mantine/hooks"
import { useViewportSize } from '@mantine/hooks'
import { IconChevronDown as DownArrowIcon, IconSearch } from "@tabler/icons-react"


export default function Navbar() {
    const { height, width } = useViewportSize()

    const [searchInput, setSearchInput] = useInputState("")


    return <nav className="bg-black text-white p-6 flex justify-evenly items-center">
        <div className="text-xl">WeebletStore</div>
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
            <Button>About</Button>
            <Button>Contact Us</Button>
        </div>
        <div>
            <TextInput placeholder="Search by name" variant="unstyled" className="border-b"
                icon={<IconSearch />} value={searchInput} onChange={setSearchInput} />
        </div>
        <div className="flex gap-5 items-center">
            <div><Button>Cart(0)</Button></div>
            <Menu trigger="hover" openDelay={100} closeDelay={100} >
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
            </Menu>
        </div>
    </nav>
}