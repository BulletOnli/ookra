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
    useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { BsSearch, BsCart2, BsCreditCard } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useUserStore from "@/stores/userStore";
import { useRouter } from "next/navigation";

const Cart = dynamic(() => import("./cart/Cart"));

const Navbar = () => {
    const router = useRouter();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { accountDetails, getAccountDetails, logoutUser } = useUserStore();

    useEffect(() => {
        getAccountDetails();
    }, []);

    const handleLogout = () => {
        logoutUser();
        router.push("/login");
    };

    return (
        <>
            <nav className="sticky top-0 z-10 w-full px-4 py-5 bg-white flex items-center justify-around shadow-custom">
                <Link href="/">
                    <div className="text-2xl font-bold tracking-wider">
                        Ookra
                    </div>
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
                        <Input
                            type="search"
                            placeholder="Search"
                            rounded="full"
                        />
                    </InputGroup>
                    <BsCart2
                        className="text-3xl cursor-pointer"
                        onClick={() => {
                            if (!accountDetails) {
                                router.push("/login");
                            } else {
                                onOpen();
                            }
                        }}
                    />

                    {!accountDetails ? (
                        <Button colorScheme="blue" as={Link} href="/login">
                            Login
                        </Button>
                    ) : (
                        <Menu isLazy>
                            <MenuButton bg="transparent">
                                <Avatar
                                    name={accountDetails?.firstName}
                                    size="sm"
                                />
                            </MenuButton>
                            <MenuList>
                                <MenuItem
                                    icon={<FaUserCircle size={17} />}
                                    as={Link}
                                    href={`/user/${accountDetails?.username}`}
                                    className="hover:bg-gray-100"
                                >
                                    My Account
                                </MenuItem>
                                <MenuItem
                                    icon={<BsCreditCard size={17} />}
                                    className="hover:bg-gray-100"
                                >
                                    My Purchase
                                </MenuItem>
                                <MenuItem
                                    icon={<MdOutlineLogout size={17} />}
                                    className="hover:bg-gray-100"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </MenuItem>
                            </MenuList>
                        </Menu>
                    )}
                </HStack>
            </nav>

            <Cart isOpen={isOpen} onClose={onClose} />
        </>
    );
};

export default Navbar;
