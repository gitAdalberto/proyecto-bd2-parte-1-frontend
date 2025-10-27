import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
export default function InventoryHistoryTable({data}) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >                
                <Thead>
                    <Tr>
                        <Th>Nombre</Th>
                        <Th>Tipo Movimiento</Th>
                        <Th>Accion</Th>
                        <Th>Cantidad</Th>
                        <Th>Stock Anterior</Th>
                        <Th>Stock Nuevo</Th>
                        <Th>Usuario</Th>
                        <Th>Fecha y Hora</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d)=>(
                            <Tr key={d.id}>
                                <Td>{d.nombre}</Td>
                                <Td>{d.tipoMovimiento}</Td>
                                <Td>{d.accion}</Td>
                                <Td>{d.cantidad}</Td>
                                <Td>{d.stockAnterior}</Td>
                                <Td>{d.stockNuevo}</Td>
                                <Td>{d.usuario}</Td>
                                <Td>{d.fechaHora}</Td>
                            </Tr>
                        ))
                    }                    
                </Tbody>
            </Table>
        </TableContainer>
    )
};
