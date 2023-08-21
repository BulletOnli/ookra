import { HStack, Image, Spacer, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { BsStarFill } from "react-icons/bs";
import RemoveProductAlert from "../alerts/RemoveProductAlert";

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
    seller?: {
        _id: string;
        firstName: string;
        lastName: string;
        username: string;
        location: string;
        totalSales: number;
    };
};

type RemoveProductAlertDisclosureType = {
    onOpen: () => void;
    isOpen: boolean;
    onClose: () => void;
};

type ProductCardProps = {
    productData: ProductType;
};

const ProductCard = ({ productData }: ProductCardProps) => {
    const { productName, productImg, _id, price, sold, seller } = productData;

    const imageHValues = useBreakpointValue({
        base: "8rem", // xs
        lg: "11rem",
    });

    return (
        <>
            <Link href={`/product/${_id}`}>
                <div className="relative w-[9rem] h-[13rem] md:w-[12rem] md:h-[16rem] bg-white flex flex-col rounded-sm shadow-sm overflow-hidden hover:scale-[1.01] hover:shadow-md transition">
                    <p className="absolute top-2 right-2 px-2 py-1 text-red-600 bg-white text-xs font-semibold rounded-sm">
                        P{price}
                    </p>
                    <Image
                        w="full"
                        minH={imageHValues}
                        src={productImg?.url}
                        objectFit="cover"
                        fallbackSrc="https://via.placeholder.com/300"
                        loading="lazy"
                        alt="product"
                    />
                    <div className="w-full h-full flex flex-col p-2">
                        <p className="font-semibold text-xs md:text-sm">
                            {productName}
                        </p>
                        <Spacer />

                        <HStack spacing={1}>
                            <BsStarFill className="text-xs text-gray-400" />
                            <BsStarFill className="text-xs text-gray-400" />
                            <BsStarFill className="text-xs text-gray-400" />
                            <BsStarFill className="text-xs text-gray-400" />
                            <BsStarFill className="text-xs text-gray-400" />
                            <small className="font-semibold ml-1">
                                {sold} Sold
                            </small>
                        </HStack>
                    </div>
                </div>
            </Link>
        </>
    );
};

export default ProductCard;
