import { useToast } from "@chakra-ui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCompleteSale } from "../actions/sales";

export function useCreateCompleteSale(){
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: createCompleteSale,
        onSuccess: (data) =>{
            console.log(data);
            //queryClient.invalidateQueries({ queryKey:['products']});
            toast({
                title: "Venta Creada",
                description:data?.mensaje || "no hay mensaje",
                isClosable: true,
                duration: 3000,
                status: 'success'
            });
        },
        onError: (error) => {
            console.error("Error al crear venta:", error.message);
            toast({
                title: "Error",
                description: error.message,
                isClosable: true,
                duration: 3000,
                status: 'error'
            })
        },
    });
}