
import { useQuery } from "@tanstack/react-query";
import { fetchIncomeReport, fetchSalesReport, fetchStockReport, fetchTopSalesReport } from "../actions/reports";

export function useSalesReport(obj) {
    return useQuery({
        queryKey: ["salesReport", obj],
        queryFn: fetchSalesReport,
        enabled: !!obj
    });
}

export function useStockReport(){
    return useQuery({
        queryKey:["stockReport"],
        queryFn: fetchStockReport,
    })
}

export function useTopSalesReport(obj) {
    return useQuery({
        queryKey: ["salesReport", obj],
        queryFn: fetchTopSalesReport,
        enabled: !!obj
    });
}

export function useIncomeReport(obj) {
    return useQuery({
        queryKey: ["incomeReport", obj],
        queryFn: fetchIncomeReport,
        enabled: !!obj
    });
}