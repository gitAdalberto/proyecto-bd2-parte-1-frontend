import ExportExcelButton from "@/components/excel/ToExcelButton";
import PdfButton2 from "@/components/PdfButton2";
import { Box, Flex, Text } from "@chakra-ui/react";

export default function LogPanel({ logs }) {
    return (
        <Flex w='100%' align='center' justifyContent='center' direction='column'>
            <Flex w="100%" mx="2em" mb='2em' direction="row" gap="1em" mt='1em'>
                <PdfButton2 fileName="Reporte de Archivo Log" id='pdf-2' />
                
            </Flex>
            <Flex
                direction="column"
                w="100%"
                maxH="300px"
                overflowY="auto"
                p={4}
                border="1px solid gray"
                borderRadius="md"
                gap={2}
                id="pdf-2"
            >
                {logs && logs.length > 0 ? (
                    logs.map((line, index) => (
                        <Box key={index} p={2} borderRadius="md">
                            <Text fontSize="sm" >
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
