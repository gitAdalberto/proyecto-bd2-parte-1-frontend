import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function HistoryTable({ data }) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >
                <Thead>
                    <Tr>
                        <Th>Usuario</Th>
                        <Th>Factura</Th>
                        <Th>Total</Th>
                        <Th>Descuento</Th>
                        <Th>Accion</Th>
                        <Th>Fecha</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d, index) => (
                            <Tr key={index}>
                                <Td>{d.usuario}</Td>
                                <Td>{d.numeroFactura}</Td>
                                <Td>{d.total}</Td>
                                <Td>{d.descuento}</Td>
                                <Td>{d.accion}</Td>
                                <Td>{d.fechaVenta}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
};
