import { Image } from "@chakra-ui/react";
import { ProductType } from "./product/ProductCard";
import Link from "next/link";

const Category = ({ category }: { category: string }) => {
    return (
        <Link href="/" className="w-full">
            <div className="flex flex-col items-center justify-center gap-2 w-full min-w-[8rem] min-h-[9rem] border-r border-b">
                <Image
                    alt="category"
                    boxSize="64px"
                    src={`/categories/${category}.png`}
                />
                <p className="text-sm text-center">{category}</p>
            </div>
        </Link>
    );
};

const Categories = ({ productsData }: { productsData: ProductType[] }) => {
    const categories = [
        ...new Set(
            productsData?.map((product: ProductType) => product.category)
        ),
    ];

    if (categories.length == 0) return;

    return (
        <div className="w-full flex flex-col bg-white rounded-md mt-6 ">
            <p className="p-4 font-medium text-gray-600 border-b">CATEGORIES</p>
            <div className="grid grid-cols-9 justify-items-center ">
                {categories?.map((category: string, index) => (
                    <Category key={index} category={category} />
                ))}
                <Category category="Gaming" />
                <Category category="Audio" />
                <Category category="Laptops & Computer" />
                <Category category="Babies & Kids" />
            </div>
        </div>
    );
};

export default Categories;
