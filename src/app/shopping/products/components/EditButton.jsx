import { Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react"
import { EditIcon } from "@chakra-ui/icons"
import { useState } from "react";
import { usePutProduct } from "../hooks/useProducts";


export default function EditButton({ id, codigoProducto, nombre, descripcion, precioVenta, precioCosto }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mutation = usePutProduct(onClose);

    const [product, setProduct] = useState({
        id: id,
        codigoProducto: codigoProducto,
        nombre: nombre,
        descripcion: descripcion,
        precioVenta: precioVenta,
        precioCosto: precioCosto
    });

    const handleChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    };

    const handlePut = () => {
        mutation.mutate(product);
    }

    return (
        <>
            <Button onClick={onOpen} variant='solid' colorScheme="blue" leftIcon={<EditIcon />} iconSpacing={0} ></Button>

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
                            <Input placeholder='Codigo Producto' name="codigoProducto" value={product.codigoProducto} onChange={handleChange} />
                        </FormControl>

                        <FormControl>
                            <FormLabel>Nombre</FormLabel>
                            <Input placeholder='Nombre' name="nombre" value={product.nombre} onChange={handleChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Descripcion</FormLabel>
                            <Input placeholder='Descripcion' name="descripcion" value={product.descripcion} onChange={handleChange} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Precio Venta</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    Q
                                </InputLeftElement>
                                <Input placeholder='Precio Venta' name="precioVenta" value={product.precioVenta} onChange={handleChange} />
                            </InputGroup>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Precio Costo</FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents='none'>
                                    Q
                                </InputLeftElement>
                                <Input placeholder='Precio Costo' name="precioCosto" value={product.precioCosto} onChange={handleChange} />
                            </InputGroup>
                        </FormControl>

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handlePut} >
                            Crear
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}