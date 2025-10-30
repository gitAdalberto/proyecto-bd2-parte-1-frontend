"use client"
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import { useInventoryHistory } from "../hooks/useInventory";
import InventoryHistoryTable from "./InventoryHistoryTable";
import RefreshButton from "./RefreshButton";
import ExportExcelButton from "@/components/excel/ToExcelButton";
import PdfButton3 from "@/components/PdfButton3";
export default function InventoryHistoryPanel() {
    const { data, isLoading, isError, error } = useInventoryHistory();
    return (
        <Flex w='100%' p='2em' direction='column' gap='2em'>
            <Flex justifyContent='center' w='100%' >
                <Heading fontWeight='normal'  >Bitacora del inventario</Heading>
            </Flex>
            <Flex gap='1em' direction='row' >
                <RefreshButton query={'inventoryHistory'} />
                <ExportExcelButton filename={'archivoBitacoraInventario'} rows={data} />
                <PdfButton3
                    fileName='Reporte Bitacora del inventario'
                    headers={[["Nombre", "Tipo Movimiento", "Accion", "Cantidad", "Stock Anterior", "Stock Nuevo", "Usuario", "Fecha y Hora"]]}
                    rows={data.map((d) => [
                        d.nombre,
                        d.tipoMovimiento,
                        d.accion,
                        d.cantidad,
                        d.stockAnterior,
                        d.stockNuevo,
                        d.usuario,
                        d.fechaHora,
                    ])}
                />
            </Flex>
            {isLoading && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}

            {isError && <Flex w='100%' justifyContent='center'>{error?.message}</Flex>}
            {data && data.length > 0 && (
                <InventoryHistoryTable data={data} />
            )}
        </Flex>
    );
};
