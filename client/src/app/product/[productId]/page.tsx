"use client";
import { getAllProducts, getSingleProduct } from "@/src/api/productsApi";
import ProductCard, { ProductType } from "@/src/components/product/ProductCard";
import ProductOverview from "@/src/components/product/ProductOverview";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";

type ProductPageProps = {
    params: {
        productId: string;
    };
};

const ProductPage = ({ params }: ProductPageProps) => {
    const productQuery = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    return (
        <div className="w-[80vw] 2xl:w-[60vw] flex flex-col items-center p-6 mb-6">
            <p className="w-full text-lg font-semibold text-gray-800 mb-4">
                <Link href="/">All Items</Link>
                {" > "}
                <Link href="#">Category</Link> {" > "}
                {params.productId}
            </p>
            <ProductOverview productId={params.productId} />

            <div className="w-full flex flex-col gap-4 mt-14">
                <p className="text-xl font-semibold">From the same shop</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 lg:gap-8">
                    {productQuery?.data
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
