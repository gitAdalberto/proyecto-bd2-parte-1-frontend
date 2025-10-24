import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useState } from "react";
import { createCategory } from "../actions/categories";

export default function AddButton({handleRefresh}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [category, setCategory] = useState({
        nombre: "",
        descripcion: ""
    });

    const handleChange = (e) =>{
        setCategory({
            ...category,
             [e.target.name]: e.target.value
        })
    };

    const handleCreate = async () => {
        const response = await createCategory(category);
        console.log(response);
        if (response.success) {
            toast({
                title:"Categoria creada",
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
                title:"Error al crear categoria",
                description: response?.data,
                status: 'error',
                isClosable: true,
                duration: 5000
            });
        }
    }

    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme="green" leftIcon={<AddIcon />} >Crear</Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Añadir Categoria</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input placeholder='Nombre' name="nombre" onChange={handleChange}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input placeholder='Descripcion' name="descripcion" onChange={handleChange}/>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>handleCreate()}>
                            Imprimir
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}