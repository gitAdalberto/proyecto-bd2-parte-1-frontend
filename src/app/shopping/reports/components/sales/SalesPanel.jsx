import ExportExcelButton from "@/components/excel/ToExcelButton";
import { Button, Flex, Input, InputGroup, InputLeftAddon, Spinner } from "@chakra-ui/react";
import SalesTable from "./SalesTable";
import { useSalesReport } from "../../hooks/useReports";
import { useState } from "react";
import PdfButton3 from "@/components/PdfButton3";

export default function SalesPanel() {
    const [obj, setObj] = useState({
        usuario: "",
        categoria: "",
        fechaInicio: "",
        fechaFin: "",
    })
    const { data, isLoading, isError, error } = useSalesReport(obj);
    const handleChange = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
    };
    return (
        <Flex w='100%' direction='column' gap='1em'>
            <Flex gap='1em' direction='row'>
                <ExportExcelButton filename={'Reporte Ventas con Filtros'} rows={data} />
                <PdfButton3
                    fileName="Reporte de Ventas con filtros"
                    headers={[[
                        "Factura",
                        "Usuario",
                        "Categoria",
                        "Producto",
                        "Cantidad",
                        "PrecioUnitario",
                        "SubTotal",
                        "Descuento",
                        "Total",
                        "Fecha",
                    ]]}
                    rows={data && data.map((d) => [
                        d.Factura,
                        d.Usuario,
                        d.Categoria,
                        d.Producto,
                        d.Cantidad,
                        d.PrecioUnitario,
                        d.Subtotal,
                        d.Descuento,
                        d.TotalVenta,
                        d.FechaVenta,
                    ])}
                />
            </Flex>
            <Flex direction='row' justifyContent='flex-start' align='flex-start' gap='1em'>
                <Flex direction='column' gap='1em'>
                    <InputGroup w='24em'>
                        <InputLeftAddon>
                            Fecha Inicio
                        </InputLeftAddon>
                        <Input name="fechaInicio" value={obj.fechaInicio} onChange={handleChange} placeholder='Select Date and Time' size='md' type='datetime-local' />
                    </InputGroup>
                    <InputGroup w='24em'>
                        <InputLeftAddon>
                            Fecha Fin
                        </InputLeftAddon>
                        <Input name='fechaFin' value={obj.fechaFin} onChange={handleChange} placeholder='Select Date and Time' size='md' type='datetime-local' />
                    </InputGroup>
                </Flex>
                <Flex direction='column' gap='1em'>
                    <InputGroup w='24em'>
                        <InputLeftAddon>
                            Usuario
                        </InputLeftAddon>
                        <Input
                            name="usuario"
                            value={obj.usuario}
                            onChange={handleChange}
                        />
                    </InputGroup>
                    <InputGroup w='24em'>
                        <InputLeftAddon>
                            Categoria
                        </InputLeftAddon>
                        <Input
                            name='categoria'
                            value={obj.categoria}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Flex>
            </Flex>
            {isLoading && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}

            {isError && <Flex w='100%' justifyContent='center'>{error.message}</Flex>}
            {
                !isLoading && !isError && (
                    <SalesTable data={data} />
                )
            }
        </Flex>
    );
};
