import { Badge, HStack, IconButton, Image, Spacer } from "@chakra-ui/react";
import Link from "next/link";
import { BsCart, BsStar, BsStarFill } from "react-icons/bs";
import { MdStore } from "react-icons/md";

export type ProductType = {
    productName: string;
    productImg: {
        url: string;
        id: string;
    };
    _id: string;
    description: string;
    category: string;
    price: number;
    stocks: number;
    sold: number;
    createdAt?: string;
    updatedAt?: string;
    seller: {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        location: string;
        totalSales: number;
    };
};

const ProductCard = ({ productData }: { productData: ProductType }) => {
    const { productName, productImg, _id, price, sold, seller } = productData;

    return (
        <Link href={`/product/${_id}`}>
            <div className="relative w-[14rem] h-[18rem] bg-white flex flex-col rounded-md shadow-custom overflow-hidden hover:scale-[1.01] hover:shadow-md transition">
                <p className="absolute top-2 right-2 px-2 py-1 bg-white text-xs font-semibold rounded-sm">
                    P{price}
                </p>
                <Image
                    w="full"
                    minH="12rem"
                    // src={productImg?.url}
                    objectFit="cover"
                    fallbackSrc="https://via.placeholder.com/300"
                />
                <div className="w-full h-full flex flex-col p-2">
                    <p className="font-semibold text-sm">{productName}</p>
                    <HStack spacing={1} mt={1}>
                        <BsStarFill className="text-xs text-gray-400" />
                        <BsStarFill className="text-xs text-gray-400" />
                        <BsStarFill className="text-xs text-gray-400" />
                        <BsStarFill className="text-xs text-gray-400" />
                        <BsStarFill className="text-xs text-gray-400" />
                        <small className="font-semibold ml-1">
                            {sold}k Sold
                        </small>
                    </HStack>
                    <Spacer />
                    <div className="text-xs flex items-center gap-1 font-medium text-gray-700">
                        <MdStore size={16} />
                        <p>
                            {seller?.firstName} {seller?.lastName}
                        </p>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
