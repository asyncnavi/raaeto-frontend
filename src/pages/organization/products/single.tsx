import {IconArrowLeft} from "@tabler/icons-react";
import {useNavigate, useParams} from "react-router-dom";
import {BreadcrumbItem, Breadcrumbs, Button, Tab, Tabs} from "@heroui/react";
import {useGetProduct} from "@/api/product";
import {Product} from "@/types/product.ts";
import ProductBasicDetail from "@/components/product/productBasicDetail.tsx";
import FeatureListGrid from "@/components/feature/featureListGrid.tsx";
import LoadingOverlay from "@/components/common/loadingOverlay.tsx";
import ProductSettings from "@/components/product/productSettings.tsx";
import { useGetUserOrganization } from "@/api/organization";


const SingleProductPage = () => {
    const {id} = useParams();
      

    const { data } = useGetUserOrganization()

    const {data: product, isLoading} = useGetProduct(
        {
            product_id: parseInt(id as string),
            organization_id: data?.id as number
        },
        {
            skip: !id,
        },
    );

    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingOverlay loading/>;
    }
    return (
        <div>

            <main className="container mx-auto py-4 space-y-8">
                <div className="flex items-center gap-2">
                    <Button isIconOnly onPress={() => navigate(-1)} variant="faded">
                        <IconArrowLeft/>
                    </Button>
                    <Breadcrumbs size="lg">
                        <BreadcrumbItem>Products</BreadcrumbItem>
                        <BreadcrumbItem>{product?.name}</BreadcrumbItem>
                    </Breadcrumbs>
                </div>

                <div className="flex w-full flex-col">
                    <Tabs aria-label="Options">
                        <Tab key="details" title="Basic Details">
                            <ProductBasicDetail product={product as Product}/>
                        </Tab>
                        <Tab key="features" title="Features">
                            <FeatureListGrid/>
                        </Tab>
                        <Tab key="settings" title="Settings">
                            <ProductSettings product={product as Product} />
                        </Tab>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};

export default SingleProductPage;
