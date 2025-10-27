import { Button } from "@chakra-ui/react";
import { RepeatIcon } from "@chakra-ui/icons";
import { useQueryClient } from "@tanstack/react-query";
export default function RefreshButton({query}) {
    const queryClient = useQueryClient();
    return(
        <Button
            leftIcon={<RepeatIcon />}
            colorScheme="teal"
            variant='solid'
            onClick={
                ()=>{
                    queryClient.resetQueries({ queryKey:[query]});
                }
            }
        >
            Refrescar
        </Button>
    )
};
