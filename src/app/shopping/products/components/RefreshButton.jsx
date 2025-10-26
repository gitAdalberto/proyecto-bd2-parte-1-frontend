import { Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useQueryClient } from "@tanstack/react-query";
export default function RefreshButton() {
    const queryClient = useQueryClient();
    return(
        <Button
            leftIcon={<RepeatIcon />}
            colorScheme="teal"
            variant='solid'
            onClick={
                ()=>{
                    queryClient.resetQueries({ queryKey:['products']});
                }
            }
        >
            Refrescar
        </Button>
    )
};
