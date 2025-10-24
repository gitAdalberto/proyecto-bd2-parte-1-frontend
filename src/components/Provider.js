"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { CacheProvider } from "@chakra-ui/next-js";
import theme from "./theme";

export default function Provider({ children }) {
  return (
    
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    
  );
}
