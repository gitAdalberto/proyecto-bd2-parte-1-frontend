import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { useState } from "react";
import { editCategory } from "../actions/categories";

export default function EditButton({id, nombre, descripcion, estado, handleRefresh}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [category, setCategory] = useState({
        nombre: nombre,
        descripcion: descripcion,
        estado: estado
    });

    const handleChange = (e) =>{
        setCategory((prev) => ({
            ...prev,
             [e.target.name]: e.target.value,
        }));
    };

    const handleEdit = async () => {
        console.log({category});
        
        const response = await editCategory(id, category);
        console.log(response);
        if (response.success) {
            toast({
                title:"Categoria editada",
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
                description: response?.data.mensaje,
                status: 'error',
                isClosable: true,
                duration: 5000
            });
        }
    }

    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme="blue" leftIcon={<EditIcon />} iconSpacing={0} ></Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Editar Categoria</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input placeholder='Nombre' name="nombre" value={category?.nombre} onChange={handleChange}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input placeholder='Descripcion' name="descripcion"  value={category?.descripcion} onChange={handleChange}/>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={()=>handleEdit()}>
                            Guardar
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}