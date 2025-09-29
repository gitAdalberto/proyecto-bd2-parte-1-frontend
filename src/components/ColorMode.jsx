import { Button, useColorMode } from "@chakra-ui/react"
export default function ColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button colorScheme="blue" onClick={toggleColorMode}>
            { colorMode === 'light' ? 'Dark' : 'Light'}
        </Button>
    )
};
