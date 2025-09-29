"use client"

import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react"
import LastAccessComponent from "./LastAccessComponent";
import AvgTimeComponent from "./AvgTimeComponent";
import FilterAccessComponent from "./FilterAccessComponent";

export default function ReportPanel({ lastAccess, avgTime, filterAccess }) {
    console.log(lastAccess.data);
    return (
        <Flex w='100%'>
            <Tabs w='100%'>
                <TabList>
                    <Tab>Ultima Conexion Exitosa</Tab>
                    <Tab>Tiempo de uso promedio</Tab>
                    <Tab>Accesos con Filtros</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <LastAccessComponent data={lastAccess}/>
                    </TabPanel>
                    <TabPanel>
                        <AvgTimeComponent data={avgTime}/>
                    </TabPanel>
                    <TabPanel>
                        <FilterAccessComponent data={filterAccess}/>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
};
