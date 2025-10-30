"use client"
import { Flex, Heading, Spinner, } from "@chakra-ui/react";
import CreateSalePanel from "./components/CreateSale/CreateSalePanel";
import { useState } from "react";
import SalesTablePanel from "./components/SaleTable/SalesTablePanel";
import HistoryPanel from "./components/HistoryTable/HistoryPanel";

export default function SalesPanel() {
    const [index, setIndex] = useState(0);
    console.log(index);
    return (
        <Flex w='100%' p='2em' direction='column' gap='2em' >

            {index === 0 && (
                <>
                    <Flex justifyContent='center' w='100%' >
                        <Heading fontWeight='normal'  >Ventas</Heading>
                    </Flex>
                    <SalesTablePanel setIndex={setIndex} />
                </>
            )}
            {index === 1 && (
                <>
                <Flex justifyContent='center' w='100%' >
                        <Heading fontWeight='normal'  >Realizar Venta</Heading>
                    </Flex>
                <CreateSalePanel setIndex={setIndex} />
                </>
            )}
            {index === 2 && (
                <>
                <Flex justifyContent='center' w='100%' >
                        <Heading fontWeight='normal'  >Bitacora de Ventas</Heading>
                    </Flex>
                <HistoryPanel setIndex={setIndex} />
                </>
            )}

        </Flex>
    )
};
