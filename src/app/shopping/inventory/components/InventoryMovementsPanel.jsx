"use client"
import { Button, Flex, Heading, Spinner } from "@chakra-ui/react";
import AddButton from "./AddButton";
import { useInventory } from "../hooks/useInventory";
import InventoryMovementsTable from "./InventoryMovementsTable";
import RefreshButton from "./RefreshButton";
import ExportExcelButton from "@/components/excel/ToExcelButton";
import PdfButton3 from "@/components/PdfButton3";
export default function InventoryMovementsPanel() {
    const { data, isLoading, isError, error } = useInventory();
    return (
        <Flex w='100%' p='2em' direction='column' gap='2em'>
            <Flex justifyContent='center' w='100%' >
                <Heading fontWeight='normal'  >Movimientos del Inventario</Heading>
            </Flex>
            <Flex gap='1em' direction='row' >
                <AddButton />
                <RefreshButton query={'inventoryMovements'} />
                <ExportExcelButton filename={'archivoMovimientosInventario'} rows={data} />
                <PdfButton3
                    fileName='Reporte Movimientos del inventario'
                    headers={[["Nombre", "Tipo Movimiento", "Cantidad", "Motivo", "Usuario", "Fecha movimiento"]]}
                    rows={data.map((d) => [
                        d.nombre,
                        d.tipoMovimiento,
                        d.cantidad,
                        d.motivo,
                        d.usuario,
                        d.fechaMovimiento
                    ])}
                />
            </Flex>
            {isLoading && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}

            {isError && <Flex w='100%' justifyContent='center'>{error?.message}</Flex>}
            {data && data.length > 0 && (
                <InventoryMovementsTable data={data} />
            )}
        </Flex>
    );
};
