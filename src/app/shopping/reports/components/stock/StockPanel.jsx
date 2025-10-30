import ExportExcelButton from "@/components/excel/ToExcelButton";
import { Button, Flex, Input, InputGroup, InputLeftAddon, Spinner } from "@chakra-ui/react";
import { useStockReport } from "../../hooks/useReports";
import StockTable from "./StockTable";
import PdfButton3 from "@/components/PdfButton3";

export default function StockPanel() {

    const { data, isLoading, isError, error } = useStockReport();

    return (
        <Flex w='100%' direction='column' gap='1em'>
            <Flex gap='1em' direction='row'>
                <ExportExcelButton filename={'Reporte Ventas con Filtros'} rows={data} />
                <PdfButton3
                    fileName="Reporte de stock critico"
                    headers={[[
                        "Codigo Producto",
                        "Nombre",
                        "Stock Actual",
                        "Estado",
                        "Tipo Movimiento",
                        "Cantidad",
                        "Fecha",
                    ]]}
                    rows={data && data.map((d) => [
                        d.codigoProducto,
                        d.nombre,
                        d.stockActual,
                        d.Estado,
                        d.tipoMovimiento,
                        d.cantidad,
                        d.fechaMovimiento,
                    ])}
                />
            </Flex>

            {isLoading && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}

            {isError && <Flex w='100%' justifyContent='center'>{error.message}</Flex>}
            {
                !isLoading && !isError && (
                    <StockTable data={data} />
                )
            }
        </Flex>
    );
};
