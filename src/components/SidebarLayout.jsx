// components/DashboardLayout.jsx
"use client";
import { Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import MyDrawer from "./MyDrawer";

export default function SidebarLayout({ children, isAdmin }) {
  return (
    <Flex w="100%" minH="100vh">
      {/*<Sidebar isAdmin={isAdmin}/> */}
        <MyDrawer isAdmin={isAdmin}/>

      <Flex flex="1" direction="column">
        {children}
      </Flex>
    </Flex>
  );
}
