import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
export default function ProductsTable({data}) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >                
                <Thead>
                    <Tr>
                        <Th>Codigo</Th>
                        <Th>Nombre</Th>
                        <Th>Descripcion</Th>
                        <Th>Fecha Creacion</Th>
                        <Th>Estado</Th>
                        <Th>Accion</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d)=>(
                            <Tr key={d.id}>
                                <Td>{d.codigoProducto}</Td>
                                <Td>{d.nombre}</Td>
                                <Td>{d.descripcion}</Td>
                                <Td>{d.fechaCreacion}</Td>
                                <Td>{d.estado ? "Habilitada" : "Deshabilitada"}</Td>
                                <Td display='flex' flexDirection='row' gap='0.5em'>
                                    <DeleteButton id={d.id}/>
                                    <EditButton {...d} />
                                </Td>
                            </Tr>
                        ))
                    }                    
                </Tbody>
            </Table>
        </TableContainer>
    )
};
