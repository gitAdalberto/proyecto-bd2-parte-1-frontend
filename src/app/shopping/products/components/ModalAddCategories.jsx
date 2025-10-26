import { AddIcon } from "@chakra-ui/icons"
import { Button, List, ListItem, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react"
import { useCategories, useProductCategories } from "../hooks/useProducts";
import PopOverCategories from "./PopOverCategories";
import ButtonAddCategory from "./ButtonAddCategory";

export default function ModalAddCategories({ productId }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { data, isLoading, isError, error } = useCategories();
    return (
        <>
            <Button onClick={onOpen} leftIcon={<AddIcon />} colorScheme="green" variant='solid'>Agregar</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Seleeccione Categoria a agregar</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {isLoading && <Spinner/>}
                        {isError && <Text>{error.message}</Text>}
                        <List display='flex' flexDirection='column' gap='0.5em' >
                            {!data || data.length == 0 && <ListItem>Sin categorias</ListItem>}
                            {data && data.map((d) => (
                                <ListItem key={d.id} >
                                    <ButtonAddCategory onClose={onClose} categoryId={d.id} productId={productId} >{d.nombre}</ButtonAddCategory>
                                </ListItem>)
                            )}
                        </List>
                    </ModalBody>

                    <ModalFooter>
                        <Button variant='ghost' onClick={onClose}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
