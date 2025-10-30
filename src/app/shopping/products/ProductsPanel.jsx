"use client"
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { useProducts } from "./hooks/useProducts";
import ProductsTable from "./components/ProductsTable";
import RefreshButton from "./components/RefreshButton";
import AddButton from "./components/AddButton";
import ExportExcelButton from "@/components/excel/ToExcelButton";
import PdfButton3 from "@/components/PdfButton3";

export default function ProductsPanel() {
    const { data, isLoading, isError, error } = useProducts();
    return (
        <Flex w='100%' p='2em' direction='column' gap='2em'>
            <Flex justifyContent='center' w='100%' >
                <Heading fontWeight='normal'  >Panel de Productos</Heading>
            </Flex>
            <Flex gap='1em' direction='row' >
                <AddButton />
                <RefreshButton />
                <ExportExcelButton filename={'archivoProductos'} rows={data} />
                <PdfButton3
                    fileName='Reporte de productos'
                    headers={[["Codigo","Nombre","Descripcion","StockActual","StockMinimo","Fecha Creación"]]}
                    rows={
                        data.map((d)=>[
                            d.codigoProducto,
                            d.nombre,
                            d.descripcion,
                            d.stockActual,
                            d.stockMinimo
                        ])
                    }
                />
            </Flex>
            {isLoading && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}

            {isError && <Flex w='100%' justifyContent='center'>{error}</Flex>}
            {
                !isLoading && !isError && (
                    <ProductsTable data={data} />
                )
            }
        </Flex>
    );

};
