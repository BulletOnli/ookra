"use client";
import { getAllProducts } from "@/src/api/productsApi";
import ProductCard, { ProductType } from "@/src/components/product/ProductCard";
import ImageSlider from "@/src/components/ImageSlider";
import { Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

const Homepage = () => {
    const productQuery = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    return (
        <div className="w-full 2xl:w-[85vw] min-h-screen flex flex-col items-center py-6 px-4 lg:px-[5rem] 2xl:px-[10rem] ">
            <div className="w-full h-[14rem] flex items-center gap-2 mt-4 overflow-hidden">
                <div className="w-[65%] h-full">
                    <ImageSlider />
                </div>
                <div className="w-[35%] flex flex-col gap-2 ">
                    <Image
                        alt="Banner"
                        src="/sidebanner1.png"
                        className="w-full h-[7rem] object-cover "
                    />
                    <Image
                        alt="Banner"
                        src="/sidebanner2.png"
                        className="w-full h-[7rem] object-cover"
                    />
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 mt-6">
                <p className="w-full text-xl font-bold">Trending Products</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-items-center gap-2 lg:gap-6">
                    {productQuery.isLoading && <h1>Loading product</h1>}
                    {productQuery?.data?.map((product: ProductType) => (
                        <ProductCard productData={product} key={product._id} />
                    ))}
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 mt-6">
                <p className="w-full text-xl font-bold">Items For You!</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-items-center gap-2 lg:gap-6">
                    {productQuery?.data?.map((product: ProductType) => (
                        <ProductCard productData={product} key={product._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
