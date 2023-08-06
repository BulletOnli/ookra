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

const ProductOverview = () => {
    return (
        <div className="w-full h-full flex justify-center gap-4">
            <Image
                src="/pc.png"
                fallbackSrc="https://via.placeholder.com/150"
                objectFit="cover"
                boxSize="30rem"
                rounded="xl"
                boxShadow="sm"
            />
            <div className="w-full flex flex-col items-center gap-2">
                <div className="w-full h-[80%] flex flex-col items-center justify-center gap-4 p-8 bg-white  shadow-sm rounded-xl">
                    <HStack w="full">
                        <h1 className="text-3xl font-bold ">
                            Iphone 14 Pro Max
                        </h1>
                        <Spacer />
                        <p className="font-bold text-lg p-2 text-red-500">
                            P200.79
                        </p>
                    </HStack>
                    <p className="my-4 font-semibold text-center">
                        Lorem ipsum dolor sit amet consectetur, adipisicing
                        elit. Maiores ut tenetur voluptatum dolorum repellendus
                        atque molestias cupiditate, quod minus corrupti?
                    </p>
                    <div className="w-full flex justify-around">
                        <VStack spacing={0}>
                            <p className="font-semibold">Category</p>
                            <p>Soap</p>
                        </VStack>
                        <VStack spacing={0}>
                            <p className="font-semibold">Stocks</p>
                            <p>200</p>
                        </VStack>
                        <VStack spacing={0}>
                            <p className="font-semibold">Sold</p>
                            <p>10k</p>
                        </VStack>
                    </div>
                    <Spacer />
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
                        <Button w="10rem" rounded="full" colorScheme="teal">
                            Buy Now
                        </Button>
                    </div>
                </div>
                <div className="w-full h-[20%] flex items-center px-4 bg-white shadow-sm rounded-lg">
                    <HStack>
                        <Avatar name="Bullet" />
                        <VStack spacing={0}>
                            <p className="font-semibold">Gemmuel Dela Pena</p>
                            <small className="w-full">Products: 4</small>
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
