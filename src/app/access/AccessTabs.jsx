"use client"
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Flex,
    Heading
} from '@chakra-ui/react'
import AccessPanel from './AccessPanel'
import LogPanel from './LogPanel'
export default function AccessTabs({ initialData, initialError, logs }) {
    return (
        <Flex m='2em' direction='column' >
            <Flex  justifyContent='center'>
                <Heading  fontWeight='normal'>Panel de Accesos</Heading>
            </Flex>
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
        </Flex>
    )
};
