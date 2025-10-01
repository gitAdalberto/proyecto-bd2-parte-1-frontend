
import PdfButton from "@/components/PdfButton";
import { getFilterAccess } from "@/actions/reports";
import { ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import {
    Box,
    Button,
    Flex,
    Spinner,
    Table,
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
    Text
} from "@chakra-ui/react";
import { useState, useTransition, useRef } from "react";
import PdfButton2 from "@/components/PdfButton2";
export default function FilterAccessComponent({ data }) {
    const [pending, startTransition] = useTransition();
    const [newData, setNewData] = useState(data?.data || []);
    const [error, setError] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const initialRef = useRef(null);

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

    const handleRefresh= async () => {
        setError(null);
        startTransition(async () => {
            try {
                const response = await getFilterAccess(
                    null,
                    null,   // ya convertido a número o null
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
                    estado,   // ya convertido a número o null
                    accion || null,
                    fInicio,
                    fFin
                );

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
        <Flex w='100%' direction='column'>
            <Flex w='100%' align='flex-start' gap='1em'>
                <Button colorScheme="green" variant='outline' leftIcon={<RepeatIcon />} onClick={handleRefresh}>Refrescar</Button>
                <Button colorScheme="cyan" variant='outline' leftIcon={<ExternalLinkIcon />} onClick={onOpen}>Filtros</Button>
                <PdfButton2 fileName="ReporteConFiltros" id='pdf-3'/>
            </Flex>
            <Flex w='100%' mt='2em' align='center' justifyContent='center'>
                {pending && <Flex h='100vh'><Spinner size="xl" /></Flex>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!pending && newData.length > 0 && (
                    <Box id='pdf-3' overflowX='auto' w="60vw" border="1px solid lightgray" borderRadius="8px" boxShadow='lg'>
                        <Table variant="simple" size="sm" padding='1em'>
                            <TableCaption>Accesos con filtros</TableCaption>
                            <Thead>
                                <Tr >
                                    <Th>Usuario</Th>
                                    <Th>Estado</Th>
                                    <Th>Accion</Th>
                                    <Th>Fecha</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {newData.map((s) => (
                                    <Tr key={s.id}>
                                        <Td>{s.usuario}</Td>
                                        <Td>{s.estado === false ? "Exito" : "Fallo"}</Td>
                                        <Td>{s.accion}</Td>
                                        <Td>{s.fechaHora}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
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
                                onChange={(e) => setEstado(e.target.value === "" ? null : parseInt(e.target.value))} // convierte a int o null
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
