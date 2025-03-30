import { IconArrowRight } from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import LoadingOverlay from "@/components/common/loadingOverlay";
import { Button, Input, Textarea } from "@heroui/react";
import { useCreateProduct } from "../../api/organization.tsx";
import FileUpload from "../common/fileUpload.tsx";
import { addToast } from "@heroui/toast";
import { CreateProductForm as TCreateProductForm } from "../../types/product";

// Define Zod schema for validation
const formSchema = z.object({
  name: z.string().min(1, "Name of product is required"),
  description: z.string().min(1, "Please add description for product"),
  website_url: z.string().optional(),
  logo_url: z.string().optional(),
  thumbnail_url: z.string().optional(),
});

export const ProductCreateForm = ({
  afterCreate,
}: {
  afterCreate: () => void;
}) => {
  const { register, formState, handleSubmit, setValue } = useForm<TCreateProductForm>({
    resolver: zodResolver(formSchema),
  });

  const [createProduct, { isLoading }] = useCreateProduct();

  const handleFormSubmission = async (values: TCreateProductForm) => {
    try {
      await createProduct(values);

      addToast({
        title: "Product Created",
        color: "success",
      });

      afterCreate();
    } catch (e) {
      addToast({
        title: "Failed to create product",
        color: "danger",
        description: JSON.stringify(e),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmission)} className="w-full flex flex-col space-y-4">
      <LoadingOverlay loading={isLoading} />

      <Input
        label="Name"
        type="text"
        {...register("name")}
        errorMessage={formState.errors.name?.message}
      />

      <Textarea
        label="Description"
        {...register("description")}
        errorMessage={formState.errors.description?.message}
      />

      <Input
        label="Website URL"
        type="text"
        {...register("website_url")}
        errorMessage={formState.errors.website_url?.message}
      />

      <FileUpload
        label="Upload Thumbnail"
        onSelect={(url) => setValue("thumbnail_url", url)}
      />

      <Button type="submit" color="primary" endContent={<IconArrowRight />}>
        Create Product
      </Button>
    </form>
  );
};
