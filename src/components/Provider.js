"use client";

import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import theme from "./theme";

export default function Provider({ children }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient} >
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        {children}
      </ChakraProvider>
    </QueryClientProvider>
  );
}
