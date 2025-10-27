import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, InputGroup, InputRightElement, List, ListItem, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useState } from "react";
import { useProductNames } from "../../products/hooks/useProducts";
import AddProductButton from "./AddProductButton";

export default function SelectProductModal({setProduct }) {

    const { isOpen, onOpen, onClose } = useDisclosure();

    const [obj, setObj] = useState({
        id:"",
        codigoProducto: "",
        nombre: "",
        descripcion: "",
        precioVenta: "",
        precioCosto: ""
    });

    const handleChange = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
    };

    const { data, isLoading, isError, error } = useProductNames(obj.codigoProducto);

    return (
        <>
            <Button leftIcon={<SearchIcon />} iconSpacing={0} onClick={onOpen} />

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Seleccionar producto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <InputGroup>
                            <Input value={obj.codigoProducto} placeholder='Codigo Producto' name='codigoProducto' onChange={handleChange} />
                            <InputRightElement>
                                <Button leftIcon={<SearchIcon />} iconSpacing={0} />
                            </InputRightElement>
                        </InputGroup>
                        {isLoading && <Spinner />}
                        {isError && <Text>{error.message}</Text>}
                        <Flex direction='column' gap='0.5em' mt='0.5em'>
                            {
                                data && data.length > 0 && data.map((d) => (
                                    <AddProductButton {...d} key={d.id}   setProduct={setProduct} onClose={onClose} />
                                ))
                            }
                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )

};
