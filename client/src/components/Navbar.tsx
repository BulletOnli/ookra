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
    useToast,
} from "@chakra-ui/react";
import Link from "next/link";
import {
    BsSearch,
    BsCart2,
    BsCreditCard,
    BsGear,
    BsPeople,
} from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MdOutlineLogout } from "react-icons/md";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import useUserStore from "@/src/stores/userStore";
import { usePathname, useRouter } from "next/navigation";
import { isTokenAvailable } from "../utils/checkAccessToken";
import { useQueryClient } from "@tanstack/react-query";
import { CartItemType } from "./cart/CartItem";
import SearchBar from "./SearchBar";

const Cart = dynamic(() => import("./cart/Cart"));

const Navbar = () => {
    const pathname = usePathname();
    const toast = useToast();
    const router = useRouter();
    const { isOpen, onClose, onOpen } = useDisclosure();
    const { accountDetails, getAccountDetails, logoutUser } = useUserStore();
    const queryClient = useQueryClient();

    const itemsInCart: CartItemType[] | undefined = queryClient.getQueryData([
        "cart",
    ]);

    const handleLogout = () => {
        logoutUser();
        toast({
            title: "Logout successfully",
            status: "success",
            isClosable: true,
            duration: 3000,
            position: "top",
            variant: "subtle",
        });

        router.push("/login");
    };

    useEffect(() => {
        const checkToken = async () => await isTokenAvailable();

        if (accountDetails == null) getAccountDetails();
        checkToken();
    }, [pathname]);

    return (
        <>
            <nav className="sticky top-0 z-50 w-full px-4 py-5 bg-white flex items-center justify-around shadow-custom">
                <Link href="/">
                    <div className="text-2xl font-bold tracking-wider">
                        Ookra
                    </div>
                </Link>

                <HStack spacing={10} fontWeight="semibold">
                    <Link href="/">Categories</Link>
                    <Link href="/">New Arrival</Link>
                    <Link href="/">Brands</Link>
                </HStack>

                <HStack spacing={5}>
                    <SearchBar />

                    {accountDetails?.role === "Buyer" ? (
                        <div className=" relative">
                            <div className="absolute -right-1 -top-1 px-[6px] py-[2px] text-[10px] font-bold bg-blue-500 text-white rounded-full">
                                {itemsInCart?.length || 0}
                            </div>
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
                        </div>
                    ) : (
                        ""
                    )}

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
                                {accountDetails?.role === "Seller" ? (
                                    <MenuItem
                                        icon={<FaUserCircle size={17} />}
                                        as={Link}
                                        href={`/user/${accountDetails?._id}`}
                                        className="hover:bg-gray-100"
                                    >
                                        Seller Profile
                                    </MenuItem>
                                ) : (
                                    <MenuItem
                                        as={Link}
                                        href="/user/purchase"
                                        icon={<BsCreditCard size={17} />}
                                        className="hover:bg-gray-100"
                                    >
                                        My Purchase
                                    </MenuItem>
                                )}

                                <MenuItem
                                    as={Link}
                                    icon={<BsPeople size={17} />}
                                    className="hover:bg-gray-100"
                                    href="/user/following"
                                >
                                    Following
                                </MenuItem>
                                <MenuItem
                                    as={Link}
                                    icon={<BsGear size={17} />}
                                    className="hover:bg-gray-100"
                                    href="/user/settings"
                                >
                                    Settings
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

            {accountDetails && accountDetails?.role === "Buyer" && (
                <Cart
                    isOpen={isOpen}
                    onClose={onClose}
                    accountDetails={accountDetails}
                />
            )}
        </>
    );
};

export default Navbar;
