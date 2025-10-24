"use client"; // obligatorio porque usamos extendTheme

import { extendTheme } from "@chakra-ui/react";
import { tableTheme } from "./table/table";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  components: { Table: tableTheme }
});

export default theme;
