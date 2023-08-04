"use client";
import ProductCard from "@/app/components/product/ProductCard";
import ProductOverview from "@/app/components/product/ProductOverview";
import Link from "next/link";

interface ProductPageProps {
    params: {
        productId: string;
    };
}

const ProductPage: React.FC<ProductPageProps> = ({ params }) => {
    return (
        <div className="w-[80vw] 2xl:w-[60vw] flex flex-col items-center gap-6 p-6 mb-6">
            <p className="w-full text-lg font-semibold text-gray-600 ">
                <Link href="/">All Items</Link>
                {" > "}
                <Link href="#">Category</Link> {" > "}
                {params.productId}
            </p>
            <ProductOverview />

            <div className="w-full flex flex-col gap-4">
                <p className="text-xl font-semibold">From the same shop</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-items-center gap-2 lg:gap-8">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
