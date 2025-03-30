import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
} from "@heroui/react";
import {ProductCreateForm} from "./productCreateForm.tsx";


type AddProductModalProps = {
    isOpen: boolean;
    onOpen: () => void;
    onOpenChange: (isOpen: boolean) => void;
    afterCreate : () => void
}


export default function ProductCreateModal({isOpen, onOpenChange, afterCreate}: AddProductModalProps) {

    return (
        <>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    <ModalHeader className="flex flex-col gap-1">Create Product</ModalHeader>
                    <ModalBody>
                        <ProductCreateForm afterCreate={afterCreate} />
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
