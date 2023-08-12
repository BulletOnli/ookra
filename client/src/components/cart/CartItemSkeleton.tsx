import { SkeletonCircle, SkeletonText, Box } from "@chakra-ui/react";

const CartItemSkeleton = () => {
    return (
        <>
            <Box padding="6" boxShadow="lg" bg="gray.100" rounded="lg">
                <SkeletonCircle size="10" m={0} />
                <SkeletonText
                    mt="4"
                    noOfLines={3}
                    spacing="3"
                    skeletonHeight="2"
                />
            </Box>
            <Box padding="6" boxShadow="lg" bg="gray.100" rounded="lg">
                <SkeletonCircle size="10" m={0} />
                <SkeletonText
                    mt="4"
                    noOfLines={3}
                    spacing="3"
                    skeletonHeight="2"
                />
            </Box>
            <Box padding="6" boxShadow="lg" bg="gray.100" rounded="lg">
                <SkeletonCircle size="10" m={0} />
                <SkeletonText
                    mt="4"
                    noOfLines={3}
                    spacing="3"
                    skeletonHeight="2"
                />
            </Box>
        </>
    );
};

export default CartItemSkeleton;
