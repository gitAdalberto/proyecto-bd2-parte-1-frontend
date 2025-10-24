import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
} from '@chakra-ui/react'
export default function MyTable({ }) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >                
                <Thead>
                    <Tr>
                        <Th>Id</Th>
                        <Th>Nombre</Th>
                        <Th>Descripcion</Th>
                        <Th>Fecha Creacion</Th>
                        <Th>Estado</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    <Tr>
                        <Td>1</Td>
                        <Td>Utiles</Td>
                        <Td>Descripcion ejemplo</Td>
                        <Td>Hoy</Td>
                        <Td>1</Td>
                    </Tr>
                    <Tr>
                        <Td>2</Td>
                        <Td>Otra cosa</Td>
                        <Td>Descripcion ejemplo</Td>
                        <Td>Hoy</Td>
                        <Td>1</Td>
                    </Tr>
                    <Tr>
                        <Td>3</Td>
                        <Td>Otra Otra cosa</Td>
                        <Td>Descripcion ejemplo</Td>
                        <Td>Hoy</Td>
                        <Td>1</Td>
                    </Tr>                    
                </Tbody>
            </Table>
        </TableContainer>
    )
};
