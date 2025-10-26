import { Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useState } from "react";


export default function AddButton({}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [product, setProduct] = useState({
        nombre: "",
        descripcion: ""
    });

    const handleChange = (e) =>{
        setProduct({
            ...product,
             [e.target.name]: e.target.value
        })
    };


    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme="green" leftIcon={<AddIcon />} >Crear</Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Añadir Categoria</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Codigo Producto</FormLabel>
                            <Input placeholder='Codigo Producto' name="codigoProducto" onChange={handleChange}/>
                        </FormControl>

                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input placeholder='Nombre' name="nombre" onChange={handleChange}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input placeholder='Descripcion' name="descripcion" onChange={handleChange}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Precio Venta</FormLabel>
                            <Input placeholder='Precio Venta' name="precioVenta" onChange={handleChange}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Precio Costo</FormLabel>
                            <Input placeholder='Precio Costo' name="precioCosto" onChange={handleChange}/>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Crear
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}