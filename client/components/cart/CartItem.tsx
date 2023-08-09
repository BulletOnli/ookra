import { Flex, Image, Spacer } from "@chakra-ui/react";

const CartItem = () => {
    return (
        <div className="w-full flex items-center">
            <Image
                src="/pc.png"
                objectFit="cover"
                alt="Product Img"
                boxSize="80px"
                rounded="md"
            />
            <Flex flexDirection="column" ml={3}>
                <p className="text font-semibold">Dunk Low Light Bone</p>
                <p className="text-sm text-gray-700">Unit Price: ₱250</p>
            </Flex>
            <Spacer />
            <p className="text-lg font-semibold">₱2500</p>
        </div>
    );
};

export default CartItem;
