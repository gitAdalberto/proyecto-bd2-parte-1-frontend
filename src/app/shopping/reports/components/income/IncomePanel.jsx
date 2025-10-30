import ExportExcelButton from "@/components/excel/ToExcelButton";
import { Button, Flex, Input, InputGroup, InputLeftAddon, Spinner } from "@chakra-ui/react";
import { useIncomeReport } from "../../hooks/useReports";
import { useState } from "react";
import IncomeTable from "./IncomeTable";
import { FaChartBar, FaTable } from "react-icons/fa";
import MyBarChart from "../Charts/MyBarChart";
import IncomeBarChart from "./IncomeBarChart";
import PdfButton3 from "@/components/PdfButton3";

export default function IncomePanel() {
    const [obj, setObj] = useState({
        year: "",
    })
    const { data, isLoading, isError, error } = useIncomeReport(obj);
    const handleChange = (e) => {
        setObj({
            ...obj,
            [e.target.name]: e.target.value
        })
    };
    const [enabled, setEnabled] = useState(false);
    return (
        <Flex w='100%' direction='column' gap='1em'>
            <Flex gap='1em' direction='row'>
                <ExportExcelButton filename={'Reporte Ventas con Filtros'} rows={data} />
                <PdfButton3
                    fileName="Reporte de ingresos totales"
                    headers={[[
                        "Mes",
                        "TotalVentas",
                        "Total productos vendidos",
                        "Total unidades vendidas",
                        "Subtotal",
                        "Total Descuentos",
                        "Ingresos Totales",
                    ]]}
                    rows={data && data.map((d) => [
                        d.Mes,
                        d.TotalVentas,
                        d.TotalProductosVendidos,
                        d.TotalUnidadesVendidas,
                        d.Subtotal,
                        d.TotalDescuentos,
                        d.IngresosTotales,
                    ])}
                />
                <Button
                    variant='solid'
                    colorScheme="blue"
                    leftIcon={enabled ? <FaTable /> : <FaChartBar />}
                    onClick={() => setEnabled(!enabled)}
                >{enabled ? "Tabla" : "Grafico"}</Button>
            </Flex>
            <Flex direction='row' justifyContent='flex-start' align='flex-start' gap='1em'>
                <Flex direction='column' gap='1em'>
                    <InputGroup w='24em'>
                        <InputLeftAddon>
                            Año
                        </InputLeftAddon>
                        <Input
                            type="number"
                            name="year"
                            value={obj.year}
                            onChange={handleChange}
                        />
                    </InputGroup>
                </Flex>
            </Flex>
            {isLoading && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}

            {isError && <Flex w='100%' justifyContent='center'>{error.message}</Flex>}
            {
                !isLoading && !isError && !enabled && (
                    <IncomeTable data={data} />
                )
            }
            {
                !isLoading && !isError && enabled && (
                    <IncomeBarChart data={data} />
                )
            }
        </Flex>
    );
};
