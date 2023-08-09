import {
    Avatar,
    Button,
    HStack,
    Image,
    Spacer,
    VStack,
} from "@chakra-ui/react";
import { BsBookmark, BsCartPlus } from "react-icons/bs";
import { FaStoreAlt } from "react-icons/fa";
import { ProductType } from "./ProductCard";
import { useQuery } from "react-query";
import { getSingleProduct } from "@/api/productsApi";

const ProductOverview = ({ productId }: { productId: string }) => {
    const productQuery = useQuery({
        queryKey: ["product"],
        queryFn: async () => await getSingleProduct(productId),
    });

    const productData: ProductType = productQuery?.data;

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
                <div className="w-full h-[80%] flex flex-col items-center justify-around gap-4 p-8 bg-white  shadow-sm rounded-xl">
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

                    <div className="w-full flex justify-center gap-4 ">
                        <Button
                            w="10rem"
                            rounded="full"
                            variant="outline"
                            borderColor="black"
                            leftIcon={<BsCartPlus size={20} />}
                        >
                            Add to cart
                        </Button>
                        <Button w="10rem" rounded="full" colorScheme="blue">
                            Buy Now
                        </Button>
                    </div>
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
