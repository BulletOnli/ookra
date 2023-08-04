import { Badge, HStack, IconButton, Image, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { BsCart } from "react-icons/bs";

const ProductCard = () => {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <Link href="/product/sdfs">
            <div
                className="relative w-[15rem] h-full flex flex-col bg-white rounded-md shadow-custom overflow-hidden hover:scale-[1.01] hover:shadow-md transition"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
            >
                {isHovering && (
                    <IconButton
                        colorScheme="gray"
                        size="sm"
                        icon={<BsCart />}
                        aria-label="Add to cart"
                        position="absolute"
                        top={2}
                        right={2}
                        rounded="full"
                        onClick={() => console.log("added to cart")}
                    />
                )}
                <Image
                    w="full"
                    h="10rem"
                    src="/pc.png"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/150"
                />
                <div className="flex flex-col justify-center p-2 gap-1">
                    <p className="font-bold">Apple Iphone 14 Pro Max</p>
                    <p className="text-xs font-semibold text-gray-700">
                        Gemmuel Dela Pena
                    </p>
                    <Spacer />
                    <HStack mt={2}>
                        <small>1.5k Sold</small>
                        <Spacer />
                        <p className="font-bold text-sm text-gray-600">
                            P200.26
                        </p>
                    </HStack>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
