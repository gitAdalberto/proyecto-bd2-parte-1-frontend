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
export default function CategoriesTable({data, handleRefresh}) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >                
                <Thead>
                    <Tr>
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
                                <Td>{d.nombre}</Td>
                                <Td>{d.descripcion}</Td>
                                <Td>{d.fechaCreacion}</Td>
                                <Td>{d.estado ? "Habilitada" : "Deshabilitada"}</Td>
                                <Td>
                                    <DeleteButton id={d.id} handleRefresh={handleRefresh}/>
                                </Td>
                            </Tr>
                        ))
                    }                    
                </Tbody>
            </Table>
        </TableContainer>
    )
};
