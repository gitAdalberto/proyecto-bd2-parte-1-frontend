import ExportExcelButton from "@/components/excel/ToExcelButton";
import { Button, Flex, Input, InputGroup, InputLeftAddon, Spinner } from "@chakra-ui/react";
import { useIncomeReport } from "../../hooks/useReports";
import { useState } from "react";
import IncomeTable from "./IncomeTable";

export default function IncomePanel() {
    const [obj, setObj] = useState({
        year:"",
    })
    const { data, isLoading, isError, error } = useIncomeReport(obj);
    const handleChange = (e) =>{
        setObj({
            ...obj,
             [e.target.name]: e.target.value
        })
    };
    return (
        <Flex w='100%' direction='column' gap='1em'>
            <Flex gap='1em' direction='row'>
                <ExportExcelButton filename={'Reporte Ventas con Filtros'} rows={data} />
            </Flex>
            <Flex direction='row' justifyContent='flex-start' align='flex-start' gap='1em'>
                <Flex direction='column' gap='1em'>
                    <InputGroup  w='24em'>
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
                !isLoading && !isError && (
                    <IncomeTable data={data} />
                )
            }
        </Flex>
    );
};
