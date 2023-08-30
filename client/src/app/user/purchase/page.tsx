"use client";
import useUserStore from "@/src/stores/userStore";
import { isTokenAvailable } from "@/src/utils/checkAccessToken";
import { Button, Divider, HStack, Image, Spacer } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaStore } from "react-icons/fa";

type PurchaseItemType = {
    purchaseOwner: {
        firstName: string;
        lastName: string;
        location: string;
        username: string;
    };
    _id: {
        productImg: {
            url: string;
            id: string;
        };
        productName: string;
        price: number;
        seller: {
            firstName: string;
            lastName: string;
            location: string;
            username: string;
            _id: string;
        };
        _id: string;
    };
    totalQuantity: number;
    totalSpent: number;
    updatedAt: string;
};

const PurchasePage = () => {
    const router = useRouter();
    const accountDetails = useUserStore((state) => state.accountDetails);

    const purchaseHistory = useQuery({
        queryKey: ["purchases"],
        queryFn: async () => {
            const response = await axios.get(
                `http://localhost:5050/purchase/all?userId=${accountDetails?._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "ookraToken"
                        )}`,
                    },
                }
            );

            return response.data;
        },
        enabled: accountDetails !== null,
    });

    useEffect(() => {
        const checkToken = async () => {
            if (!(await isTokenAvailable())) {
                router.push("/login");
            }
        };

        checkToken();
    }, []);

    return (
        <div className="w-[85vw] 2xl:w-[55vw] min-h-screen flex flex-col items-center p-4 mt-4">
            <h1 className="text-2xl font-semibold">Purchase History</h1>
            <div className="w-full flex flex-col items-center gap-3 mt-6">
                {purchaseHistory.isLoading && <p>Loading purchases...</p>}
                {purchaseHistory?.data?.length == 0 ? (
                    <p>No purchases yet</p>
                ) : (
                    purchaseHistory?.data?.map((purchase: PurchaseItemType) => (
                        <div
                            key={purchase._id._id}
                            className="w-full flex flex-col justify-center px-6 py-4 bg-white shadow rounded-md"
                        >
                            <div className="w-full flex items-center">
                                <HStack>
                                    <FaStore size={16} />
                                    <p className="text-sm font-medium">
                                        {purchase._id.seller.firstName}{" "}
                                        {purchase._id.seller.lastName}
                                    </p>
                                </HStack>
                                <Spacer />
                                <Button
                                    as={Link}
                                    href={`/user/${purchase._id.seller._id}`}
                                    leftIcon={<FaStore />}
                                    size="xs"
                                    variant="outline"
                                >
                                    View Shop
                                </Button>
                            </div>
                            <Divider my={4} />
                            <div className="flex items-center gap-4">
                                <Image
                                    w="90px"
                                    h="90px"
                                    objectFit="cover"
                                    border="1px"
                                    borderColor="white"
                                    alt="Product"
                                    src={purchase._id.productImg.url}
                                />
                                <div>
                                    <p className="font-medium text-sm">
                                        {purchase._id.productName}
                                    </p>
                                    <p className="text-sm">
                                        x{purchase.totalQuantity}
                                    </p>
                                </div>
                                <Spacer />
                                <p className="font-semibold text-red-500">
                                    P{purchase._id.price}
                                </p>
                            </div>
                            <Divider mt={4} mb={4} />
                            <div className="w-full flex items-center justify-end">
                                <p className="mr-2 text-sm">
                                    Total Spent:{" "}
                                    <span className="text-red-500 font-semibold text-base">
                                        P{purchase.totalSpent}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default PurchasePage;
