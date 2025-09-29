import PdfButton2 from "@/components/PdfButton2";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function LogPanel({ logs }) {
    return (
        <Flex w='100%' align='center' justifyContent='center' direction='column'>
            <Flex w="100%" mx="2em" mb='2em' direction="row" gap="1em">
                <PdfButton2 fileName="Reporte de Archivo Log" id='pdf-2' />
            </Flex>
            <Flex
                direction="column"
                w="100%"
                maxH="400px"
                overflowY="auto"
                p={4}
                border="1px solid lightgray"
                borderRadius="md"
                bg="gray.50"
                gap={2}
                id="pdf-2"
            >
                {logs && logs.length > 0 ? (
                    logs.map((line, index) => (
                        <Box key={index} p={2} bg="white" borderRadius="md" shadow="sm">
                            <Text fontSize="sm" color="gray.800">
                                {line}
                            </Text>
                        </Box>
                    ))
                ) : (
                    <Text color="gray.500" textAlign="center">
                        No hay registros para mostrar
                    </Text>
                )}
            </Flex>
        </Flex>
    )
};
