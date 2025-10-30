import ExportExcelButton from "@/components/excel/ToExcelButton";
import { Button, Flex, Input, InputGroup, InputLeftAddon, Spinner } from "@chakra-ui/react";

import { useTopSalesReport } from "../../hooks/useReports";
import { useState } from "react";
import TopSalesTable from "./TopSalesTable";
import MyBarChart from "../Charts/MyBarChart";
import { FaChartBar, FaTable } from "react-icons/fa";
import TopSalesBarChart from "./TopSalesBarChart";

export default function TopSalesPanel() {
    const [obj, setObj] = useState({
        categoria:"",
        fechaInicio: "",
        fechaFin: "",
    })
    const { data, isLoading, isError, error } = useTopSalesReport(obj);
    const handleChange = (e) =>{
        setObj({
            ...obj,
             [e.target.name]: e.target.value
        })
    };
    const[enabled, setEnabled] = useState(false);
    return (
        <Flex w='100%' direction='column' gap='1em'>
            <Flex gap='1em' direction='row'>
                <ExportExcelButton filename={'Reporte Ventas con Filtros'} rows={data} />
                <Button
                    variant='solid'
                    colorScheme="blue"
                    leftIcon={enabled ? <FaTable /> : <FaChartBar />}
                    onClick={()=>setEnabled(!enabled)}
                >{ enabled ? "Tabla" : "Grafico"}</Button>
            </Flex>
            <Flex direction='row' justifyContent='flex-start' align='flex-start' gap='1em'>
                <Flex direction='column' gap='1em'>
                    <InputGroup w='24em'>
                        <InputLeftAddon>
                            Fecha Inicio
                        </InputLeftAddon>
                        <Input  name="fechaInicio" value={obj.fechaInicio} onChange={handleChange}  placeholder='Select Date and Time' size='md' type='datetime-local' />
                    </InputGroup>
                    <InputGroup  w='24em'>
                        <InputLeftAddon>
                            Fecha Fin
                        </InputLeftAddon>
                        <Input name='fechaFin' value={obj.fechaFin} onChange={handleChange} placeholder='Select Date and Time' size='md' type='datetime-local' />
                    </InputGroup>
                </Flex>
                <Flex direction='column' gap='1em'>
                    <InputGroup  w='24em'>
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
                !isLoading && !isError && !enabled &&(
                    <>
                        <TopSalesTable data={data} />
                    </>
                )
            }
            {
                !isLoading && !isError && enabled &&(
                    <>
                        <TopSalesBarChart data={data}/>
                    </>
                )
            }
        </Flex>
    );
};
