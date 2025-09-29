// components/DashboardLayout.jsx
"use client";
import { Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";

export default function SidebarLayout({ children, isAdmin }) {
  return (
    <Flex w="100%" minH="100vh">
      {/* Sidebar fija */}
      <Sidebar isAdmin={isAdmin}/>

      {/* Contenido dinámico */}
      <Flex flex="1" direction="column" p={6}>
        {children}
      </Flex>
    </Flex>
  );
}
