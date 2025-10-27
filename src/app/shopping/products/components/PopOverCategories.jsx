import { DeleteIcon } from '@chakra-ui/icons';
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button,
    Text,
    ButtonGroup,
    useDisclosure,
    Flex,
} from '@chakra-ui/react'
import { useDeleteProductCategory } from '../hooks/useProducts';
export default function PopOverCategories({ id, children }) {
    const { isOpen, onToggle, onClose } = useDisclosure();
    const mutation = useDeleteProductCategory(onClose);

    const handleDelete = () => {
        mutation.mutate(id);
    }

    return (
        <Popover placement='right' isOpen={isOpen} onClose={onClose}>

            <Flex direction='row' gap='1em' w='100%' align='center' >
                <Button onClick={onToggle} leftIcon={<DeleteIcon />} colorScheme='red' iconSpacing={0}></Button>
                <PopoverTrigger>
                    <Button w='100%'>{children}</Button>
                </PopoverTrigger>
            </Flex>

            <PopoverContent>
                <PopoverArrow />
                <PopoverCloseButton />
                <PopoverHeader>Eliminar Categoria</PopoverHeader>
                <PopoverBody>
                    <Text>¿Estas Seguro de que quieres eliminar la categoría del producto?</Text>
                </PopoverBody>
                <PopoverFooter display='flex' justifyContent='flex-end' >
                    <ButtonGroup>
                        <Button variant='solid' colorScheme='red' leftIcon={<DeleteIcon />} onClick={handleDelete}>Eliminar</Button>
                        <Button onClick={onClose} >Cancelar</Button>
                    </ButtonGroup>
                </PopoverFooter>
            </PopoverContent>
        </Popover>
    )
};
