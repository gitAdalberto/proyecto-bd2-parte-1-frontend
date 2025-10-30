import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import { useSaleHistory } from "../../hooks/useSale";
import ExportExcelButton from "@/components/excel/ToExcelButton";

import { AddIcon, ArrowBackIcon } from "@chakra-ui/icons";
import HistoryTable from "./HistoryTable";
import PdfButton3 from "@/components/PdfButton3";

export default function HistoryPanel({ setIndex }) {
    const { data, isLoading, isError, error } = useSaleHistory();
    return (
        <Flex w='100%' direction='column' gap='2em'>
            {/*<Flex justifyContent='center' w='100%' >
                <Heading fontWeight='normal'  >Tabla de ventas</Heading>
            </Flex>*/}
            <Flex gap='1em' direction='row' >
                <Button colorScheme="blue" leftIcon={<AddIcon />} onClick={() => setIndex(1)} >Crear venta</Button>
                <Button colorScheme="orange" leftIcon={<ArrowBackIcon />} onClick={() => setIndex(0)} >Ver Tabla</Button>
                <ExportExcelButton filename={'archivoVentas'} rows={data} />
                <PdfButton3
                    fileName={"Report de bitacora de ventas"}
                    headers={[["Usuario", "Factura", "Total", "Descuento", "Accion", "Fecha"]]}
                    rows={data && data.map((d) => [
                        d.usuario,
                        d.numeroFactura,
                        d.nombre,
                        d.descuento,
                        d.accion,
                        d.fechaVenta,
                    ])}
                />
            </Flex>
            {isLoading && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}

            {isError && <Flex w='100%' justifyContent='center'>{error}</Flex>}
            {
                !isLoading && !isError && (
                    <HistoryTable data={data} />
                )
            }
        </Flex>
    );
};
