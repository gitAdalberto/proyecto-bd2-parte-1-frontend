import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function TopSalesTable({ data }) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >
                <Thead>
                    <Tr>
                        <Th>Codigo producto</Th>
                        <Th>Producto</Th>
                        <Th>Categoria</Th>
                        <Th>Total Unidades Vendidas</Th>
                        <Th>Precio Promedio</Th>
                        <Th>Total Vendido</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d, index) => (
                            <Tr key={index}>
                                <Td>{d.CodigoProducto}</Td>
                                <Td>{d.Producto}</Td>
                                <Td>{d.Categoria}</Td>
                                <Td>{d.TotalUnidadesVendidas}</Td>
                                <Td>{d.PrecioPromedio}</Td>
                                <Td>{d.TotalVendido}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
};
