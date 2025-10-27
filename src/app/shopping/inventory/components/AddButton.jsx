import { AddIcon } from '@chakra-ui/icons'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Button,
    useDisclosure,
    Textarea,
    InputGroup,
    InputRightElement,
} from '@chakra-ui/react'
import { useState } from 'react';
import SelectProductModal from './SelectProductModal';
import { usePostInvetoryMovements } from '../hooks/useInventory';
export default function AddButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const mutation = usePostInvetoryMovements(onClose);

    const handlePost = () =>{
        mutation.mutate(product);
    }

    const [product, setProduct] = useState({
        id:"",
        codigoProducto: "",
        nombre: "",
        descripcion: "",
        precioVenta: "",
        precioCosto: "",
        cantidad: "",
        motivo: "",
        tipoMovimiento: "entrada"
    });

    const handleChange = (e) => {
        setProduct({
            ...product,
            [e.target.name]: e.target.value
        })
    };

    return (
        <>
            <Button
                onClick={onOpen}
                variant='solid'
                colorScheme='green'
                leftIcon={<AddIcon />}
            >
                Agregar
            </Button>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Realizar entrada</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Codigo Producto</FormLabel>
                            <InputGroup>
                                <Input  value={`${product.codigoProducto} - ${product.nombre}` || ""} placeholder='Codigo Producto' name='codigoProducto' isDisabled/>
                                <InputRightElement>
                                    <SelectProductModal setProduct={setProduct}/>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Cantidad</FormLabel>
                            <Input placeholder='Cantidad' name='cantidad' onChange={handleChange}/>
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Motivo</FormLabel>
                            <Textarea placeholder='Motivo' name='motivo' onChange={handleChange} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handlePost}>
                            Realizar
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
