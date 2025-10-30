import { CloseIcon } from '@chakra-ui/icons'
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Button,
    Input,
} from '@chakra-ui/react'
export default function SelectedProductTable({ productsList, handleChangeQuantity, deleteProduct }) {
    return (
        <TableContainer borderRadius='lg' >
            <Table variant='borderY'>
                <Thead>
                    <Tr>
                        <Th></Th>
                        <Th>Producto</Th>
                        <Th>Cantidad</Th>
                        <Th>Subtotal</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {productsList.map((product) => (
                        <Tr key={product.id}>
                            <Td>
                                <Button
                                    iconSpacing={0}
                                    leftIcon={<CloseIcon />}
                                    colorScheme="red"
                                    onClick={() => deleteProduct(product.id)}
                                />
                            </Td>
                            <Td>
                                {product.codigoProducto} - {product.nombre}
                            </Td>
                            <Td>
                                <Input
                                    placeholder="Cantidad"
                                    type="number"
                                    value={product.cantidad || ""}
                                    onChange={(e) => handleChangeQuantity(product, Number(e.target.value))}
                                />
                            </Td>
                            <Td>
                                Q {product.subtotal || 0}
                            </Td>
                        </Tr>
                    ))}
                </Tbody>

            </Table>
        </TableContainer>
    )
};
