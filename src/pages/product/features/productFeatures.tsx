import {IconPlus} from "@tabler/icons-react";
import {Button, useDisclosure} from "@heroui/react";
import CreateFeatureModal from "./createFeatureModal.tsx";
import {useParams} from "react-router-dom";
import {RootState} from "../../../store";
import {useSelector} from "react-redux";
import {useGetFeatures} from "../../../api/feature.tsx";
import FeatureCard from "../featureCard.tsx";


const ProductFeatures = () => {


    const {id: organizationId} = useSelector((root: RootState) => root.organizationStore)

    const {id: productId} = useParams()


    const {data: features} = useGetFeatures({
        organization_id: organizationId as string,
        product_id: productId as string
    }, {
        skip: !organizationId || !productId
    })
    const {isOpen, onOpen, onOpenChange} = useDisclosure()


    return (

        <div>
            <CreateFeatureModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
            <div className="w-full flex justify-end">
                <Button onPress={onOpen} endContent={<IconPlus/>} variant="solid" color="primary">
                    Create Feature
                </Button>

            </div>

            <div className="grid grid-cols-4 gap-4">
                {
                    features?.map((feature) => {
                        return <FeatureCard key={feature.id} name={feature.name}
                                            description={feature?.description ?? ''}
                                            id={feature.id}/>
                    })
                }

            </div>

        </div>
    );
};

export default ProductFeatures;
