import { tableAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(tableAnatomy.keys);

const borderY = definePartsStyle((props)=>{
    const { colorScheme: c, colorMode } = props;

    return {
        thead:{
            tr:{
                border: '1px',
                borderColor: colorMode === 'light' ? `${c}.300` : `${c}.600`,
            }
        },
        tr: {
            'th, td' : {
                borderX: '1px',
                borderColor: colorMode === 'light' ? `${c}.300` : `${c}.600`,
            },
            
        },
        tbody:{
            tr:{
                _hover:{
                    backgroundColor: colorMode === 'light' ? `${c}.200` : `${c}.700`,
                    transition: 'background-color 0.15s ease-in-out',
                }
            },
            'tr:last-child' : {
                borderBottom: '1px',
                borderColor: colorMode === 'light' ? `${c}.300` : `${c}.600`,
            }
        }
    }
})

export const tableTheme = defineMultiStyleConfig({
    variants: {  borderY: borderY }
})