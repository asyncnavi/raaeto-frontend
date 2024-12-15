import { IconArrowRight, IconX } from "@tabler/icons-react";
import { FC } from "react";
import useDetectClickOutside from "../../hooks/useDetectClickOutside";
import { useForm } from "react-hook-form";
import { CreateProductForm as TCreateProductForm } from "../../types/product";
import Nope from "nope-validator";
import { nopeResolver } from "@hookform/resolvers/nope/src/nope.js";

type Props = {
  opened: boolean;
  trigger: () => void;
};

const formSchema = Nope.object().shape({
  name: Nope.string().required("Name of product is required"),
  description: Nope.string().required("Please add description for product"),
  logo_url: Nope.string(),
  thumbnail_url: Nope.string(),
});
const CreateProductForm = () => {
  const { register } = useForm<TCreateProductForm>({
    resolver: nopeResolver(formSchema),
  });

  return (
    <div className="w-full flex flex-col space-y-4">
      <h2 className="text-2xl">Create New Product.</h2>
      <input
        {...register("name")}
        className="outline-0 border p-4 w-full"
        placeholder="Name of your product"
      />
      <textarea
        {...register("description")}
        className="outline-0 border p-4 w-full"
        placeholder="Add description for your product"
      />

      <button className="w-full flex items-center gap-2 justify-center outline-none border-2 border-black px-5 py-2 bg-lime-300 font-semibold">
        Continue
        <IconArrowRight />
      </button>
    </div>
  );
};

const CreateProductModal: FC<Props> = ({ opened, trigger }) => {
  const modelRef = useDetectClickOutside({
    onOutsideClick: trigger,
    isActive: opened,
  });

  return (
    <>
      {opened && (
        <div className="absolute top-0 left-0 bottom-0 bg-[rgba(256,256,256,0.90)] w-full h-full flex justify-center items-center">
          <div
            ref={modelRef}
            className="w-full max-w-[400px] border-2 border-black bg-white p-4 space-y-5"
          >
            <div
              onClick={trigger}
              className="w-8 h-8 bg-gray-200 ml-auto flex items-center justify-center rounded-full border-2 border-black shadow-[4px_4px_black] hover:shadow-none transition-all .3s ease-in cursor-pointer"
            >
              <IconX />
            </div>
            <CreateProductForm />
          </div>
        </div>
      )}
    </>
  );
};

export default CreateProductModal;
