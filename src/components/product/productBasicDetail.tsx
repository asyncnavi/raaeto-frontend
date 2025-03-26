import { FC } from "react";
import { useForm } from "react-hook-form";
import {Product} from "../../types/product.ts";
import {Input, Textarea} from "@heroui/react";
type Props = {
    product: Product;
};

const ProductBasicDetail: FC<Props> = ({ product }) => {

    const { register } = useForm<Product>({
        defaultValues: product,
        disabled: true,
    });

    return (
        <div>
            <div className=" rounded-md p-4 space-y-4">
                <h2>Basic Details</h2>
                <Input  {...register("name")} label="Name"/>
                <Textarea  {...register("description")} label="Description"/>

                <Input
                    label="Website"
                    {...register("website_url")}
                    startContent={
                        <div className="pointer-events-none flex items-center">
                            <span className="text-default-400 text-small">https://</span>
                        </div>
                    }
                    type="url"
                />
                <Input  {...register("created_at")} label="Created At"/>
                <Input  {...register("updated_at")} label="Last Updation"/>

            </div>

        </div>
    );
};

export default ProductBasicDetail;
