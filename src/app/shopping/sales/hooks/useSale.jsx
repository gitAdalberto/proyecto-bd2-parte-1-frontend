import { useToast } from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCompleteSale, fetchSales, fetchSalesHistory } from "../actions/sales";

export function useSale() {
    return useQuery({
        queryKey: ["sales"],
        queryFn: fetchSales,
    });
}

export function useSaleHistory() {
    return useQuery({
        queryKey: ["saleHistory"],
        queryFn: fetchSalesHistory,
    });
}

export function useCreateCompleteSale(handleClean) {
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: createCompleteSale,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({ queryKey:['sales']});
            toast({
                title: "Venta Creada",
                description: data?.mensaje || "no hay mensaje",
                isClosable: true,
                duration: 3000,
                status: 'success'
            });
            handleClean();
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