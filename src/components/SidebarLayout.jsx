// components/DashboardLayout.jsx
"use client";
import { Flex, Box } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import MyDrawer from "./MyDrawer";

export default function SidebarLayout({ children, isAdmin }) {
  return (
    <Flex w="100%" minH="100vh">
      <Box
        as="aside"
        position="sticky"
        top="0"
        h="100vh"           
        flexShrink={0}      
        zIndex={1}          
      >
        <MyDrawer isAdmin={isAdmin} />
      </Box>

      <Flex flex="1" direction="column" overflowY="auto">
        {children}
      </Flex>
    </Flex>

  );
}
