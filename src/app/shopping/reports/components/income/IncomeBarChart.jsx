import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function IncomeBarChart({ data }) {
    return (
        <Box w="100%" h="400px">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Mes" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="TotalVentas" fill="#8884d8" />
                    <Bar dataKey="TotalProductosVendidos" fill="#00C49F" />
                    <Bar dataKey="TotalUnidadesVendidas" fill="#FFBB28" />
                    <Bar dataKey="Subtotal" fill="#00CED1" />
                    <Bar dataKey="TotalDescuentos" fill="#FF1493" />
                    <Bar dataKey="IngresosTotales" fill="#7CFC00" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
};
