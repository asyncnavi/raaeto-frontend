import React, { useState, useEffect } from "react";
import Hero from "./hero.tsx";
import { useGetAllProducts } from "@/api/product.tsx";
import ProductCardSkeleton from "@/components/product/productSkeleton.tsx";
import ProductCard from "@/components/product/productCard.tsx";
import Header from "@/components/common/header.tsx";
import ProductPublicDetails from "@/components/product/productPublicDetails.tsx";
import { ProductResponse } from "@/types/product.ts";
import CreateOrganizationAlert from "@/components/organization/createOrganizationAlert.tsx";

export default function HomePage() {
    const { data: allProducts, isLoading } = useGetAllProducts();
    const [products, setProducts] = useState<ProductResponse[]>(allProducts || []);
    const [query, setQuery] = useState("");

    const [productDetailId, setProductDetailId] = useState<number | null>(null);

    useEffect(() => {
        if (!query) {
            setProducts(allProducts || []);
        }
    }, [query, allProducts]);

    const handleProductDetailModal = (id: number) => {
        setProductDetailId(id);
    };

    return (
        <div className="relative">
            <Header />
            <CreateOrganizationAlert />
            <Hero setProducts={setProducts} setQuery={setQuery} />
            <div className="container mx-auto my-10 space-y-5">
                <h1 className="text-xl font-bold px-4">Products</h1>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
                    {isLoading
                        ? [1, 2, 3, 4, 5].map((_, index) => <ProductCardSkeleton key={index} />)
                        : products?.map((product) => (
                            <React.Fragment key={product.id}>
                                <ProductCard
                                    product={product}
                                    onClick={() => handleProductDetailModal(product.id)}
                                />
                                {productDetailId === product.id && (
                                    <ProductPublicDetails
                                        isOpen={productDetailId === product.id}
                                        onOpenChange={() => setProductDetailId(null)}
                                        product={product}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                </div>
            </div>
        </div>
    );
}
