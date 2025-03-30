import { useGetUserOrganization } from "@/api/organization";
import { Alert, Button, useDisclosure } from "@heroui/react";
import CreateOrganizationModal from "./createOrganizationModal";
import { useNavigate } from "react-router-dom";

const CreateOrganizationAlert = () => {
  const { data: organization } = useGetUserOrganization();

  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const navigate = useNavigate()

  return (
    <>
      {!organization && (
        <>
          <Alert
            color="success"
            description="Create your own organization to showcase your products, gather valuable user feedback, and continuously improve your offerings. Start engaging with real users today and take your product to the next level!"
            title="Build Your Own Organization and Grow Your Product"
            variant="faded"
            className="container mx-auto w-full max-w-[968px] my-5"
            endContent={
              <Button onPress={onOpen} color="success" size="md" variant="solid">
                Get started
              </Button>
            }
          />
          <CreateOrganizationModal
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            afterCreate={() =>{ onClose();navigate("/o")}}
          />
        </>
      )}
    </>
  );
};

export default CreateOrganizationAlert;
