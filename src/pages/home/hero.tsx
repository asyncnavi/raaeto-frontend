import React, { useEffect, useState } from "react";
import { useSearchProducts } from "@/api/product.tsx";
import { ProductResponse } from "@/types/product.ts";

const Hero = ({
                  setProducts,
                  setQuery,
              }: {
    setProducts: React.Dispatch<React.SetStateAction<ProductResponse[]>>;
    setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const [localQuery, setLocalQuery] = useState("");

    const { data: searchResults } = useSearchProducts(
        { q: localQuery },
        { skip: !localQuery }
    );

    useEffect(() => {
        if (localQuery) {
            setProducts(searchResults || []);
        }
        setQuery(localQuery);
    }, [localQuery, searchResults, setProducts, setQuery]);

    return (
        <section className="w-full py-20 px-2 bg-green-200">
            <div className="container mx-auto flex flex-col justify-center items-center gap-10">
                <h1 className="text-5xl font-semibold dark:text-black">
                    Where Features Meets Their Stars.
                </h1>
                <p className="dark:text-black">
                    Discover the best software and services, guided by real user reviews.
                </p>
                <div className="w-full max-w-[600px] mx-auto flex justify-center items-center p-2 bg-white shadow-2xl rounded-md dark:bg-gray-300">
                    <input
                        className="w-full py-4 px-2 outline-none border-0 dark:bg-gray-300 dark:text-white"
                        placeholder="Search product or features..."
                        value={localQuery}
                        onChange={(e) => setLocalQuery(e.target.value)}
                    />

                </div>
            </div>
        </section>
    );
};

export default Hero;
