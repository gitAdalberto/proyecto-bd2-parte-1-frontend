
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteProduct, fetchProducts, postProduct, putProduct } from "../actions/products";
import { useToast } from "@chakra-ui/react";
export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
};

export function usePostProduct(onClose){
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: postProduct,
        onSuccess: (data) =>{
            console.log(data);
            queryClient.invalidateQueries({ queryKey:['products']});
            toast({
                title: "Producto Creado",
                description:data?.mensaje || "no hay mensaje",
                isClosable: true,
                duration: 3000,
                status: 'success'
            });
            onClose();
        },
        onError: (error) => {
            console.error("Error al agregar producto:", error.message);
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

export function useDeleteProduct(onClose){
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: deleteProduct,
        onSuccess: (data) =>{
            console.log(data);
            queryClient.invalidateQueries({ queryKey:['products']});
            toast({
                title: "Producto Eliminado",
                description:data?.mensaje || "no hay mensaje",
                isClosable: true,
                duration: 3000,
                status: 'success'
            });
            onClose();
        },
        onError: (error) => {
            toast({
                title: "Error al eliminar producto",
                description: error.message,
                isClosable: true,
                duration: 3000,
                status: 'error'
            })
        },
    });
}

export function usePutProduct(onClose){
    const queryClient = useQueryClient();
    const toast = useToast();
    return useMutation({
        mutationFn: putProduct,
        onSuccess: (data) =>{
            console.log(data);
            queryClient.invalidateQueries({ queryKey:['products']});
            toast({
                title: "Producto Editado",
                description:data?.mensaje || "no hay mensaje",
                isClosable: true,
                duration: 3000,
                status: 'success'
            });
            onClose();
        },
        onError: (error) => {
            toast({
                title: "Error al editar producto",
                description: error.message,
                isClosable: true,
                duration: 3000,
                status: 'error'
            })
        },
    });
}


