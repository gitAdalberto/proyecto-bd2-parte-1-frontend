import { AddIcon, SearchIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Spinner, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useProductNames } from "../../../products/hooks/useProducts";

export default function ProductSelectionPanel({ handleAdd }) {
    const [searchedProduct, setSearchedProduct] = useState({
        id: "",
        codigoProducto: "",
        nombre: "",
        descripcion: "",
        precioVenta: "",
        precioCosto: ""
    });

    const handleChange = (e) => {
        setSearchedProduct({
            ...searchedProduct,
            [e.target.name]: e.target.value
        })
    };
    const { data, isLoading, isError, error } = useProductNames(searchedProduct.codigoProducto);

    return (
        <Flex w='24em' direction='column'  flexShrink={0}>
            <FormControl mb='1em'>
                <FormLabel>Buscar Producto</FormLabel>
                <InputGroup>
                    <Input
                        placeholder="Codigo Producto"
                        name="codigoProducto"
                        onChange={handleChange}
                        value={searchedProduct.codigoProducto || ""}
                    />
                    <InputLeftElement>
                        <SearchIcon />
                    </InputLeftElement>
                </InputGroup>
            </FormControl>
            {isLoading && <Flex w='100%' justifyContent='center' ><Spinner /></Flex>}
            {isError && <Text>{error.message}</Text>}
            <Flex direction='column' gap='1em' >
                {
                    data && data.length > 0 && data.map((product) => (
                        <Flex key={product.id} direction='row' gap='1em' align='center'>
                            <Button
                                leftIcon={<AddIcon />}
                                iconSpacing={0}
                                variant='solid'
                                colorScheme="green"
                                onClick={() => {
                                    handleAdd(product);
                                    setSearchedProduct({
                                        id: "",
                                        codigoProducto: "",
                                        nombre: "",
                                        descripcion: "",
                                        precioVenta: "",
                                        precioCosto: ""
                                    })
                                }}
                            />
                            <Text>{product.codigoProducto} - {product.nombre}</Text>
                        </Flex>
                    ))
                }
            </Flex>
        </Flex>
    )
};
