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
    FormControl,
    FormLabel,
    Input,
    Box,
    useToast
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { useRef } from 'react';
import { createStudent } from '@/actions/students';

export default function AddButton({ handleFetch }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const toast = useToast();

    const createToast = (description, status) => {
        toast({
            title: 'Crear estudiante',
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
            position: 'top-right'
        })
    }

    const handleClick = async (formData) => {
        console.log("Hola modal")
        

        const response = await createStudent(formData);
        console.log(response);
        if (!response.success) {
            createToast(response.data?.mensaje, 'error');
            return;
        } else {
            createToast(response.data?.mensaje, 'success');
            handleFetch();
            onClose();
        }

    }
    return (
        <>
            <Button onClick={onOpen} colorScheme='green' ref={finalRef} leftIcon={<AddIcon />}>Crear</Button>

            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} finalFocusRef={finalRef} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar estudiante</ModalHeader>
                    <ModalCloseButton />
                    <Box as='form' action={handleClick}>
                        <ModalBody display="flex" flexDirection="column" gap={1}>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input ref={initialRef} placeholder='Nombre' name='nombre' type='text' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Apellido</FormLabel>
                                <Input placeholder='Apellido' name='apellido' type='text' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Carne</FormLabel>
                                <Input placeholder='Carne' name='carne' type='number' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Correo</FormLabel>
                                <Input placeholder='Correo' name='correo' type='email' />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Telefono</FormLabel>
                                <Input placeholder='Telefono' name='telefono' type='tel' />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='green' mr={3} type='submit'>Agregar</Button>
                            <Button colorScheme='blue' onClick={onClose}>Cerrar</Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
};
