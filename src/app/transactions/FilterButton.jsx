"use client"
import { getFilterTransactions } from '@/actions/transactions';
import { ExternalLinkIcon } from '@chakra-ui/icons';
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
    FormControl,
    FormLabel,
    Input,
    useToast
} from '@chakra-ui/react'
import { useState, useRef } from 'react'

export default function FilterButton({ setError, startTransition, setData }) {
    const [usuario, setUsuario] = useState("");
    const [accion, setAccion] = useState("");
    const [tabla, setTabla] = useState("");
    const [id, setId] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const handleClean = () => {
        setUsuario("");
        setAccion("");
        setTabla("");
        setId("");
        setFechaInicio("");
        setFechaFin("");
    }

    const handleClick = async () => {
        const fInicio = fechaInicio ? fechaInicio.replace("T", " ") + ":00.000" : null;
        const fFin = fechaFin ? fechaFin.replace("T", " ") + ":00.000" : null;

        setError(null);
        startTransition(async () => {
            try {
                const response = await getFilterTransactions(
                    usuario || null,
                    accion || null,
                    tabla || null,
                    id || null,
                    fInicio,
                    fFin
                )

                
                if (response.data.mensaje) {
                    console.log("toast")
                    toast({
                        title: "Filtrar transacciones",
                        description: response.data.mensaje,
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right'
                    })
                    onClose();
                    handleClean();
                    return;
                }
                setData(response?.data || []);
                onClose();
                handleClean();
            } catch (err) {
                setError(err.response?.mensaje);
            }
        })
    }

    return (
        <>
            <Button  colorScheme="cyan" variant='outline' leftIcon={<ExternalLinkIcon />} onClick={onOpen}>Filtros</Button>

            <Modal isOpen={isOpen} onClose={onClose} isCentered scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Accesos con filtros</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Usuario</FormLabel>
                            <Input type='text'  placeholder='Usuario' value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Accion</FormLabel>
                            <Input type='text' placeholder='Accion' value={accion} onChange={(e) => setAccion(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Tabla</FormLabel>
                            <Input type='text' placeholder='Tabla' value={tabla} onChange={(e) => setTabla(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Id</FormLabel>
                            <Input type='number' placeholder='Id' value={id} onChange={(e) => setId(e.target.value !== "" ? parseInt(e.target.value) : null)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Fecha Inicio</FormLabel>
                            <Input placeholder='Selecciona Fecha y Tiempo' size='md' type='datetime-local' value={fechaInicio} onChange={(e) => setFechaInicio(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Fecha Fin</FormLabel>
                            <Input placeholder='Selecciona Fecha y Tiempo' size='md' type='datetime-local' value={fechaFin} onChange={(e) => setFechaFin(e.target.value)} />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleClick} variant='outline'>
                            Buscar
                        </Button>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Cerrar
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
};
