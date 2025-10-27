import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Text,
} from '@chakra-ui/react'
import DeleteButton from './DeleteButton'
import EditButton from './EditButton'
import ModalCategories from './ModalCategories'
import PactchStockButton from './PactchStockButton'
export default function ProductsTable({data}) {
    return (
        <TableContainer borderRadius="lg">
            <Table variant='borderY' >                
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>Codigo</Th>
                        <Th>Nombre</Th>
                        <Th>Descripcion</Th>
                        <Th>Stock Actual</Th>
                        <Th>Stock Minimo</Th>
                        <Th>Fecha Creacion</Th>
                        <Th>Accion</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {
                        data.map((d)=>(
                            <Tr key={d.id}>
                                <Td><ModalCategories productId={d.id}/></Td>
                                <Td>{d.codigoProducto}</Td>
                                <Td>{d.nombre}</Td>
                                <Td>{d.descripcion}</Td>
                                <Td>{d.stockActual }</Td>
                                <Td display='flex' flexDirection='row' gap='0.5em' align='center' justifyContent='space-between'>
                                    <Text>{d.stockMinimo}</Text>
                                    <PactchStockButton id={d.id}/>
                                </Td>
                                <Td>{d.fechaCreacion}</Td>
                                <Td display='flex' flexDirection='row' gap='0.5em'>
                                    <EditButton {...d} />
                                    <DeleteButton id={d.id}/>
                                </Td>
                            </Tr>
                        ))
                    }                    
                </Tbody>
            </Table>
        </TableContainer>
    )
};
