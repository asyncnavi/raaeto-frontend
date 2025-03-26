
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody, Button, Input, Textarea
} from "@heroui/react";
import {IconArrowRight} from "@tabler/icons-react";
import {useForm} from "react-hook-form";
import Nope from "nope-validator";
import {nopeResolver} from "@hookform/resolvers/nope";
import {useSelector} from "react-redux";
import {useParams} from "react-router-dom";
import {FeatureCreateFields, FeatureStatus} from "../../types/feature.ts";
import {RootState} from "../../store";
import {useCreateFeature} from "../../api/feature.tsx";


type Props = {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (isOpen: boolean) => void;
}

export default function FeatureCreateModal({isOpen, onOpenChange}: Props) {
    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Create New Feature</ModalHeader>
                    <ModalBody>
                        <CreateFeatureForm />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}


const formSchema = Nope.object().shape({
    name: Nope.string().required("Name of feature is required")
        .min(2, "Feature Name should minimum of 2 letters")
        .max(256, "Feature Name cannot exceed 256 letters."),
    description: Nope.string().required("Please add description for feature"),
    video_url: Nope.string(),
    thumbnail_url: Nope.string(),
    status: Nope.string()
})

const CreateFeatureForm = () => {

    const {register, formState, handleSubmit} = useForm<FeatureCreateFields>({
        defaultValues: {
            status: FeatureStatus.Active,
        },
        resolver: nopeResolver(formSchema),

    })

    const { id : productId } = useParams()

    const [createFeature] = useCreateFeature()
    const {id: organizationId} = useSelector((root: RootState) => root.organization)


    const handleFormSubmission = async (values: FeatureCreateFields) => {
        createFeature({
            ...values,
            organization_id: organizationId?.toString() as string,
            product_id: productId?.toString() as string
        })
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