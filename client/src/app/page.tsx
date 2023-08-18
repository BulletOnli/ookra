"use client";
import { getAllProducts } from "@/src/api/productsApi";
import ProductCard, { ProductType } from "@/src/components/product/ProductCard";
import ImageSlider from "@/src/components/ImageSlider";
import { Image } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { isTokenAvailable } from "../utils/checkAccessToken";

const Homepage = () => {
    const productQuery = useQuery({
        queryKey: ["products"],
        queryFn: getAllProducts,
    });

    const categories = [
        ...new Set(
            productQuery?.data?.map((product: ProductType) => product.category)
        ),
    ];

    console.log(categories);

    useEffect(() => {
        const checkToken = async () => await isTokenAvailable();
        checkToken();
    }, []);

    return (
        <div className="w-full lg:w-[85vw] 2xl:w-[65vw] min-h-screen flex flex-col items-center p-4">
            <div className="w-full h-[14rem] flex items-center gap-2 mt-4 overflow-hidden">
                <div className="w-[65%] h-full">
                    <ImageSlider />
                </div>
                <div className="w-[35%] flex flex-col gap-2 ">
                    <Image
                        loading="lazy"
                        alt="Banner"
                        src="/sidebanner1.png"
                        className="w-full h-[7rem] object-cover "
                    />
                    <Image
                        loading="lazy"
                        alt="Banner"
                        src="/sidebanner2.png"
                        className="w-full h-[7rem] object-cover"
                    />
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 mt-8">
                <p className="w-full text-xl font-bold">Trending Products</p>
                <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 justify-items-center gap-2 lg:gap-6">
                    {productQuery.isLoading && <h1>Loading product</h1>}
                    {productQuery?.data
                        ?.slice(0, 12)
                        .map((product: ProductType) => (
                            <ProductCard
                                productData={product}
                                key={product._id}
                            />
                        ))}
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 mt-10">
                <p className="w-full text-xl font-bold">Items For You!</p>
                <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6  justify-items-center gap-2 lg:gap-6">
                    {productQuery?.data?.map((product: ProductType) => (
                        <ProductCard productData={product} key={product._id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Homepage;
