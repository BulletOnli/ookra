"use client";
import { getSellerProducts } from "@/src/api/productsApi";
import { fetchUserDetails } from "@/src/api/userApi";
import NewProductModal from "@/src/components/modals/NewProductModal";
import ProfileTabs from "@/src/components/user-profile/ProfileTabs";
import { isTokenAvailable } from "@/src/utils/checkAccessToken";
import useUserStore, { UserType } from "@/src/utils/stores/userStore";
import {
    Avatar,
    Button,
    HStack,
    Spacer,
    useDisclosure,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsPlus } from "react-icons/bs";
import { FaPaperPlane } from "react-icons/fa";

const UserProfilePage = () => {
    const router = useRouter();
    const paramsId = useParams().userId as string;
    const accountDetails = useUserStore((state) => state.accountDetails);
    const addProductModalDisclosure = useDisclosure();

    const productsQuery = useQuery({
        queryKey: ["products", paramsId],
        queryFn: () => getSellerProducts(paramsId),
    });

    const userDetailsQuery = useQuery({
        queryKey: ["user", paramsId],
        queryFn: () => fetchUserDetails(paramsId),
    });
    const userDetails: UserType = userDetailsQuery?.data;

    useEffect(() => {
        const checkToken = async () => {
            if (!(await isTokenAvailable())) {
                router.push("/login");
            }
        };

        checkToken();
    }, []);

    return (
        <>
            <div className="w-[85vw] 2xl:w-[65vw] min-h-screen flex flex-col items-center p-4">
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

                    {accountDetails?._id === paramsId ? (
                        <HStack spacing={4}>
                            <Button
                                as={Link}
                                href="/user/settings"
                                colorScheme="blue"
                                variant="outline"
                                rounded="full"
                                px={8}
                            >
                                Edit Profile
                            </Button>
                            <Button
                                leftIcon={<BsPlus size={26} />}
                                colorScheme="blue"
                                rounded="full"
                                onClick={addProductModalDisclosure?.onOpen}
                            >
                                Add product
                            </Button>
                        </HStack>
                    ) : (
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
                    )}
                </div>
                <div className="w-full flex items-center justify-around p-6 mt-4 mb-6 rounded-lg bg-gray-50 shadow">
                    <p className="font-medium">
                        Location:{" "}
                        <span className="text-blue-600">
                            {userDetails?.location}
                        </span>
                    </p>
                    <p className="font-medium">
                        Followers: <span className="text-blue-600">0</span>
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

                <ProfileTabs productsData={productsQuery?.data} />
            </div>

            <NewProductModal
                isOpen={addProductModalDisclosure?.isOpen}
                onClose={addProductModalDisclosure?.onClose}
            />
        </>
    );
};

export default UserProfilePage;
