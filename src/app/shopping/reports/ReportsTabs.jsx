"use client"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import SalesPanel from './components/sales/SalesPanel'
export default function ReportsTabs({ }) {
    return (
        <Tabs ml='2em'>
            <TabList>
                <Tab>Ventas con filtros</Tab>
                <Tab>Two</Tab>
                <Tab>Three</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <SalesPanel />
                </TabPanel>
                <TabPanel>
                    <p>two!</p>
                </TabPanel>
                <TabPanel>
                    <p>three!</p>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
};
