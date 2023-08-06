import {
    Avatar,
    Button,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsSearch, BsCart2, BsCreditCard } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-10 w-full px-4 py-5 bg-white flex items-center justify-around shadow-custom">
            <Link href="/">
                <div className="text-2xl font-bold tracking-wider">Ookra</div>
            </Link>

            <HStack spacing={10} fontWeight="semibold">
                <Link href="#">Categories</Link>
                <Link href="#">New Arrival</Link>
                <Link href="#">Brands</Link>
            </HStack>

            <HStack spacing={5}>
                <InputGroup>
                    <InputLeftElement>
                        <BsSearch />
                    </InputLeftElement>
                    <Input type="search" placeholder="Search" rounded="full" />
                </InputGroup>
                <BsCart2 className="text-3xl cursor-pointer" />

                <Menu isLazy>
                    <MenuButton bg="transparent">
                        <Avatar name="bullet" size="sm" />
                    </MenuButton>
                    <MenuList>
                        <MenuItem
                            icon={<FaUserCircle size={17} />}
                            as={Link}
                            href="/user/bullet"
                            className="hover:bg-gray-100"
                        >
                            My Account
                        </MenuItem>
                        <MenuItem
                            icon={<BsCreditCard size={17} />}
                            as={Link}
                            href="#"
                            className="hover:bg-gray-100"
                        >
                            My Purchase
                        </MenuItem>
                        <MenuItem
                            icon={<MdOutlineLogout size={17} />}
                            as={Link}
                            href="/login"
                            className="hover:bg-gray-100"
                        >
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </nav>
    );
};

export default Navbar;
