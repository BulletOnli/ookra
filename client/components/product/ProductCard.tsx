import { Badge, HStack, IconButton, Image, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { useState } from "react";
import { BsCart, BsStar, BsStarFill } from "react-icons/bs";
import { MdStore } from "react-icons/md";

const ProductCard = () => {
    return (
        <Link href="/product/sdfs">
            <div className="relative w-[14rem] h-[18rem] bg-white flex flex-col rounded-md shadow-custom overflow-hidden hover:scale-[1.01] hover:shadow-md transition">
                <p className="absolute top-2 right-2 px-2 py-1 bg-white text-xs font-semibold rounded-sm">
                    P220.00
                </p>
                <Image
                    w="full"
                    minH="12rem"
                    src="/pc.png"
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/150"
                />
                <div className="w-full h-full flex flex-col p-2 gap-1">
                    <p className="font-semibold">Apple Iphone 14 Pro Max</p>

                    <HStack spacing={1} mt={1}>
                        <BsStarFill className="text-xs text-gray-400" />
                        <BsStarFill className="text-xs text-gray-400" />
                        <BsStarFill className="text-xs text-gray-400" />
                        <BsStarFill className="text-xs text-gray-400" />
                        <BsStarFill className="text-xs text-gray-400" />
                        <small className="font-semibold">1.5k Sold</small>
                    </HStack>
                    <Spacer />
                    <div className="text-xs flex items-center gap-1 font-semibold text-gray-700">
                        <MdStore size={16} />
                        <p>Gemmuel Dela Pena</p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
