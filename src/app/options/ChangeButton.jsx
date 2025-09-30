import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    useDisclosure,
    useToast,
    Box,
    FormControl,
    FormLabel,
    Input,
} from '@chakra-ui/react'
import { changePassword } from "@/actions/login";
import { useRef } from 'react';
export default function ChangeButton() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const initialRef = useRef(null);
    const createToast = (description, status) => {
        toast({
            title: "Cambiar contraseña",
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    };
    const handleClick = async (formData) => {
        const response = await changePassword(formData);
        console.log(response);
        if (response.success) {
            createToast(response.data?.mensaje, "success");
        } else {
            createToast(response.data?.mensaje, "error");
        }
    };
    return (
        <>
            <Button colorScheme='blue' variant='outline' onClick={onOpen}>Cambiar</Button>

            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Modal Title</ModalHeader>
                    <ModalCloseButton />
                    <Box as="form" action={handleClick} direction="column">
                        <ModalBody>

                            <FormControl>
                                <FormLabel>Nueva Contraseña</FormLabel>
                                <Input type="password" name="password1" ref={initialRef}/>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Confirmar Contraseña</FormLabel>
                                <Input type="password" name="password2" />
                            </FormControl>


                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="blue" my="1em" type="submit" mr='1em'>
                                Confirmar
                            </Button>
                            <Button colorScheme='blue' mr={3} onClick={onClose} variant='outline'>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )

};
