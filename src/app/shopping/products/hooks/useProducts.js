
import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "../actions/products";

export function useProducts() {
    return useQuery({
        queryKey: ["products"],
        queryFn: fetchProducts,
    });
};

