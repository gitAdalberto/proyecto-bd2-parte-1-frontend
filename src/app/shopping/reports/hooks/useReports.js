
import { useQuery } from "@tanstack/react-query";
import { fetchSalesReport } from "../actions/reports";

export function useSalesReport(obj) {
    return useQuery({
        queryKey: ["salesReport", obj],
        queryFn: fetchSalesReport,
    });
}