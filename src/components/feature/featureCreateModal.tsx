import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody, Button, Input, Textarea
} from "@heroui/react";
import {IconArrowRight} from "@tabler/icons-react";
import {useForm} from "react-hook-form";
import {useParams} from "react-router-dom";
import {FeatureCreateFields, FeatureStatus} from "@/types/feature.ts";
import {useCreateFeature} from "@/api/feature.tsx";
import {addToast} from "@heroui/toast";
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useGetUserOrganization } from "@/api/organization";


const formSchema = z.object({
    name: z.string()
        .min(2, "Feature Name should be a minimum of 2 letters")
        .max(256, "Feature Name cannot exceed 256 letters")
        .nonempty("Name of feature is required"),
    description: z.string().nonempty("Please add a description for the feature"),
    video_url: z.string().optional(),
    thumbnail_url: z.string().optional(),
    status: z.string()
});

type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (isOpen: boolean) => void;
    afterCreate : () => void;
}

export default function FeatureCreateModal({isOpen, onOpenChange, afterCreate}: Props) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Create New Feature</ModalHeader>
                    <ModalBody>
                        <CreateFeatureForm afterCreate={afterCreate} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}


const CreateFeatureForm = ({ afterCreate} : {afterCreate : () => void }) => {

    const {register, formState, handleSubmit} = useForm<FeatureCreateFields>({
        defaultValues: {
            status: FeatureStatus.Active,
        },
        resolver: zodResolver(formSchema),

    })

    const {id: productId} = useParams()

    const [createFeature] = useCreateFeature()
    const {data } = useGetUserOrganization()


    const handleFormSubmission = async (values: FeatureCreateFields) => {

        try {
            createFeature({
                ...values,
                organization_id: data?.id as number,
                product_id: parseInt(productId as string)
            })
            addToast({
                title : "Feature created successfully",
                color : "success"
            })
            afterCreate()
        } catch (e) {
            addToast({
                title : "Something went wrong",
                description : JSON.stringify(e),
                color : "danger"
            })
        }

    }


    return (
        <div>
            <form className="space-y-5" onSubmit={handleSubmit(handleFormSubmission)}>
                <Input {...register("name")} label="Name"
                       isInvalid={Boolean(formState.errors?.name)}
                       errorMessage={formState.errors.name?.message}/>
                <Textarea {...register("description")} label="Description"
                          isInvalid={Boolean(formState.errors?.description)}
                          errorMessage={formState.errors.description?.message}
                />
                <Button type="submit" fullWidth endContent={<IconArrowRight/>} variant="solid" color="primary">
                    Create Feature
                </Button>
            </form>
        </div>
    );
}
