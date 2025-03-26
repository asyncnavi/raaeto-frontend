import {IconPlus} from "@tabler/icons-react";
import {Button, useDisclosure} from "@heroui/react";
import {useParams} from "react-router-dom";
import {FC} from "react";
import {useGetProductFeatures} from "../../api/product.tsx";
import FeatureCreateModal from "./featureCreateModal.tsx";
import {Feature} from "../../types/feature.ts";
import FeatureCard from "./featureCard.tsx";


type FeaturesGridProps = {
    features: Feature[]
}

const FeaturesGrid: FC<FeaturesGridProps> = ({features}) => {


    return (
        <div className="grid grid-cols-4 gap-4">
            {
                features?.map((feature) => {
                    return <FeatureCard key={feature.id} name={feature.name}
                                        description={feature?.description ?? ''}
                                        id={feature.id}
                    />
                })
            }

        </div>
    )
}

const FeatureListGrid = () => {
    // const [file, setFile] = useState(null)


    const {id: productId} = useParams()


    const {data: features} = useGetProductFeatures({
        product_id: productId as string
    }, {
        skip: !productId
    })
    const {isOpen, onOpen, onOpenChange} = useDisclosure()
    //
    //
    // const handleFileUpload = async (event) => {
    //
    //     const formData = new FormData();
    //     formData.append("image", file);
    //
    //     try {
    //         const response = await authClient.post(BASE_URL + "/upload", formData, {
    //             headers: {
    //                 "Content-Type": "multipart/form-data",
    //             },
    //         });
    //         console.log("File uploaded successfully:", response.data);
    //     } catch (error) {
    //         console.error("Error uploading file:", error);
    //     }
    // };
    //
    // const handleFileChange = (event: any) => {
    //     setFile(event.target.files[0])
    // }

    return (

        <div>
            <FeatureCreateModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
            <div className="w-full flex justify-end">
                <Button onPress={onOpen} endContent={<IconPlus/>} variant="solid" color="primary">
                    Create Feature
                </Button>

            </div>


            <FeaturesGrid features={features ?? []}/>
            {/*<div className="grid grid-cols-4 gap-4">*/}
            {/*    <Input  onChange={handleFileChange} type="file" label="Upload File"/>*/}
            {/*    <Button onPress={handleFileUpload} color="primary">Upload</Button>*/}
            {/*</div>*/}


        </div>
    );
};

export default FeatureListGrid;
