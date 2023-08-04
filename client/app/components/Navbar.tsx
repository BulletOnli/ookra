import {
    Avatar,
    HStack,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsSearch, BsCart } from "react-icons/bs";

const Navbar = () => {
    return (
        <nav className="sticky top-0 z-10 w-full px-4 py-5 bg-white flex items-center justify-around shadow-custom">
            <Link href="/">
                <div className="text-2xl font-bold tracking-wider">Ookra</div>
            </Link>

            <HStack spacing={10} fontWeight="medium">
                <Link href="#">Shop</Link>
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
                <BsCart className="text-3xl cursor-pointer" />

                <Menu>
                    <MenuButton bg="transparent">
                        <Avatar name="bullet" size="sm" />
                    </MenuButton>
                    <MenuList>
                        <MenuItem as={Link} href="#">
                            My Account
                        </MenuItem>
                        <MenuItem as={Link} href="#">
                            My Purchase
                        </MenuItem>
                        <MenuItem as={Link} href="#">
                            Logout
                        </MenuItem>
                    </MenuList>
                </Menu>
            </HStack>
        </nav>
    );
};

export default Navbar;
