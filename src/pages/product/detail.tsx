import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetProduct } from "../../api/product";
import LoadingOverlay from "../../ui/loadingOverlay";
import { Product } from "../../types/product";
import ProductFeatures from "./features/productFeatures.tsx";
import Header from "../../shared/header.tsx";
import {BreadcrumbItem, Breadcrumbs, Button,  Tab, Tabs} from "@heroui/react";
import BasicProductDetails from "./basicProductDetails.tsx";


const ProductDetail = () => {
    const { id } = useParams();

    const { data : product, isLoading } = useGetProduct(
        { id: id ?? "" },
        {
            skip: !id,
        },
    );

    const navigate = useNavigate();

    if (isLoading) {
        return <LoadingOverlay loading />;
    }
    return (
        <div>
            <Header />

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
                            <BasicProductDetails product={product as Product} />
                        </Tab>
                        <Tab key="features" title="Features">
                            <ProductFeatures  />
                        </Tab>

                        <Tab key="analytics" title="Analytics">
                            Analytics
                        </Tab>
                        <Tab key="settings" title="Settings">
                            Heee
                        </Tab>
                    </Tabs>
                </div>
            </main>
        </div>
    );
};

export default ProductDetail;
