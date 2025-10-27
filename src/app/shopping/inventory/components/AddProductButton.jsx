import { AddIcon } from "@chakra-ui/icons";
import { Button, Flex } from "@chakra-ui/react";

export default function AddProductButton({ id, codigoProducto, nombre, setProduct, onClose }) {
    const handleClick = () => {
        setProduct((prev) => ({
            ...prev,
            id: id,
            codigoProducto: codigoProducto,
            nombre: nombre
        }));
        onClose();
    }
    return (
        <Flex direction='row' gap='0.5em'>
            <Button
                colorScheme="green"
                variant='solid'
                leftIcon={<AddIcon />}
                iconSpacing={0}
                onClick={handleClick}
            />
            <Button w='100%' display='flex' justifyContent='flex-start'>
                {`${codigoProducto} - ${nombre}`}
            </Button>
        </Flex>
    )
};
