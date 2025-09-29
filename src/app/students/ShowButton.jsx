import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Icon,
    useDisclosure,
    Stack,
    StackDivider,
    Box,
    Heading,
    Text
    
} from '@chakra-ui/react'
import { InfoIcon } from '@chakra-ui/icons'
export default function ShowButton({
    nombre, apellido, carne, correo, telefono, fechaRegistro
}) {
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (
        <>
            <Button onClick={onOpen} colorScheme='blue'><InfoIcon color='white' /></Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Información de estudiante</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Card>
                            <CardHeader></CardHeader>
                            <CardBody>
                                <Stack divider={<StackDivider />} spacing='4'>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Nombre
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {nombre}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Apellido
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {apellido}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Carne
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {carne}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Carne
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {carne}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Correo
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {correo}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Telefono
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {telefono}
                                        </Text>
                                    </Box>
                                    <Box>
                                        <Heading size='xs' textTransform='uppercase'>
                                            Fecha de registro
                                        </Heading>
                                        <Text pt='2' fontSize='sm'>
                                            {fechaRegistro}
                                        </Text>
                                    </Box>
                                </Stack>
                            </CardBody>
                        </Card>
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
