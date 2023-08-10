import { Flex, Image, Spacer } from "@chakra-ui/react";
import Link from "next/link";

export type CartItemType = {
    productName: string;
    seller: string;
    price: number;
    inCart: number;
    cartOwner: string;
    _id: string;
    productImg: {
        url: string;
        id: string;
    };
};

const CartItem = ({ item }: { item: CartItemType }) => {
    return (
        <div className="w-full flex items-center bg-slate-100 shadow p-2 rounded-lg">
            <Link href={`/product/${item._id}`}>
                <div className="relative">
                    <Image
                        src={item.productImg.url}
                        objectFit="cover"
                        alt="Product Img"
                        boxSize="80px"
                        rounded="md"
                    />
                    <div className="absolute -top-2 z-30 -right-2 h-6 w-6 text-sm font-semibold text-white flex justify-center items-center rounded-full bg-gray-600 ">
                        {item.inCart}
                    </div>
                </div>
            </Link>
            <Flex flexDirection="column" ml={3}>
                <Link href={`/product/${item._id}`}>
                    <p className="text font-semibold">{item.productName}</p>
                </Link>
                <p className="text-sm text-gray-700">
                    Unit Price: P{item.price}
                </p>
            </Flex>
            <Spacer />
            <p className="text-lg font-semibold">{item.price * item.inCart}</p>
        </div>
    );
};

export default CartItem;
