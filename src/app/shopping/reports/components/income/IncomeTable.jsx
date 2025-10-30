import { Table, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

export default function IncomeTable({ data }) {
    console.log("VAlor de data en incometable:", data)
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >
                <Thead>
                    <Tr>
                        <Th>Mes</Th>
                        <Th>TotalVentas</Th>
                        <Th>Total productos vendidos</Th>
                        <Th>Total unidades vendidas</Th>
                        <Th>Subtotal</Th>
                        <Th>Total Descuentos</Th>
                        <Th>Ingresos Totales</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d, index) => (
                            <Tr key={index}>
                                <Td>{d.Mes}</Td>
                                <Td>{d.TotalVentas}</Td>
                                <Td>{d.TotalProductosVendidos}</Td>
                                <Td>{d.TotalUnidadesVendidas}</Td>
                                <Td>{d.Subtotal}</Td>
                                <Td>{d.TotalDescuentos}</Td>
                                <Td>{d.IngresosTotales}</Td>
                            </Tr>
                        ))
                    }
                </Tbody>
            </Table>
        </TableContainer>
    )
};
