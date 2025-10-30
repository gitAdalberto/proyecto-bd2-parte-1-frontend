import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function StockTable({ data }) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >
                <Thead>
                    <Tr>
                        <Th>Codigo Producto</Th>
                        <Th>Nombre</Th>
                        <Th>Stock Actual</Th>
                        <Th>Estado</Th>
                        <Th>Tipo Movimiento</Th>
                        <Th>Cantidad</Th>
                        <Th>Fecha</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d, index) => (
                            <Tr key={index}>
                                <Td>{d.codigoProducto}</Td>
                                <Td>{d.nombre}</Td>
                                <Td>{d.stockActual}</Td>
                                <Td>{d.Estado}</Td>
                                <Td>{d.tipoMovimiento}</Td>
                                <Td>{d.cantidad}</Td>
                                <Td>{d.fechaMovimiento}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
};
