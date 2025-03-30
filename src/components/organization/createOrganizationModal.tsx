import { Modal, ModalContent, ModalHeader, ModalBody, Button, Input, Textarea } from "@heroui/react";
import { z } from "zod";
import { addToast } from "@heroui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconArrowRight } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { CreateOrganization } from "@/types/organization";
import { useCreateOrganization } from "@/api/organization";
import FileUpload from "../common/fileUpload";

type Props = {
    isOpen: boolean;
    onOpenChange: (isOpen: boolean) => void;
    afterCreate: () => void;
};

export default function CreateOrganizationModal({ isOpen, onOpenChange, afterCreate }: Props) {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader className="flex flex-col gap-1">Create your organization</ModalHeader>
                <ModalBody>
                    <CreateForm afterCreate={afterCreate} />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
}

// Define Zod schema
const formSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters").max(256, "Name must be at most 256 characters"),
    description: z.string().max(2000, "Description must be at most 2000 characters").optional(),
    logo_url: z.string().optional(),
});

const CreateForm = ({ afterCreate }: { afterCreate: () => void }) => {
    const { register, formState, handleSubmit, setValue } = useForm<CreateOrganization>({
        resolver: zodResolver(formSchema),
    });

    const [createOrganization] = useCreateOrganization();

    const handleFormSubmission = async (values: CreateOrganization) => {
        try {
            await createOrganization(values);

            addToast({
                title: "Organization created successfully",
                color: "success",
            });

            afterCreate();
        } catch (e) {
            addToast({
                title: "Something went wrong",
                description: JSON.stringify(e),
                color: "danger",
            });
        }
    };

    return (
        <form className="space-y-5" onSubmit={handleSubmit(handleFormSubmission)}>
            <Input
                {...register("name")}
                label="Name"
                isInvalid={Boolean(formState.errors?.name)}
                errorMessage={formState.errors.name?.message}
            />
            <Textarea
                {...register("description")}
                label="Description"
                isInvalid={Boolean(formState.errors?.description)}
                errorMessage={formState.errors.description?.message}
            />

            <FileUpload label="Select Logo" onSelect={(url) => setValue("logo_url", url)} />

            <Button type="submit" fullWidth endContent={<IconArrowRight />} variant="solid" color="primary">
                Create Organization
            </Button>
        </form>
    );
};
