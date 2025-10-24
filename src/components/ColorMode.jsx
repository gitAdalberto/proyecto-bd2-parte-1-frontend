import { Button, useColorMode } from "@chakra-ui/react"
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
export default function ColorMode() {
    const { colorMode, toggleColorMode } = useColorMode();
    return (
        <Button variant='solid' colorScheme="teal" onClick={toggleColorMode}  >
            { colorMode === 'light' ? <MoonIcon/> : <SunIcon/>}
        </Button>
    )
};
