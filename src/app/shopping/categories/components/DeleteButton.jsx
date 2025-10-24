import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure, useToast } from "@chakra-ui/react"
import { DeleteIcon } from "@chakra-ui/icons"
import { deleteCategory } from "../actions/categories";

export default function DeleteButton({id, handleRefresh}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const handleDelete = async () => {
        const response = await deleteCategory(id);
        console.log(response);
        if (response.success) {
            toast({
                title:"Categoria eliminada",
                description: response?.data.mensaje,
                status: 'success',
                isClosable: true,
                duration: 5000
            });
            onClose();
            handleRefresh();
            return;
        }
        if (!response.success) {
            toast({
                title:"Error al eliminar categoria",
                description: response?.data.mensaje || "Error inesperado",
                status: 'error',
                isClosable: true,
                duration: 5000
            });
        }
    }

    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme="red" leftIcon={<DeleteIcon />} iconSpacing={0}></Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Eliminar Categoria</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Text>¿Estas seguro de eliminar esta categoría?</Text>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleDelete}>
                            Eliminar
                        </Button>
                        <Button onClick={onClose}>Cancelar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}