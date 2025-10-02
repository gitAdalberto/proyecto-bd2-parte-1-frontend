"use client"

import { Flex, Heading, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import LastAccessComponent from "./LastAccessComponent";
import AvgTimeComponent from "./AvgTimeComponent";

export default function ReportPanel({ lastAccess, avgTime }) {
    console.log(lastAccess.data);
    return (
        <Flex  ml='2em' mt='2em' direction='column'>
            <Flex justifyContent='center' mb='1em'>
                <Heading fontWeight='normal'>Panel de Reportes</Heading>
            </Flex>
            <Tabs>
                <TabList>
                    <Tab>Ultima Conexion Exitosa</Tab>
                    <Tab>Tiempo de uso promedio</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <LastAccessComponent data={lastAccess}/>
                    </TabPanel>
                    <TabPanel>
                        <AvgTimeComponent data={avgTime}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
};
