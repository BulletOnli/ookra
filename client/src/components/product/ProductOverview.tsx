import {
    Avatar,
    Button,
    HStack,
    Image,
    Spacer,
    VStack,
    useToast,
} from "@chakra-ui/react";
import { BsBookmark, BsCartPlus } from "react-icons/bs";
import { FaStoreAlt } from "react-icons/fa";
import { ProductType } from "./ProductCard";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleProduct } from "@/src/api/productsApi";
import { addToCart } from "@/src/api/cartApi";
import { useState } from "react";

const ProductOverview = ({ productId }: { productId: string }) => {
    const toast = useToast();
    const queryClient = useQueryClient();
    const [quantity, setQuantity] = useState(1);

    const productQuery = useQuery({
        queryKey: ["product"],
        queryFn: () => getSingleProduct(productId),
    });
    const productData: ProductType = productQuery?.data;

    const addToCartMutation = useMutation({
        mutationFn: () => addToCart(productId, quantity),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["cartItems"] });
        },
    });

    const handleAddToCart = () => {
        try {
            addToCartMutation.mutate();
            toast({
                title: "Added to Cart",
                status: "success",
                isClosable: true,
                duration: 1000,
                position: "top-right",
                variant: "left-accent",
            });
        } catch (error: any) {
            console.log(error);
            const err =
                error.response.data.error.message || "An error occurred";
            toast({
                title: err,
                status: "error",
                isClosable: true,
                duration: 2000,
                position: "top",
                variant: "top-accent",
            });
        }
    };

    return (
        <div className="w-full h-full flex justify-center gap-4">
            <Image
                // src={productData?.productImg?.url}
                fallbackSrc="https://via.placeholder.com/500"
                objectFit="cover"
                boxSize="30rem"
                rounded="xl"
                boxShadow="sm"
            />
            <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full h-[80%] flex flex-col items-center justify-around gap-4 p-6 bg-white  shadow-sm rounded-xl">
                    <HStack w="full">
                        <h1 className="text-2xl font-bold ">
                            {productData?.productName}
                        </h1>
                        <Spacer />
                        <p className="font-bold text-xl p-2 text-red-500">
                            P{productData?.price}
                        </p>
                    </HStack>

                    <p className="my-4 font-medium text-center">
                        {productData?.description}
                    </p>

                    <div className="w-full flex justify-around">
                        <VStack spacing={0}>
                            <p className="font-semibold">Category</p>
                            <p>{productData?.category}</p>
                        </VStack>
                        <VStack spacing={0}>
                            <p className="font-semibold">Stocks</p>
                            <p>{productData?.stocks}</p>
                        </VStack>
                        <VStack spacing={0}>
                            <p className="font-semibold">Sold</p>
                            <p>{productData?.sold}k</p>
                        </VStack>
                    </div>

                    <HStack spacing={5}>
                        <Button
                            w="10rem"
                            rounded="full"
                            variant="outline"
                            borderColor="black"
                            leftIcon={<BsCartPlus size={20} />}
                            onClick={handleAddToCart}
                            isDisabled={addToCartMutation.isLoading}
                        >
                            Add to cart
                        </Button>
                        <VStack>
                            <p className="font-semibold">Quantity</p>
                            <HStack>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                        setQuantity((prev) => prev - 1)
                                    }
                                    isDisabled={quantity <= 1}
                                >
                                    -
                                </Button>
                                <p className="px-3 py-1 bg-gray-100 rounded-md font-semibold">
                                    {quantity}
                                </p>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() =>
                                        setQuantity((prev) => prev + 1)
                                    }
                                >
                                    +
                                </Button>
                            </HStack>
                        </VStack>

                        <Button
                            w="10rem"
                            rounded="full"
                            colorScheme="blue"
                            isDisabled
                        >
                            Buy Now
                        </Button>
                    </HStack>
                </div>
                <div className="w-full h-[20%] flex items-center px-4 bg-white shadow-sm rounded-lg">
                    <HStack>
                        <Avatar name={productData?.seller?.username} />
                        <VStack spacing={0}>
                            <p className="font-semibold">
                                {productData?.seller?.firstName}{" "}
                                {productData?.seller?.lastName}
                            </p>
                            <small className="w-full">Products: --</small>
                        </VStack>
                    </HStack>
                    <Spacer />

                    <Button
                        leftIcon={<FaStoreAlt size={18} />}
                        variant="outline"
                        size="sm"
                    >
                        View Shop
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ProductOverview;
