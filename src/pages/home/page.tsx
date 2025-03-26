import Hero from "./hero.tsx";
import { Alert, Button } from "@heroui/react";
import { useGetUserOrganization } from "@/api/organization.tsx";
import { useGetAllProducts } from "@/api/product.tsx";
import ProductCardSkeleton from "@/components/product/productSkeleton.tsx";
import ProductCard from "@/components/product/productCard.tsx";
import Header from "@/components/common/header.tsx";
import ProductPublicDetails from "@/components/product/productPublicDetails.tsx";
import React, { useState } from "react";

export default function HomePage() {
  const { data: organization } = useGetUserOrganization();
  const { data: products, isLoading } = useGetAllProducts();
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const handleProductDetailModal = (productId: string | null) => setSelectedProductId(productId);


  return (
    <div className="relative">
      <Header />
      {!organization && (
        <Alert
          color="success"
          description="Create your own organization to showcase your products, gather valuable user feedback, and continuously improve your offerings. Start engaging with real users today and take your product to the next level!"
          title="Build Your Own Organization and Grow Your Product"
          variant="faded"
          className="container mx-auto w-full max-w-[968px] my-5"
          endContent={
            <Button color="success" size="md" variant="solid">
              Get started
            </Button>
          }
        />
      )}
      <Hero />

      <div className="container mx-auto my-10 space-y-5">
        <h1 className="text-xl font-bold px-4">Trending Products</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
          {isLoading
            ? [1, 2, 3, 4, 5].map(() => {
                return <ProductCardSkeleton />;
              })
            : products?.map(({ id, name, description }) => {
                return (
                  <React.Fragment key={id}>
                    <ProductCard
                      productId={id}
                      name={name}
                      description={description ?? ""}
                      onClick={() => handleProductDetailModal(id)}
                    />
                    {selectedProductId === id && (
                      <ProductPublicDetails
                        isOpen={selectedProductId !== null}
                        onOpenChange={() => handleProductDetailModal(null)}
                        id={id}
                      />
                    )}
                  </React.Fragment>
                );
              })}
        </div>
      </div>
    </div>
  );
}
