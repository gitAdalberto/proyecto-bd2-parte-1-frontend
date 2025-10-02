import { dateFormat } from "@/actions/dateformat";
import PdfButton from "@/components/PdfButton";
import PdfButton2 from "@/components/PdfButton2";
import PdfButton3 from "@/components/PdfButton3";
import { Box, Button, Flex, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState, useTransition } from "react";
export default function LastAccessComponent({ data, title }) {
    const [pending, startTransition] = useTransition();
    const [newData, setNewData] = useState(data?.data || []);
    const [error, setError] = useState(null);
    if (!data?.success) setError(data?.data.mensaje);
    return (
        <Flex w='100%' direction='column'>
            <Flex w='100%' align='flex-start' gap='1em'>
                {/*<Button colorScheme="green" variant='outline' leftIcon={<RepeatIcon />}>Refrescar</Button>*/}
                <PdfButton3
                    fileName="ReporteUltimoAccesoExitoso"
                    headers={[["Usuario", "Correo", "Ultima conexion"]]}
                    rows={
                        newData.map((s) => [
                            s.usuario,
                            s.correo,
                            dateFormat(s.ultimaConexion)
                        ])
                    }
                />
            </Flex>
            <Flex w='100%' mt='2em' align='center' justifyContent='center'>
                {pending && <Flex h='100vh'><Spinner size="xl" /></Flex>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!pending && newData.length > 0 && (
                    <Box id='pdf-1' overflowX='auto' w="60vw" border="1px solid lightgray" borderRadius="8px" boxShadow='lg'>
                        <Table variant="simple" size="sm">
                            <TableCaption>Ultimo acceso exitoso por usuario</TableCaption>
                            <Thead>
                                <Tr >
                                    <Th>Usuario</Th>
                                    <Th>Correo</Th>
                                    <Th>Ultima Conexion</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {newData.map((s) => (
                                    <Tr key={s.id}>
                                        <Td>{s.usuario}</Td>
                                        <Td>{s.correo}</Td>
                                        <Td>{dateFormat(s.ultimaConexion)}</Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </Box>
                )}
            </Flex>
        </Flex>
    )
};
