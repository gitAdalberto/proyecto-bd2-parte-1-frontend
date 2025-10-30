import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function SalesTable({ data }) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >
                <Thead>
                    <Tr>
                        <Th>Usuario</Th>
                        <Th>Factura</Th>
                        <Th>Total</Th>
                        <Th>Cantidad</Th>
                        <Th>Precio Unitario</Th>
                        <Th>Fecha</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d, index) => (
                            <Tr key={index}>
                                <Td>{d.usuario}</Td>
                                <Td>{d.numeroFactura}</Td>
                                <Td>{d.nombre}</Td>
                                <Td>{d.cantidad}</Td>
                                <Td>{d.precioUnitario}</Td>
                                <Td>{d.fechaVenta}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
};
