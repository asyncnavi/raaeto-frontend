import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@heroui/react";
import {CreateProductForm} from "./createProductForm.tsx";


type AddProductModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (isOpen: boolean) => void;
    organizationId: string;
}


export default function CreateProductModal({isOpen, onOpenChange, organizationId}: AddProductModalProps) {

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Create Product</ModalHeader>
                    <ModalBody>
                        <CreateProductForm organizationId={organizationId}/>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
