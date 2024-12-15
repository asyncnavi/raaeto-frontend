import { IconArrowRight, IconX } from "@tabler/icons-react";
import { FC } from "react";
import useDetectClickOutside from "../hooks/useDetectClickOutside";

type Props = {
  opened: boolean;
  trigger: () => void;
};

const CreateOrganizationModal: FC<Props> = ({ opened, trigger }) => {
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
            className="border-2 border-black bg-white p-4 space-y-5"
          >
            <div
              onClick={trigger}
              className="w-8 h-8 bg-gray-200 ml-auto flex items-center justify-center rounded-full border-2 border-black shadow-[4px_4px_black] hover:shadow-none transition-all .3s ease-in cursor-pointer"
            >
              <IconX />
            </div>
            <h2 className="text-3xl">Let's create your organization.</h2>
            <input
              className="outline-0 border p-4 w-full"
              placeholder="Enter the name for your organization"
            />
            <button className="w-full flex items-center gap-2 justify-center outline-none border-2 border-black px-5 py-2 bg-lime-300 font-semibold">
              Continue
              <IconArrowRight />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateOrganizationModal;
