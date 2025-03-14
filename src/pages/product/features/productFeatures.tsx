import {IconPlus} from "@tabler/icons-react";
import {Button, Input, useDisclosure} from "@heroui/react";
import CreateFeatureModal from "./createFeatureModal.tsx";
import {useParams} from "react-router-dom";
import {RootState} from "../../../store";
import {useSelector} from "react-redux";
import {useGetFeatures} from "../../../api/feature.tsx";
import FeatureCard from "../featureCard.tsx";
import {authClient, BASE_URL} from "../../../client";
import {useState} from "react";


const ProductFeatures = () => {
    const [file, setFile] = useState(null)

    const {id: organizationId} = useSelector((root: RootState) => root.organizationStore)

    const {id: productId} = useParams()


    const {data: features} = useGetFeatures({
        organization_id: organizationId as string,
        product_id: productId as string
    }, {
        skip: !organizationId || !productId
    })
    const {isOpen, onOpen, onOpenChange} = useDisclosure()


    const handleFileUpload = async (event) => {

        const formData = new FormData();
        formData.append("image", file);

        try {
            const response = await authClient.post(BASE_URL + "/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            console.log("File uploaded successfully:", response.data);
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0])
    }

    return (

        <div>
            <CreateFeatureModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange}/>
            <div className="w-full flex justify-end">
                <Button onPress={onOpen} endContent={<IconPlus/>} variant="solid" color="primary">
                    Create Feature
                </Button>

            </div>

            <div className="grid grid-cols-4 gap-4">
                <Input  onChange={handleFileChange} type="file" label="Upload File"/>
                <Button onPress={handleFileUpload} color="primary">Upload</Button>
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
