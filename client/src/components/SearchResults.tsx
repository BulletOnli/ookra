import Link from "next/link";
import { ProductType } from "./product/ProductCard";
import { useRouter } from "next/navigation";
import { RefObject } from "react";

const SearchResults = ({
    searchResults,
    isSearching,
    handleClick,
}: {
    searchResults: ProductType[];
    isSearching: boolean;
    handleClick: (productId: string) => void;
}) => {
    return (
        <div className="absolute  w-[20rem] flex flex-col items-center p-2 bg-white shadow-custom">
            {isSearching ? (
                <p>Searching...</p>
            ) : searchResults.length == 0 ? (
                <p>No Results</p>
            ) : (
                searchResults.map((result) => (
                    <p
                        key={result._id}
                        className="w-full text-center hover:bg-gray-100 p-2 cursor-pointer"
                        onClick={() => handleClick(result._id)}
                    >
                        {result.productName}
                    </p>
                ))
            )}
        </div>
    );
};

export default SearchResults;
