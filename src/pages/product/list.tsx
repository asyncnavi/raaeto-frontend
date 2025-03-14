import {IconPlus} from "@tabler/icons-react";
import { useGetProducts} from "../../api/organization";
import ProductCard, {ProductCardSkeleton} from "./productCard.tsx";
import {Button, useDisclosure} from "@heroui/react";
import CreateProductModal from "./createProductModal.tsx";
import {RootState} from "../../store";
import {useSelector} from "react-redux";

const ProductList = () => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const { id: orgId, status } = useSelector((state: RootState) => state.organization);

    const { data: products, isLoading } = useGetProducts({
        org_id : orgId ?? "",
    }, {
        skip: !orgId,
    });

    if (status === "loading" || !orgId) {
        return <p>Loading organization...</p>;
    }

    return (
        <div className="space-y-10">

            <CreateProductModal organizationId={orgId ?? ""} isOpen={isOpen} onOpen={onOpen}
                                onOpenChange={onOpenChange}/>

            <div className="w-full flex justify-end">

                <Button onPress={onOpen} color="primary" startContent={<IconPlus/>}>
                    Create New Product
                </Button>

            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4">

                {isLoading ? [1, 2, 3, 4, 5].map(() => {
                        return <ProductCardSkeleton/>
                    }) :
                    products?.map(({id, name, description}) => {
                        return (
                            <ProductCard
                                key={id}
                                productId={id}
                                name={name}
                                description={description ?? ""}
                            />
                        );
                    })}
            </div>
        </div>
    );
};

export default ProductList;


