import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchInventoryHistory, fetchInventoryMovements, postInvetoryMovements, updateMinimunStock } from "../actions/inventory";
import { useToast } from "@chakra-ui/react";

export function useInventory(){
    return useQuery({
        queryKey: ['inventoryMovements'],
        queryFn: fetchInventoryMovements,
    });
}

export function useInventoryHistory(){
    return useQuery({
        queryKey: ['inventoryHistory'],
        queryFn: fetchInventoryHistory,
    });
}


export function usePostInvetoryMovements(onClose){
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: postInvetoryMovements,
        onSuccess: (data) =>{
            console.log(data);
            queryClient.invalidateQueries({ queryKey:['inventoryMovements']});
            queryClient.invalidateQueries({ queryKey:['inventoryHistory']});
            toast({
                title: "Entrada",
                description:data?.mensaje || "no hay mensaje",
                isClosable: true,
                duration: 3000,
                status: 'success'
            });
            onClose();
        },
        onError: (error) => {
            console.error("Error al agregar entrada de producto:", error.message);
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


export function useUpdateMinimunStock(onClose){
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: updateMinimunStock,
        onSuccess: (data) =>{
            console.log(data);
            queryClient.invalidateQueries({ queryKey:['products']});
            toast({
                title: "Actualizar stock minimo",
                description:data?.mensaje || "no hay mensaje",
                isClosable: true,
                duration: 3000,
                status: 'success'
            });
            onClose();
        },
        onError: (error) => {
            console.error("Error al actualizar stock minimo:", error.message);
            toast({
                title: "Error al actualizar stock minimo",
                description: error.message,
                isClosable: true,
                duration: 3000,
                status: 'error'
            })
        },
    });
}