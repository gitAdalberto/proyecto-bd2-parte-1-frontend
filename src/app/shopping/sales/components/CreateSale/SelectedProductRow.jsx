import { CloseIcon } from "@chakra-ui/icons";
import { Button, Flex, Input, InputGroup, InputLeftElement, Text } from "@chakra-ui/react";


export default function SelectedProductRow({ product, handleChangeQuantity, deleteProduct }) {
    return (
        <Flex direction='row' mb='1em' gap='1em'>
            <Button
                iconSpacing={0}
                leftIcon={<CloseIcon />}
                colorScheme="red"
                onClick={()=>deleteProduct(product.id)}
            />
            <Input
                defaultValue={`${product.codigoProducto} - ${product.nombre}` || ""}
                readOnly
            />
            <Input
                placeholder="Cantidad"
                type="number"
                value={product.cantidad || ""}
                onChange={(e) => handleChangeQuantity(product.id, Number(e.target.value))}
            />
            <InputGroup>
                <InputLeftElement>
                    Q
                </InputLeftElement>
                <Input
                    type="number"
                    value={product.subtotal || 0}
                    readOnly
                />
            </InputGroup>
        </Flex>
    )
};
