import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { useDeleteProduct } from "../hooks/useProducts";


export default function DeleteButton({id}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mutation = useDeleteProduct(onClose);

    const handleDelete = () =>{
        mutation.mutate(id);
    }

    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme="red" leftIcon={<DeleteIcon />} iconSpacing={0}></Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Eliminar producto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text>¿Estas seguro de eliminar este producto?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleDelete} >
                            Eliminar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}