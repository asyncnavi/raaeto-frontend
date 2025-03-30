import { Button, useDisclosure } from "@heroui/react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { useGetProducts } from "../../api/organization.tsx";
import { IconPlus } from "@tabler/icons-react";
import ProductCard from "@/components/product/productCard.tsx";
import ProductCardSkeleton from "@/components/product/productSkeleton.tsx";
import ProductCreateModal from "@/components/product/productCreateModal.tsx";
import { useNavigate } from "react-router-dom";
import CreateOrganizationAlert from "@/components/organization/createOrganizationAlert.tsx";
import { useEffect } from "react";

const OrganizationProductList = () => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const navigate = useNavigate();

  const { id: organization_id } = useSelector(
    (state: RootState) => state.organization
  );
  const { data: products, isLoading,refetch } = useGetProducts(
    {
      organization_id: organization_id as number,
    },
    {
      skip: !organization_id,
    }
  );

  useEffect(() => {
    if (organization_id) {
      refetch();
    }
  }, [navigate, organization_id, refetch]);

  return (
    <div className="space-y-10">
      <CreateOrganizationAlert />

      {organization_id && (
        <>
          <ProductCreateModal
            afterCreate={() => {
              onClose();
            }}
            isOpen={isOpen}
            onOpen={onOpen}
            onOpenChange={onOpenChange}
          />

          <div className="w-full flex justify-end">
            <Button
              onPress={onOpen}
              color="primary"
              startContent={<IconPlus />}
            >
              Create New Product
            </Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
            {isLoading
              ? [1, 2, 3, 4, 5].map(() => {
                  return <ProductCardSkeleton />;
                })
              : products?.map((product) => {
                  return (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => {
                        navigate(`products/${product.id}`);
                      }}
                    />
                  );
                })}
          </div>
        </>
      )}
    </div>
  );
};

const OrganizationDashboard = () => {
  return (
    <div>
      <h3 className="mx-4 text-xl font-bold">Dashboard</h3>
      <OrganizationProductList />
    </div>
  );
};

export default OrganizationDashboard;
