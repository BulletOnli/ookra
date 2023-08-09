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
import CartItem from "./CartItem";
import { useQuery } from "react-query";
import { getCartItems } from "@/api/cartApi";

type CartProps = {
    onClose: () => void;
    isOpen: boolean;
};

const Cart = ({ onClose, isOpen }: CartProps) => {
    // const cartItemsQuery = useQuery({
    //     queryKey: ["cartItems"],
    //     queryFn: getCartItems,
    // });

    // console.log(cartItemsQuery.data);

    return (
        <Drawer onClose={onClose} isOpen={isOpen} size="md">
            <DrawerOverlay />
            <DrawerContent p={2}>
                <DrawerCloseButton />
                <DrawerHeader>Shopping Cart</DrawerHeader>
                <DrawerBody>
                    <div className="w-full h-full flex flex-col">
                        <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
                            <CartItem />
                            <CartItem />
                            <CartItem />
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
