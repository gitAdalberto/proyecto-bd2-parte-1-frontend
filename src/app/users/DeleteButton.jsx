"use client"
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import { DeleteIcon } from '@chakra-ui/icons';
import { deleteUser } from '@/actions/user';
export default function DeleteButton({Id, handleFetch}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const createToast = (description, status) => {
        toast({
            title: 'Eliminar usuario',
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
            position: 'top-right'
        })
    }
    const handleDelete = async () =>{
            const response = await deleteUser(Id);
            if (!response.success) {
                createToast(response.data?.mensaje, 'error');
                onClose();
            } else {
                createToast(response.data?.mensaje, 'success');
                handleFetch();
                onClose();
            }
        }
    return (
        <>
            <Button onClick={onOpen} colorScheme='red'><DeleteIcon color="white"/></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Eliminación de usuario</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <p>¿Está seguro de eliminar al usuario?</p>
                    </ModalBody>
                    
                    <ModalFooter>
                        <Button colorScheme='red' mr={3} onClick={handleDelete}>Eliminar</Button>
                        <Button colorScheme='blue' onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
