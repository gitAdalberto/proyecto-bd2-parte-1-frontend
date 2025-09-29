"use client"
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel
} from '@chakra-ui/react'
import AccessPanel from './AccessPanel'
import LogPanel from './LogPanel'
export default function AccessTabs({ initialData, initialError, logs }) {
    return (
        <Tabs>
            <TabList>
                <Tab>Tabla de Accesos</Tab>
                <Tab>Archivo Log</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <AccessPanel initialData={initialData} initialError={initialError}></AccessPanel>
                </TabPanel>
                <TabPanel>
                    <LogPanel logs={logs.data}></LogPanel>
                </TabPanel>
            </TabPanels>
        </Tabs>
    )
};
