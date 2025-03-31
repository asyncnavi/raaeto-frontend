import {IconPlus} from "@tabler/icons-react";
import {Button, useDisclosure} from "@heroui/react";
import {useParams} from "react-router-dom";
import {FC} from "react";
import {useGetProductFeatures} from "../../api/product.tsx";
import FeatureCreateModal from "./featureCreateModal.tsx";
import {Feature} from "@/types/feature.ts";
import FeatureCard from "./featureCard.tsx";
import { useGetUserOrganization } from "@/api/organization.tsx";


type FeaturesGridProps = {
    features: Feature[]
}

const FeaturesGrid: FC<FeaturesGridProps> = ({features}) => {

    return (
        <div className="grid grid-cols-4 gap-4">
            {
                features?.map((feature) => {
                    return <FeatureCard key={feature.id}  feature={feature} />
                })
            }
        </div>
    )
}

const FeatureListGrid = () => {
    
    const {id: productId} = useParams()

    const { data } = useGetUserOrganization()

    const {data: features } = useGetProductFeatures({
        product_id: parseInt(productId as string),
        organization_id: data?.id as number
    }, {
        skip: !productId || !data?.id
    })
    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure()
 


    return (

        <div>
            <FeatureCreateModal afterCreate={() => {
                onClose();
            }} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
            <div className="w-full flex justify-end">
                <Button onPress={onOpen} endContent={<IconPlus/>} variant="solid" color="primary">
                    Create Feature
                </Button>

            </div>
            <FeaturesGrid features={features ?? []}/>
        
        </div>
    );
};

export default FeatureListGrid;
