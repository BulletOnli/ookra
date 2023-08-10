import {
    Button,
    Divider,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    Spacer,
} from "@chakra-ui/react";
import CartItem, { CartItemType } from "./CartItem";
import { useQuery } from "@tanstack/react-query";
import { getCartItems } from "@/src/api/cartApi";
import { UserType } from "@/src/stores/userStore";
import CartItemSkeleton from "./CartItemSkeleton";

type CartProps = {
    onClose: () => void;
    isOpen: boolean;
    accountDetails: UserType | null;
};

const Cart = ({ onClose, isOpen, accountDetails }: CartProps) => {
    const cartItemsQuery = useQuery({
        queryKey: ["cartItems"],
        queryFn: () => {
            if (accountDetails) {
                return getCartItems(accountDetails._id);
            } else {
                return null;
            }
        },
        enabled: accountDetails != null,
    });

    return (
        <Drawer onClose={onClose} isOpen={isOpen} size="md">
            <DrawerOverlay />
            <DrawerContent p={2}>
                <DrawerCloseButton />
                <DrawerHeader>Shopping Cart</DrawerHeader>
                <DrawerBody>
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
                            {cartItemsQuery?.isLoading && <CartItemSkeleton />}
                            {cartItemsQuery?.data?.map((item: CartItemType) => (
                                <CartItem item={item} key={item._id} />
                            ))}
                        </div>
                        <Spacer />
                        <Divider />
                        <div className="w-full flex flex-col gap-4 mt-4">
                            <HStack>
                                <p className="font-semibold">Grand total</p>
                                <Spacer />
                                <HStack>
                                    <small className="text-gray-500 font-semibold">
                                        PHP
                                    </small>
                                    <p className="text-xl font-semibold">
                                        25,000
                                    </p>
                                </HStack>
                            </HStack>
                            <Button colorScheme="blue">Place order</Button>
                        </div>
                    </div>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default Cart;
