import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useState } from "react";
import { usePostProduct } from "../hooks/useProducts";


export default function AddButton({}) {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mutation = usePostProduct(onClose);

    const [product, setProduct] = useState({
        codigoProducto: "",
        nombre: "",
        descripcion: "",
        precioVenta: "",
        precioCosto: ""
    });

    const handleChange = (e) =>{
        setProduct({
            ...product,
             [e.target.name]: e.target.value
        })
    };

    const handleCreate = () =>{
        mutation.mutate(product);
    }

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
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    Q
                                </InputLeftElement>
                                <Input placeholder='Precio Venta' name="precioVenta" onChange={handleChange}/>
                            </InputGroup>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Precio Costo</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none' >
                                    Q
                                </InputLeftElement>
                                <Input placeholder='Precio Costo' name="precioCosto" onChange={handleChange}/>
                            </InputGroup>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreate} >
                            Crear
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}