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
import { EditIcon } from '@chakra-ui/icons'
import { useState, useRef, useEffect } from 'react';
import { editStudent } from '@/actions/students';
export default function EditButton({ id, nombre, apellido, carne, correo, telefono, handleFetch }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const toast = useToast();

    const [nuevoNombre, setNuevoNombre] = useState("");
    const [nuevoApellido, setNuevoApellido] = useState("");
    const [nuevoCarne, setNuevoCarne] = useState("");
    const [nuevoCorreo, setNuevoCorreo] = useState("");
    const [nuevoTel, setNuevoTel] = useState("");

    useEffect(() => {
        setNuevoNombre(nombre || "");
        setNuevoApellido(apellido || "");
        setNuevoCarne(carne || "");
        setNuevoCorreo(correo || "");
        setNuevoTel(telefono || "");
    }, [nombre, apellido, carne, correo, telefono]);

    const createToast = (description, status) => {
        toast({
            title: 'Editar estudiante',
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
            position: 'top-right'
        })
    }



    const handleClick = async () => {
        const response = await editStudent(
            id,
            nuevoNombre,
            nuevoApellido,
            nuevoCarne,
            nuevoCorreo,
            nuevoTel
        );
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
            <Button  variant='outline' onClick={onOpen} colorScheme='blue' ref={finalRef} leftIcon={<EditIcon/>} iconSpacing='0'></Button>

            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} finalFocusRef={finalRef} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar estudiante</ModalHeader>
                    <ModalCloseButton />
                    <Box>
                        <ModalBody display="flex" flexDirection="column" gap={1}>
                            <FormControl>
                                <FormLabel>Nombre</FormLabel>
                                <Input ref={initialRef} placeholder='Nombre' type='text' value={nuevoNombre} onChange={(e) => setNuevoNombre(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Apellido</FormLabel>
                                <Input placeholder='Apellido' type='text' value={nuevoApellido} onChange={(e) => setNuevoApellido(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Carne</FormLabel>
                                <Input placeholder='Carne' type='number' value={nuevoCarne} onChange={(e) => setNuevoCarne(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Correo</FormLabel>
                                <Input placeholder='Correo' type='email' value={nuevoCorreo} onChange={(e) => setNuevoCorreo(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Telefono</FormLabel>
                                <Input placeholder='Telefono' type='tel' value={nuevoTel} onChange={(e) => setNuevoTel(e.target.value)} />
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='green' mr={3} onClick={handleClick}>Confirmar</Button>
                            <Button colorScheme='blue' onClick={onClose}>Cerrar</Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
};
