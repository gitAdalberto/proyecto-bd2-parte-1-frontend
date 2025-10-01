"use client"
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    FormControl,
    FormLabel,
    Input,
    Box,
    useToast,
    Select,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useRef, useState } from 'react';
import { createUser } from '@/actions/user';
export default function AddButton({ handleFetch }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const toast = useToast();

    const [user, setUser] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");
    const [show, setShow] = useState(false);

    const createToast = (description, status) => {
        toast({
            title: 'Crear usuario',
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
            position: 'top-right'
        })
    }
    const clean = () => {
        setUser("");
        setEmail("");
        setRole("");
        setPassword1("");
        setPassword2("");
        setShow(false);
    }
    const handleClick = async () => {
        const response = await createUser(
            user,
            password1,
            password2,
            email,
            role
        );
        if (response.success) {
            createToast(response.data?.mensaje, "success");
            handleFetch();
            clean();
            onClose();
        } else {
            createToast(response.data?.mensaje, "error");
            return;
        }
    }

    return (
        <>
            <Button variant='outline' onClick={onOpen} colorScheme='green' leftIcon={<AddIcon />}>Crear</Button>

            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Agregar usuario</ModalHeader>
                    <ModalCloseButton />
                    <Box>
                        <ModalBody display="flex" flexDirection="column" gap={1}>
                            <FormControl>
                                <FormLabel>Usuario</FormLabel>
                                <Input ref={initialRef} placeholder='Usuario' value={user} onChange={(e) => setUser(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Correo</FormLabel>
                                <Input placeholder='Correo' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Rol</FormLabel>
                                <Select placeholder="Selecciona un rol" value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="admin">Admin</option>
                                    <option value="secretaria">Secretaria</option>
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Contraseña</FormLabel>
                                <InputGroup>
                                    <Input placeholder='Contraseña' type={show ? "text" : "password"} value={password1} onChange={(e) => setPassword1(e.target.value)} />
                                    <InputRightElement>
                                        <Button
                                            onClick={() => {
                                                setShow(!show);
                                            }}
                                            variant="ghost"
                                            iconSpacing={0}
                                            leftIcon={show ? <FaEyeSlash /> : <FaEye />}
                                        >
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <FormControl>
                                <FormLabel>Repetir Contraseña</FormLabel>
                                <InputGroup>
                                    <Input placeholder='Repetir Contraseña' type={show ? "text" : "password"} value={password2} onChange={(e) => setPassword2(e.target.value)} />
                                    <InputRightElement>
                                        <Button
                                            onClick={() => {
                                                setShow(!show);
                                            }}
                                            variant="ghost"
                                            iconSpacing={0}
                                            leftIcon={show ? <FaEyeSlash /> : <FaEye />}
                                        >
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme='green' mr={3} onClick={handleClick}>Agregar</Button>
                            <Button colorScheme='blue' onClick={() => {
                                onClose();
                                clean();
                            }}>Cerrar</Button>
                        </ModalFooter>
                    </Box>
                </ModalContent>
            </Modal>
        </>
    )
};
