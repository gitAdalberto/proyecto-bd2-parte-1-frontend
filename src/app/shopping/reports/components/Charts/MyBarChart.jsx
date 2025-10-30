import { Box, Text } from "@chakra-ui/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

export default function MyBarChart({ data, XdataKey, YdataKey, name }) {
    return (
        <Box w="100%" h="400px">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={XdataKey} />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={YdataKey} fill="#8884d8" name={name} />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    )
};
