"use client";
import { getSellerProducts, getSingleProduct } from "@/src/api/productsApi";
import ProductCard, { ProductType } from "@/src/components/product/ProductCard";
import ProductOverview from "@/src/components/product/ProductOverview";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isTokenAvailable } from "@/src/utils/checkAccessToken";
import useUserStore from "@/src/stores/userStore";

const ProductPage = () => {
    const router = useRouter();
    const productId = useParams().productId as string;
    const accountDetails = useUserStore((state) => state.accountDetails);

    // Single product
    const singleProductQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getSingleProduct(productId),
    });

    // other products of the seller
    const sellerProductsQuery = useQuery({
        queryKey: ["products", singleProductQuery?.data?.seller?._id],
        queryFn: () => getSellerProducts(singleProductQuery?.data?.seller?._id),
        enabled: singleProductQuery?.data != undefined,
    });

    useEffect(() => {
        const checkToken = async () => {
            if (!(await isTokenAvailable())) {
                router.push("/login");
            }
        };

        checkToken();
    }, []);

    if (accountDetails == null) {
        return <div className="w-full h-screen bg-[#EBEAF3]"></div>;
    }

    return (
        <div className="w-[85vw] 2xl:w-[65vw] flex flex-col items-center p-6 mb-6">
            <p className="w-full text-lg font-semibold text-gray-800 mb-4">
                <Link href="/">All Items</Link>
                {" - "}
                <Link href="/">Category</Link> {" - "}
                {productId}
            </p>
            <ProductOverview
                sellerId={singleProductQuery?.data?.seller?._id}
                productData={singleProductQuery?.data}
            />

            <div className="w-full flex flex-col gap-4 mt-14">
                <p className="text-xl font-semibold">From the same shop</p>
                {/* className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  justify-items-center gap-2 lg:gap-6" */}
                <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 justify-items-center gap-2 lg:gap-8">
                    {sellerProductsQuery?.isLoading && (
                        <h1>Loading products...</h1>
                    )}
                    {sellerProductsQuery?.data?.map((product: ProductType) => (
                        <ProductCard productData={product} key={product._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
