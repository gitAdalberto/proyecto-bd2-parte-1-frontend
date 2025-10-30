"use client"
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import SalesPanel from './components/sales/SalesPanel'
import StockPanel from './components/stock/StockPanel'
import TopSalesPanel from './components/top/TopSalesPanel'
import IncomePanel from './components/income/IncomePanel'
export default function ReportsTabs({ }) {
    return (
        <Tabs ml='2em'>
            <TabList>
                <Tab>Ventas con filtros</Tab>
                <Tab>Stock Critico</Tab>
                <Tab>Productos mas vendidos</Tab>
                <Tab>Ingresos totales</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <SalesPanel />
                </TabPanel>
                <TabPanel>
                    <StockPanel />
                </TabPanel>
                <TabPanel>
                    <TopSalesPanel />
                </TabPanel>
                <TabPanel>
                    <IncomePanel />
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
};
