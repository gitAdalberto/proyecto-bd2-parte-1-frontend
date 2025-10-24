import { Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
export default function RefreshButton({ handleRefresh }) {

    return (
        <Button
            variant='solid'
            leftIcon={<RepeatIcon />}
            colorScheme="teal"
            onClick={handleRefresh}
        >
            Refrescar
        </Button>
    )
};
