import { Box, Table, TableCaption, TableContainer, Thead, Tbody } from "@chakra-ui/react";

export default function CustomTable({ caption, thead, tbody }) {
  return (
    <Box w="100%" border="1px solid lightgray" borderRadius="8px" boxShadow="lg">
      <TableContainer>
        <Table variant="simple" size="sm" padding="1em" w="100%">
          {caption && <TableCaption>{caption}</TableCaption>}
          <Thead display="table" w="100%">
            {thead}
          </Thead>
          <Tbody display="block" maxH="300px" overflowY="auto" w="100%">
            {tbody}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
}
