import { AddIcon, ViewIcon } from "@chakra-ui/icons"
import { Button, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react"
import { useProductCategories } from "../hooks/useProducts";
import PopOverCategories from "./PopOverCategories";

export default function ModalCategories({ productId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, isLoading, isError, error } = useProductCategories(productId);
    return (
        <>
            <Button onClick={onOpen} iconSpacing={0} leftIcon={<ViewIcon />} colorScheme="gray" variant='solid'/>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Categorias del producto</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isLoading && <Spinner/>}
                        {isError && <Text>{error.message}</Text>}
                        <List display='flex' flexDirection='column' gap='0.5em' >
                            {!data || data.length == 0 && <ListItem>Sin categorias</ListItem>}
                            {data && data.map((d) => (
                                <ListItem key={d.id} >
                                    <PopOverCategories id={d.id} >{d.nombre}</PopOverCategories>
                                </ListItem>)
                            )}
                        </List>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='green' mr={3} leftIcon={<AddIcon />}>
                            Agregar
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
