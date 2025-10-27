import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
export default function InventoryMovementsTable({data}) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >                
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Tipo Movimiento</Th>
                        <Th>Cantidad</Th>
                        <Th>Motivo</Th>
                        <Th>Usuario</Th>
                        <Th>Fecha Movimiento</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d)=>(
                            <Tr key={d.id}>
                                <Td>{d.nombre}</Td>
                                <Td>{d.tipoMovimiento}</Td>
                                <Td>{d.cantidad}</Td>
                                <Td>{d.motivo}</Td>
                                <Td>{d.usuario}</Td>
                                <Td>{d.fechaMovimiento}</Td>
                            </Tr>
                        ))
                    }                    
                </Tbody>
            </Table>
        </TableContainer>
    )
};
