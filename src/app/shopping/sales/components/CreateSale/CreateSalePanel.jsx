import { Button, Flex, Input, InputGroup, InputLeftAddon, InputLeftElement, InputRightElement, Text, useToast } from "@chakra-ui/react";
import ProductSelectionPanel from "./ProductSelectionPanel";
import { useState } from "react";
import SelectedProductTable from "./SelectedProductTable";
import { useCreateCompleteSale } from "../../hooks/useSale";
import { CloseIcon } from "@chakra-ui/icons";


export default function CreateSalePanel({ setIndex }) {
    const [productsList, setProductsList] = useState([]);
    const subtotal = productsList.reduce((acc, product) => acc + product.precioVenta * product.cantidad, 0) || 0;
    const [discount, setDiscount] = useState(0);
    const total = subtotal - (subtotal * discount) / 100;
    const recipeNumber = "FAC-" + crypto.randomUUID().slice(0, 15).toUpperCase();
    const [isInvalid, setIsInvalid] = useState(true);
    const toast = useToast();


    const handleClean = () => {
        setProductsList([]);
        setIndex(0);
    }
    const mutation = useCreateCompleteSale(handleClean);
    const completeSale = () => {

        const venta = {
            numeroFactura: recipeNumber,
            subTotal: parseFloat(subtotal),
            descuento: discount,
            total: total,
            estadoVenta: 'ACTIVA'
        };
        mutation.mutate({
            venta,
            productsList
        })
    }

    const handleAddProduct = (product) => {
        if (productsList.find((p) => p.id === product.id)) return;

        setProductsList((prev) => [...prev, {
            ...product,
            cantidad: 1,
            subtotal: product.precioVenta
        },]);

        handleChangeQuantity(product, 1);
    }

    const deleteProduct = (id) => {
        setProductsList((prev) => prev.filter((p) => p.id !== id));
    }

    const handleChangeQuantity = (product, newQuantity) => {
        if (product.stockActual < newQuantity) {
            console.log(`el producto no cumple con el stock ${product.stockActual} < ${newQuantity}`);
            toast({
                title: "Stock insuficiente",
                description: `${product.codigoProducto} - ${product.nombre} no tiene stock suficiente`,
                status: 'error',
                isClosable: true,
                duration: 5000,
                position: 'top-right'
            });
            setIsInvalid(true);
        }

        if (product.stockActual >= newQuantity) {
            setIsInvalid(false);
        }
        setProductsList((prev) =>
            prev.map((p) =>
                p.id === product.id
                    ? { ...p, cantidad: newQuantity, subtotal: p.precioVenta * newQuantity }
                    : p
            )
        );

    }

    return (
        <Flex direction='row' gap='1em' flexWrap='wrap'>
            <Flex>
                <Button
                    colorScheme="red"
                    leftIcon={<CloseIcon />}
                    onClick={() => setIndex(0)}
                >
                    Cancelar
                </Button>
            </Flex>
            <Flex w='100%'>
                <InputGroup size='md'>
                    <InputLeftAddon>
                        Factura
                    </InputLeftAddon>
                    <Input
                        readOnly
                        value={recipeNumber}
                        pr='6em'
                    />
                    <InputRightElement w='6em'>
                        <Button
                            variant='solid'
                            colorScheme="green"
                            isDisabled={isInvalid}
                            onClick={completeSale}
                        >
                            Confirmar
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </Flex>

            <ProductSelectionPanel handleAdd={handleAddProduct} />
            <Flex direction='column' gap='0.5em' w='50%' align='center'>

                {productsList.length === 0 && <Text>Ningun Producto Seleccionado</Text>}
                {productsList && productsList.length > 0 && (
                    <>

                        <Text>Lista de productos</Text>
                        <SelectedProductTable
                            deleteProduct={deleteProduct}
                            handleChangeQuantity={handleChangeQuantity}
                            productsList={productsList}
                        />
                        <InputGroup>
                            <InputLeftAddon>
                                Subtotal: Q
                            </InputLeftAddon>
                            <Input
                                readOnly
                                value={subtotal}
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon>
                                Descuento: %
                            </InputLeftAddon>
                            <Input

                                value={discount}
                                onChange={(e) => setDiscount(e.target.value)}
                                type="number"
                            />
                        </InputGroup>
                        <InputGroup>
                            <InputLeftAddon>
                                Total: Q
                            </InputLeftAddon>
                            <Input
                                readOnly
                                value={total}
                            />
                        </InputGroup>
                    </>

                )

                }

            </Flex>

        </Flex>
    )
};
