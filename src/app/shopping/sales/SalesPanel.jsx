"use client"
import { Flex, Heading, Spinner } from "@chakra-ui/react";
import CreateSalePanel from "./components/CreateSale/CreateSalePanel";

export default function SalesPanel() {
    return (
        <Flex w='100%' p='2em' direction='column' gap='2em' >
            <Flex justifyContent='center' w='100%' >
                <Heading fontWeight='normal'  >Ventas</Heading>
            </Flex>
            <CreateSalePanel />
        </Flex>
    )
};
