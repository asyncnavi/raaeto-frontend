import { IconArrowRight} from "@tabler/icons-react";
import  { FC } from "react";
import { useForm } from "react-hook-form";
import { CreateProductForm as TCreateProductForm } from "../../types/product";
import Nope from "nope-validator";
import { nopeResolver } from "@hookform/resolvers/nope/src/nope.js";
import { useCreateProduct } from "../../api/product";
import LoadingOverlay from "../../ui/loadingOverlay";
import {Button, Input, Textarea} from "@heroui/react";


const formSchema = Nope.object().shape({
    name: Nope.string().required("Name of product is required"),
    description: Nope.string().required("Please add description for product"),
    logo_url: Nope.string(),
    thumbnail_url: Nope.string(),
})


export const CreateProductForm: FC<{ organizationId: string }> = ({
                                                               organizationId,
                                                           }) => {
    const { register, formState, handleSubmit } = useForm<TCreateProductForm>({
        resolver: nopeResolver(formSchema),
    });

    const [createProduct, { isLoading }] = useCreateProduct();

    const handleFormSubmission = (values: TCreateProductForm) => {
        createProduct({ ...values, organization_id: `${organizationId}` });
    };

    return (
        <form
            onClick={handleSubmit(handleFormSubmission)}
            className="w-full flex flex-col space-y-4"
        >
            <LoadingOverlay loading={isLoading} />
            <Input label="Name" type="text" {...register("name")}
                errorMessage={formState.errors.name && formState.errors.name?.message}
            />
            <Textarea label="Description" {...register("description")}
                       errorMessage={formState.errors.description && formState.errors.description?.message}
            />

           <Button type="submit" color="primary" endContent={<IconArrowRight />} >
               Create Product
           </Button>

        </form>
    );
};

