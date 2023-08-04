"use client";
import { HStack, Spacer } from "@chakra-ui/react";
import ImageSlider from "./components/ImageSlider";
import ProductCard from "./components/product/ProductCard";

const Homepage = () => {
    return (
        <div className="w-full 2xl:w-[85vw] h-[100rem] flex flex-col items-center py-6 px-4 lg:px-[5rem] 2xl:px-[10rem]">
            <ImageSlider />
            <div className="w-full flex flex-col gap-4 mt-6">
                <p className="w-full text-xl font-bold">Trending Products</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-items-center gap-2 lg:gap-6">
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                    <ProductCard />
                </div>
            </div>

            <div className="w-full flex flex-col gap-4 mt-6">
                <p className="w-full text-xl font-bold">Items For You!</p>
                <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 justify-items-center gap-2 lg:gap-6">
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

export default Homepage;
