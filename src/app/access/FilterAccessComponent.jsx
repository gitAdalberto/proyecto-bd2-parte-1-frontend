import { getFilterAccess } from "@/actions/reports";
import { ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Spinner,
    Table,
    TableContainer,
    TableCaption,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
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
    Select,
    Text,
    useToast
} from "@chakra-ui/react";
import { useState, useTransition, useRef } from "react";

import PdfButton3 from "@/components/PdfButton3";
import { dateFormat } from "@/actions/dateformat";
import ExportExcelButton from "@/components/excel/ToExcelButton";
export default function FilterAccessComponent({ data }) {
    const [pending, startTransition] = useTransition();
    const [newData, setNewData] = useState(data?.data || []);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null);
    const toast = useToast();

    const [usuario, setUsuario] = useState("");
    const [estado, setEstado] = useState("")
    const [accion, setAccion] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaFin, setFechaFin] = useState("");

    const handleClean = () => {
        setUsuario("");
        setEstado("")
        setAccion("")
        setFechaInicio("")
        setFechaFin("")
    }

    const handleRefresh = async () => {
        setError(null);
        startTransition(async () => {
            try {
                const response = await getFilterAccess(
                    null,
                    null,
                    null,
                    null,
                    null
                );

                setNewData(response?.data || []);
                handleClean()
            } catch (err) {
                setError(err.response?.mensaje || "Error al consultar");
            }
        });
    }

    const handleClick = async () => {
        const fInicio = fechaInicio ? fechaInicio.replace("T", " ") + ":00.000" : null;
        const fFin = fechaFin ? fechaFin.replace("T", " ") + ":00.000" : null;

        setError(null);
        startTransition(async () => {
            try {
                const response = await getFilterAccess(
                    usuario || null,
                    estado,
                    accion || null,
                    fInicio,
                    fFin
                );
                if (response.data.mensaje) {
                    toast({
                        title: "Filtrar accesos",
                        description: response.data.mensaje,
                        isClosable: true,
                        duration: 5000,
                        position: 'top-right'
                    })
                    onClose();
                    handleClean();
                    return;
                }
                setNewData(response?.data || []);
                onClose();
                handleClean();
            } catch (err) {
                setError(err.response?.mensaje || "Error al consultar");
            }
        });
    }


    if (!data?.success) setError(data?.data.mensaje);
    return (
        <Flex w='100%' direction='column' flex='1' h='100%'>
            <Flex w='100%' align='flex-start' gap='1em'>
                <Button colorScheme="green" variant='outline' leftIcon={<RepeatIcon />} onClick={handleRefresh}>Refrescar</Button>
                <Button colorScheme="cyan" variant='outline' leftIcon={<ExternalLinkIcon />} onClick={onOpen}>Filtros</Button>
                <PdfButton3 fileName='Report de accesos' headers={[["Usuario", "Estado", "Accion", "Fecha"]]} rows={
                    newData.map((s) => [
                        s.usuario,
                        s.estado === false ? "Exito" : "Fallo",
                        s.accion,
                        dateFormat(s.fechaHora)
                    ])
                } />
                <ExportExcelButton filename={'archivoAccesosFiltrados'} rows={newData} />
            </Flex>
            <Flex w='100%' mt='2em' align='center' flex="1" overflow="auto" justifyContent='center'>
                {pending && <Flex h='100vh'><Spinner size="xl" /></Flex>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!pending && newData.length > 0 && (
                    <Box id='pdf-3' w="100%" border="1px solid lightgray" borderRadius="8px" boxShadow='lg' >
                        <TableContainer>
                            <Table variant="simple" size="sm" padding='1em' w='100%'>
                                <TableCaption>Accesos con filtros</TableCaption>
                                <Thead display='table' w='100%' >
                                    <Tr >
                                        <Th w='25%' >Usuario</Th>
                                        <Th w='25%' >Estado</Th>
                                        <Th w='25%' >Accion</Th>
                                        <Th w='25%' >Fecha</Th>
                                    </Tr>
                                </Thead>
                                <Tbody display='block' maxH='300px' overflowY='auto' w='100%'>
                                    {newData.map((s) => (
                                        <Tr key={s.id} display='table' w='100%' >
                                            <Td w='25%' >{s.usuario}</Td>
                                            <Td w='25%'>{s.estado === false ? "Exito" : "Fallo"}</Td>
                                            <Td w='25%'>{s.accion}</Td>
                                            <Td w='25%'>{dateFormat(s.fechaHora)}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </TableContainer>
                    </Box>
                )}
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} initialFocusRef={initialRef} isCentered scrollBehavior="inside">
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Accesos con filtros</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>Usuario</FormLabel>
                            <Input ref={initialRef} placeholder='Usuario' value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Estado</FormLabel>
                            <Select
                                placeholder="Selecciona una opcion"
                                value={estado}
                                onChange={(e) => setEstado(e.target.value === "" ? null : parseInt(e.target.value))} 
                            >
                                <option value={0}>Exito</option>
                                <option value={1}>Fallo</option>
                            </Select>

                        </FormControl>

                        <FormControl mt={4}>
                            <FormLabel>Accion</FormLabel>
                            <Select placeholder="Selecciona una accion" value={accion} onChange={(e) => setAccion(e.target.value)}>
                                <option value={"Login"}>Login</option>
                                <option value={"Logout"}>Logout</option>
                            </Select>
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
        </Flex>
    )
};
