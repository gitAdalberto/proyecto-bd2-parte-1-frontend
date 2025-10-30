"use client"
import AddButton from "./components/AddButton"
import ColorMode from "@/components/ColorMode"
import { Flex, Heading, Spinner } from "@chakra-ui/react"
import CategoriesTable from "./components/CategoriesTable"
import { useState, useTransition } from "react"
import  RefreshButton  from "./components/RefreshButton"
import { fetchCategories } from "./actions/categories"
import ExportExcelButton from "@/components/excel/ToExcelButton"
import PdfButton3 from "@/components/PdfButton3"
export default function CategoriesPanel({ response }) {
    const [data, setData] = useState(response?.data || []);
    const[pending, startTransition] = useTransition();
    const handleRefresh = async () => {
        startTransition(async () => {
            const result = await fetchCategories();
            if (result?.success) {
                setData(result?.data || []);
                return;
            }
        })
    }
    return (
        <Flex w='100%' p='2em' direction='column' gap='2em'>
            <Flex position='fixed' w='100%' justifyContent='flex-end' right='1rem'>
              <ColorMode />  
            </Flex>
            <Flex justifyContent='center' w='100%' >
                <Heading fontWeight='normal'  >Panel de Categorias</Heading>
            </Flex>
            {/*Botones */}
            <Flex gap='1em' direction='row' >
                <AddButton handleRefresh={handleRefresh}/>
                <RefreshButton handleRefresh={handleRefresh} />
                <ExportExcelButton filename={'archivoCategorias'} rows={data}/>
                <PdfButton3
                    fileName='Reporte de categorias'
                    headers={[["Nombre","Descripcion","Fecha Creacion"]]}
                    rows={
                        data.map((d)=>[
                            d.nombre,
                            d.descripcion,
                            d.fechaCreacion
                        ])
                    }
                />
            </Flex>
            {/*Tabla */}
            {pending && <Flex w='100%' justifyContent='center'><Spinner size="xl" /></Flex>}
            {!pending && data.length > 0 && 
                <CategoriesTable data={data} handleRefresh={handleRefresh}/>
            }
            
        </Flex>
    )
};

