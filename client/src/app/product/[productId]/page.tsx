"use client";
import { getSellerProducts, getSingleProduct } from "@/src/api/productsApi";
import ProductCard, { ProductType } from "@/src/components/product/ProductCard";
import ProductOverview from "@/src/components/product/ProductOverview";
import Link from "next/link";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { isTokenAvailable } from "@/src/utils/checkAccessToken";

const ProductPage = () => {
    const router = useRouter();
    const productId = useParams().productId as string;

    // Single product
    const singleProductQuery = useQuery({
        queryKey: ["product", productId],
        queryFn: () => getSingleProduct(productId),
    });

    // Seller other products
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

    return (
        <div className="w-[80vw] 2xl:w-[60vw] flex flex-col items-center p-6 mb-6">
            <p className="w-full text-lg font-semibold text-gray-800 mb-4">
                <Link href="/">All Items</Link>
                {" - "}
                <Link href="#">Category</Link> {" - "}
                {productId}
            </p>
            <ProductOverview productData={singleProductQuery?.data} />

            <div className="w-full flex flex-col gap-4 mt-14">
                <p className="text-xl font-semibold">From the same shop</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 lg:gap-8">
                    {sellerProductsQuery?.isLoading && (
                        <h1>Loading porducssdfsdf</h1>
                    )}
                    {sellerProductsQuery?.data
                        ?.slice(0, 10)
                        .map((product: ProductType) => (
                            <ProductCard
                                productData={product}
                                key={product._id}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
