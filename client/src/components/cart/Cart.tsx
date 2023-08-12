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
    VStack,
    useDisclosure,
    useToast,
} from "@chakra-ui/react";
import CartItem, { CartItemType } from "./CartItem";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { cartCheckout, getCartItems, removeToCart } from "@/src/api/cartApi";
import { UserType } from "@/src/utils/stores/userStore";
import CartItemSkeleton from "./CartItemSkeleton";
import SuccessOrder from "../alerts/SuccessOrder";
import ClearCartAlert from "../alerts/ClearCartAlert";

type CartProps = {
    onClose: () => void;
    isOpen: boolean;
    accountDetails: UserType | null;
};

const Cart = ({ onClose, isOpen, accountDetails }: CartProps) => {
    const queryClient = useQueryClient();
    const toast = useToast();
    const successDisclosure = useDisclosure();
    const warningDisclosure = useDisclosure();

    const cartItemsQuery = useQuery({
        queryKey: ["cart"],
        queryFn: getCartItems,
        enabled: accountDetails != null,
    });

    // Get the total of each item in cart
    const totals: number[] = cartItemsQuery?.data?.map(
        (item: CartItemType) => item.inCart * item.price
    );
    // the total of all items in cart
    const grandTotal = totals?.reduce(
        (acc: number, value: number) => acc + value,
        0
    );

    // Check out mutation
    const placeOrderMutation = useMutation({
        mutationFn: cartCheckout,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cart"] });
            queryClient.invalidateQueries({ queryKey: ["product"] });
        },
    });

    const handlePlaceOrder = async () => {
        try {
            if (accountDetails) {
                placeOrderMutation.mutate(accountDetails._id);
                await new Promise((r) => setTimeout(r, 1500)); // Manually load for 2 sec
                onClose();
                successDisclosure.onOpen();
            } else {
                throw new Error("Invalid");
            }
        } catch (error: any) {
            console.log(error);
            const err =
                error.response.data.error.message || "An error occurred";
            toast({
                title: err,
                status: "error",
                isClosable: true,
                duration: 3000,
                position: "top",
                variant: "top-accent",
            });
        }
    };

    return (
        <>
            <Drawer onClose={onClose} isOpen={isOpen} size="md">
                <DrawerOverlay />
                <DrawerContent p={2}>
                    <DrawerCloseButton />
                    <DrawerHeader>Shopping Cart</DrawerHeader>
                    <DrawerBody>
                        <div className="w-full h-full flex flex-col">
                            <div className="w-full h-full flex flex-col gap-4 overflow-y-auto">
                                {cartItemsQuery?.isLoading && (
                                    <CartItemSkeleton />
                                )}
                                {cartItemsQuery?.data?.map(
                                    (item: CartItemType) => (
                                        <CartItem
                                            item={item}
                                            key={item._id}
                                            onClose={onClose}
                                        />
                                    )
                                )}
                            </div>

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
                                            {grandTotal?.toFixed(2)}
                                        </p>
                                    </HStack>
                                </HStack>

                                <VStack>
                                    <Button
                                        w="full"
                                        colorScheme="blue"
                                        onClick={handlePlaceOrder}
                                        isLoading={placeOrderMutation.isLoading}
                                        spinnerPlacement="start"
                                        isDisabled={
                                            cartItemsQuery?.data?.length === 0
                                        }
                                    >
                                        Place order
                                    </Button>
                                    <Button
                                        w="full"
                                        colorScheme="red"
                                        onClick={warningDisclosure.onOpen}
                                        isDisabled={
                                            cartItemsQuery?.data?.length === 0
                                        }
                                    >
                                        Remove all items
                                    </Button>
                                </VStack>
                            </div>
                        </div>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            <ClearCartAlert warningDisclosure={warningDisclosure} />

            {successDisclosure.isOpen && (
                <SuccessOrder successDisclosure={successDisclosure} />
            )}
        </>
    );
};

export default Cart;
