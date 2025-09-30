"use client";
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Flex,
    Spinner,
    Button,
    Box,
    Text,
    Heading
} from "@chakra-ui/react";
import { CheckIcon, RepeatIcon } from "@chakra-ui/icons";
import { useState, useTransition } from 'react';
import PdfButton from "@/components/PdfButton";
import PdfButton2 from "@/components/PdfButton2";

export default function TransactionPanel({ initialData, initialError }) {
    const [data, setData] = useState(initialData || []);
    const [error, setError] = useState(initialError || null);
    const [pending, startTransition] = useTransition();
    return (
        <Flex w='100%'>
            <Flex  align="center" justifyContent="center" direction="column" m='2em'>
                <Heading fontWeight='normal'>Panel de Transacciones</Heading>
                <Flex w="80vw"  mb='2em' direction="row" gap="1em">
                    <PdfButton2 fileName='Reporte de transacciones' id='pdf'/>
                </Flex>
                {pending && <Flex h='100vh'><Spinner size="xl" /></Flex>}
                {!pending && data.length > 0 && (
                    <Box id="pdf">
                        <Box overflowX='auto' w="80vw" border="1px solid lightgray" borderRadius="8px" boxShadow='lg'>
                            <Table variant="simple" size="sm" >
                                <TableCaption>Tabla de accesos</TableCaption>
                                <Thead>
                                    <Tr >
                                        <Th>Usuario</Th>
                                        <Th>Accion</Th>
                                        <Th>Tabla Afectada</Th>
                                        <Th>Registro Afectado</Th>
                                        <Th>Fecha</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {data.map((d) => (
                                        <Tr key={d.id}>
                                            <Td>{d.usuario}</Td>
                                            <Td>{d.accion}</Td>
                                            <Td>{d.tablaAfectada}</Td>
                                            <Td>{d.idRegistroAfectado}</Td>
                                            <Td>{d.fechaHora}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                )}
            </Flex>
        </Flex>)
};
