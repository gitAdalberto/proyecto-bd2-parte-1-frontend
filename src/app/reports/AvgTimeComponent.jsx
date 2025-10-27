import ExportExcelButton from "@/components/excel/ToExcelButton";
import PdfButton from "@/components/PdfButton";
import PdfButton2 from "@/components/PdfButton2";
import PdfButton3 from "@/components/PdfButton3";
import { RepeatIcon } from "@chakra-ui/icons";
import { Box, Button, Flex, Spinner, Table, TableCaption, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";
import { useState, useTransition } from "react";
export default function AvgTimeComponent({ data }) {
    const [pending, startTransition] = useTransition();
    const [newData, setNewData] = useState(data?.data || []);
    const [error, setError] = useState(null);
    if (!data?.success) setError(data?.data.mensaje);
    return (
        <Flex w='100%' direction='column'>
            <Flex w='100%' align='flex-start' gap='1em'>
                {/*<Button colorScheme="green" variant='outline' leftIcon={<RepeatIcon />}>Refrescar</Button>*/}
                <PdfButton3 fileName="ReporteTiempoPromedio"
                    headers={[["Usuario", "Tiempo promedio (m)"]]}
                    rows={
                        newData.map((s) => [
                            s.usuario,
                            s.PromedioMinutos
                        ])
                    }
                />
                <ExportExcelButton filename={'archivo tiempo uso promedio'} rows={newData} />
            </Flex>
            <Flex w='100%' mt='2em' align='center' justifyContent='center'>
                {pending && <Flex h='100vh'><Spinner size="xl" /></Flex>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!pending && newData.length > 0 && (
                    <Box id='pdf-2' overflowX='auto' w="60vw" border="1px solid lightgray" borderRadius="8px" boxShadow='lg'>
                        <Table variant="simple" size="sm">
                            <TableCaption>Tiempo promedio por usuario</TableCaption>
                            <Thead>
                                <Tr >
                                    <Th>Usuario</Th>
                                    <Th>Promedio en minutos</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {newData.map((s) => (
                                    <Tr key={s.usuario}>
                                        <Td>{s.usuario}</Td>
                                        <Td>{s.PromedioMinutos}</Td>
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
