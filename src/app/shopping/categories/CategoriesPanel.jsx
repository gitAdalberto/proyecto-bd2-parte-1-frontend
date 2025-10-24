"use client"
import AddButton from "./components/AddButton"
import ColorMode from "@/components/ColorMode"
import { Flex, Heading, Spinner } from "@chakra-ui/react"
import CategoriesTable from "./components/CategoriesTable"
import { useState, useTransition } from "react"
import  RefreshButton  from "./components/RefreshButton"
import { fetchCategories } from "./actions/categories"
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
            </Flex>
            {/*Tabla */}
            {pending && <Flex h='100vh' justifyContent='center'><Spinner size="xl" /></Flex>}
            {!pending && data.length > 0 && 
                <CategoriesTable data={data} handleRefresh={handleRefresh}/>
            }
            
        </Flex>
    )
};

