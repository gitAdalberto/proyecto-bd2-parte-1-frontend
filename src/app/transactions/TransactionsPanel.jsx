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
import { useState, useTransition } from 'react';
import PdfButton3 from "@/components/PdfButton3";
import { dateFormat } from "@/actions/dateformat";
import FilterButton from "./FilterButton";
import RefreshButton from "@/components/RefreshButton";
import { getFilterTransactions } from "@/actions/transactions";
import CustomTable from "@/components/CustomTable";

export default function TransactionPanel({ response }) {
    const [data, setData] = useState(response?.data || []);
    const [error, setError] = useState(null);
    const [pending, startTransition] = useTransition();

    const handleRefresh = async () => {

        setError(null);
        startTransition(async () => {
            try {
                const result = await getFilterTransactions(
                    null,
                    null,
                    null,
                    null,
                    null,
                    null
                )
                setData(result?.data || []);
                onClose();
            } catch (err) {
                setError(err.result?.mensaje);
            }
        })
    }


    return (
        <Flex w='100%'>
            <Flex align="center" justifyContent="center" direction="column" m='2em' w='100%'>
                <Heading fontWeight='normal' mb='1em'>Panel de Transacciones</Heading>
                <Flex w="100%" mb='2em' direction="row" gap="1em">
                    <RefreshButton action={handleRefresh} />
                    <FilterButton setData={setData} setError={setError} startTransition={startTransition} />
                    <PdfButton3 fileName='Reporte de transacciones' headers={[["Usuario", "Accion", "Tabla afectada", "Registro afectado", "Fecha"]]}
                        rows={data.map((d) => [
                            d.usuario,
                            d.accion,
                            d.tablaAfectada,
                            d.idRegistroAfectado,
                            dateFormat(d.fechaHora)
                        ])}
                    />

                </Flex>
                {pending && <Flex h='100vh'><Spinner size="xl" /></Flex>}
                {error && <Flex>{error}</Flex>}
                {!pending && data.length > 0 && (
                    <CustomTable
                        caption='Tabla de transacciones'
                        thead={
                            <Tr >
                                <Th w='20%'>Usuario</Th>
                                <Th w='20%'>Accion</Th>
                                <Th w='20%'>Tabla Afectada</Th>
                                <Th w='20%'>Registro Afectado</Th>
                                <Th w='20%'>Fecha</Th>
                            </Tr>
                        }
                        tbody={data.map((d) => (
                            <Tr key={d.id} display='table' w='100%' >
                                <Td w='20%' >{d.usuario}</Td>
                                <Td w='20%' >{d.accion}</Td>
                                <Td w='20%' >{d.tablaAfectada}</Td>
                                <Td w='20%' >{d.idRegistroAfectado}</Td>
                                <Td w='20%' >{dateFormat(d.fechaHora)}</Td>
                            </Tr>
                        ))}
                    />
                )}
            </Flex>
        </Flex>)
};
