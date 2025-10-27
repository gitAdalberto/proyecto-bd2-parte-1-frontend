"use client"

import InventoryHistoryPanel from "./components/InventoryHistoryPanel";
import InventoryMovementsPanel from "./components/InventoryMovementsPanel";
import {
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    Text
} from '@chakra-ui/react'

export default function InventoryPanel() {
    
    return(
        <Tabs mt='2em'>
            <TabList>
                <Tab>Movimientos Inventario</Tab>
                <Tab>Bitacora</Tab>
            </TabList>

            <TabPanels>
                <TabPanel>
                    <InventoryMovementsPanel />
                </TabPanel>
                <TabPanel>
                    <InventoryHistoryPanel />
                </TabPanel>
            </TabPanels>
        </Tabs>
    );

};
