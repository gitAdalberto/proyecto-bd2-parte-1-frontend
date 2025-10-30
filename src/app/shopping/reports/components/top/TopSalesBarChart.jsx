import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function TopSalesBarChart({ data }) {
    return (
        <Box w="100%" h="400px">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="Producto" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="TotalUnidadesVendidas" fill="#8884d8" />
                    <Bar dataKey="PrecioPromedio" fill="#00C49F" />
                    <Bar dataKey="TotalVendido" fill="#FFBB28" />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
};
