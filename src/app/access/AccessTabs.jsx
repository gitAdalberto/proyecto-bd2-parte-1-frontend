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
import LogPanel from './LogPanel'
import FilterAccessComponent from './FilterAccessComponent'
export default function AccessTabs({ initialData, logs }) {
    return (
        <Flex m='2em' direction='column' minh='100vh'>
            <Flex  justifyContent='center'>
                <Heading  fontWeight='normal'>Panel de Accesos</Heading>
            </Flex>
            <Tabs display="flex" flexDirection="column" flex="1">
                <TabList>
                    <Tab>Tabla de Accesos</Tab>
                    <Tab>Archivo Log</Tab>
                </TabList>

                <TabPanels flex="1" >
                    <TabPanel h="100%" display="flex" flexDirection="column">
                        <FilterAccessComponent data={initialData}/>
                    </TabPanel>
                    <TabPanel>
                        <LogPanel logs={logs.data}></LogPanel>
                    </TabPanel>
                </TabPanels>
            </Tabs>
        </Flex>
    )
};
