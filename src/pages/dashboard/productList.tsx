import { IconBrandHbo, IconPlus } from "@tabler/icons-react";
import { useGetUserOrganization, useGetProducts } from "../../api/organization";
import CreateProductModal from "./createProductModal";
import { useState } from "react";
import LoadingOverlay from "../../ui/loadingOverlay";

const ProductList = () => {
  const [createProductModal, setCreateProductModal] = useState<boolean>(false);
  const { data: organization, isLoading } = useGetUserOrganization();

  const orgId = organization?.organization_id;

  const { data: products } = useGetProducts(
    {
      organization_id: orgId as string,
    },
    { skip: !orgId },
  );

  const triggerProductModal = () => setCreateProductModal(!createProductModal);

  return (
    <div className="container mx-auto space-y-6">
      <LoadingOverlay loading={isLoading} />
      <CreateProductModal
        organizationId={orgId ?? ''}
        opened={createProductModal}
        trigger={triggerProductModal}
      />
      <h2 className="text-2xl font-bold">Dashboard</h2>
      <div className="w-full flex justify-end">
        <button
          onClick={() => triggerProductModal()}
          className="outline-none border-2 border-black px-5 py-2 bg-lime-300 font-semibold flex items-center gap-2 justify-end"
        >
          Create New Product
          <IconPlus />
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">
        {products?.map(({ name, description }) => {
          return (
            <div className="border-2 border-black p-4 space-y-2 shadow-[8px_8px_#a3e635] cursor-pointer hover:shadow-none transit ease-in .3s">
              <div className="border-b border-dashed border-b-black">
                <IconBrandHbo size={100} />
              </div>
              <h3 className="text-xl font-bold"> {name} </h3>
              <p className="text-gray-500 text-sm"> {description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProductList;
