import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function SalesTable({ data }) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >
                <Thead>
                    <Tr>
                        <Th>Factura</Th>
                        <Th>Usuario</Th>
                        <Th>Categoria</Th>
                        <Th>Producto</Th>
                        <Th>Cantidad</Th>
                        <Th>PrecioUnitario</Th>
                        <Th>SubTotal</Th>
                        <Th>Descuento</Th>
                        <Th>Total</Th>
                        <Th>Fecha</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d, index) => (
                            <Tr key={index}>
                                <Td>{d.Factura}</Td>
                                <Td>{d.Usuario}</Td>
                                <Td>{d.Categoria}</Td>
                                <Td>{d.Producto}</Td>
                                <Td>{d.Cantidad}</Td>
                                <Td>{d.PrecioUnitario}</Td>
                                <Td>{d.Subtotal}</Td>
                                <Td>{d.Descuento}</Td>
                                <Td>{d.TotalVenta}</Td>
                                <Td>{d.FechaVenta}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
};
