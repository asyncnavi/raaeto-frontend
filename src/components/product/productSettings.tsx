import {Alert, Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure} from "@heroui/react";
import {FC} from "react";
import {Product} from "@/types/product.ts";
import {useDeleteProduct} from "@/api/organization.tsx";
import {addToast} from "@heroui/toast";
import {useNavigate} from "react-router-dom";


type ConfirmModalProps = {
    onConfirm: () => void
    isOpen: boolean,
    title: string,
    onOpenChange?: ((isOpen: boolean) => void) | undefined
}

const ProductDeleteConfirmModal: FC<ConfirmModalProps> = ({onConfirm, isOpen, onOpenChange, title}) => {
    return (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Please Confirm</ModalHeader>
                        <ModalBody>
                                Are you sure to delete {title} ?
                        </ModalBody>
                        <ModalFooter>
                            <Button color="default" variant="light" onPress={onClose}>
                                Close
                            </Button>
                            <Button color="danger" onPress={onConfirm}>
                                Delete
                            </Button>
                        </ModalFooter>
                    </>
                )}
            </ModalContent>
        </Modal>
    )
}

const ProductSettings = ({product}: { product: Product }) => {

    const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
    const navigate = useNavigate()

    const [deleteProduct]= useDeleteProduct()


    const submitDeletion = async () => {
        try {
            await deleteProduct({
                product_id : product.id,
            })

            addToast({
                title : "Product Delete Successfully",
                color : "success"
            })

            navigate("/o")

        } catch (e) {
            addToast({
                title : "Could not delete product",
                description : JSON.stringify(e),
                color : "danger"
            })
            onClose()
        }
    }

    return (
        <div>
            <ProductDeleteConfirmModal title={product.name} onConfirm={() => submitDeletion()} isOpen={isOpen}
                                       onOpenChange={onOpenChange}/>
            <Alert
                color="danger"
                description="Once you deleted the product you cannot restore it again."
                endContent={
                    <Button onPress={onOpen} color="danger" size="sm" variant="flat">
                        Delete
                    </Button>
                }
                title="Delete"
                variant="faded"
            />
        </div>
    )
}


export default ProductSettings