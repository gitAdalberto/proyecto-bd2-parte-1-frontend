"use client"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Flex,
    Text
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'

export default function ShowInfo({ usuario, correo, rol, estado}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button colorScheme='cyan' variant='outline' onClick={onOpen} leftIcon={<InfoIcon />} iconSpacing={0} ></Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Informacion</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Flex direction='column' gap='1em' >
                            <Text><Text as='b' >Usuario:</Text> {usuario}</Text>
                            <Text><Text as='b' >Correo:</Text> {correo}</Text>
                            <Text><Text as='b' >Estado:</Text> {estado ? "Habilitado" : "Deshabilitado"}</Text>
                            <Text><Text as='b'>Rol:</Text> {rol}</Text>
                            <Text>Gestion de estudiantes (CRUD)</Text>
                            { rol === 'admin' && <Text>Creacion y bloqueo/desbloqueo de usuarios</Text>}
                            { rol === 'admin' && <Text>Acceso a reportes y generacion de PDF</Text>}

                        </Flex>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
