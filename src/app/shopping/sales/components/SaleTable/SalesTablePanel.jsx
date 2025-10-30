import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useSale } from "../../hooks/useSale";
import ExportExcelButton from "@/components/excel/ToExcelButton";
import SalesTable from "./SalesTable";
import { AddIcon, TimeIcon } from "@chakra-ui/icons";
import PdfButton3 from "@/components/PdfButton3";

export default function SalesTablePanel({ setIndex }) {
    const { data, isLoading, isError, error } = useSale();
    return (
        <Flex w='100%' direction='column' gap='2em'>
            {/*<Flex justifyContent='center' w='100%' >
                <Heading fontWeight='normal'  >Tabla de ventas</Heading>
            </Flex>*/}
            <Flex gap='1em' direction='row' >
                <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={() => setIndex(1)} >Crear venta</Button>
                <Button colorScheme="orange" leftIcon={<TimeIcon />} onClick={() => setIndex(2)} >Bitacora</Button>
                <ExportExcelButton filename={'archivoVentas'} rows={data} />
                <PdfButton3
                    fileName={"Report de ventas"}
                    headers={[["Usuario", "Factura", "Total", "Cantidad", "Precio Unitario", "Fecha"]]}
                    rows={data && data.map((d) => [
                        d.usuario,
                        d.numeroFactura,
                        d.nombre,
                        d.cantidad,
                        d.precioUnitario,
                        d.fechaVenta,
                    ])}
                />
            </Flex>
            {isLoading && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}

            {isError && <Flex w='100%' justifyContent='center'>{error}</Flex>}
            {
                !isLoading && !isError && (
                    <SalesTable data={data} />
                )
            }
        </Flex>
    );
};
