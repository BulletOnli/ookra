"use client";
import { getAllProducts, getSellerProducts } from "@/src/api/productsApi";
import { fetchUserDetails } from "@/src/api/userApi";
import ProductCard, { ProductType } from "@/src/components/product/ProductCard";
import { isTokenAvailable } from "@/src/utils/checkAccessToken";
import { UserType } from "@/src/utils/stores/userStore";
import {
    Avatar,
    Button,
    HStack,
    Spacer,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaPaperPlane } from "react-icons/fa";

const UserProfilePage = () => {
    const userId = useParams().userId as string;

    const productsQuery = useQuery({
        queryKey: ["products", userId],
        queryFn: () => getSellerProducts(userId),
    });

    const userDetailsQuery = useQuery({
        queryKey: ["user", userId],
        queryFn: () => fetchUserDetails(userId),
    });
    const userDetails: UserType = userDetailsQuery?.data;

    if (userDetailsQuery.isLoading) {
        return <h1>loading details....</h1>;
    }

    return (
        <div className="w-[80vw] 2xl:w-[60vw] min-h-screen flex flex-col items-center p-4">
            <div className="w-full flex items-center p-4 mt-4">
                <HStack spacing={4}>
                    <Avatar name={userDetails?.firstName} size="xl" />
                    <div className="">
                        <h1 className="text-2xl font-bold">
                            {userDetails?.firstName} {userDetails?.lastName}
                        </h1>
                        <p className="text-gray-600">
                            @{userDetails?.username}
                        </p>
                    </div>
                </HStack>
                <Spacer />
                <HStack spacing={4}>
                    <Button
                        colorScheme="blue"
                        variant="outline"
                        rounded="full"
                        px={8}
                    >
                        Follow
                    </Button>
                    <Button
                        leftIcon={<FaPaperPlane />}
                        colorScheme="blue"
                        rounded="full"
                        px={6}
                    >
                        Message
                    </Button>
                </HStack>
            </div>
            <div className="w-full flex items-center justify-around p-6 mt-4 mb-6 rounded-lg bg-gray-50 shadow">
                <p className="font-medium">
                    Location:{" "}
                    <span className="text-blue-600">
                        {userDetails?.location}
                    </span>
                </p>
                <p className="font-medium">
                    Total Sales:{" "}
                    <span className="text-blue-600">
                        {userDetails?.totalSales?.toFixed(2)}
                    </span>
                </p>
                <p className="font-medium">
                    Total Products:{" "}
                    <span className="text-blue-600">
                        {productsQuery?.data?.length}
                    </span>
                </p>
                <p className="font-medium">
                    Total Sales:{" "}
                    <span className="text-blue-600">
                        {" "}
                        {userDetails?.totalSales?.toFixed(2)}
                    </span>
                </p>
            </div>
            <Tabs isFitted variant="line" w="full">
                <TabList mb={6}>
                    <Tab>One</Tab>
                    <Tab>Two</Tab>
                </TabList>
                <TabPanels>
                    <TabPanel p={0}>
                        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 lg:gap-8">
                            {productsQuery?.data
                                ?.slice(0, 10)
                                .map((product: ProductType) => (
                                    <ProductCard
                                        productData={product}
                                        key={product._id}
                                    />
                                ))}
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <p>two!</p>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </div>
    );
};

export default UserProfilePage;
