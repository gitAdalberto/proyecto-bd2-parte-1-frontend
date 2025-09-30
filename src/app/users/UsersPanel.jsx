"use client"
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    Flex,
    Spinner,
    Button,
    Box,
    Heading
} from "@chakra-ui/react";
import { useState, useTransition } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { getUsers } from "@/actions/user";
import AddButton from "./AddButton";
import SwitchUser from "./SwitchUser";
import PdfButton2 from "@/components/PdfButton2";

export default function UsersPanel({ initialUsers, initialError }) {
    const [users, setUsers] = useState(initialUsers);
    const [error, setError] = useState(initialError || null);
    const [pending, startTransition] = useTransition();

    const handleFetch = () => {
        setError(null);
        startTransition(async () => {
            try {
                const response = await getUsers();
                setUsers(response.data);
                console.log(response);
            } catch (error) {
                console.log(error);
                setError(error.mensaje)
            }
        })
    }

    return (
        <Flex w='100%'>
            <Flex align='center' justifyContent='center' direction='column'>
                <Flex w='80vw' ml='2em' mb='2em' direction='row' gap='1em'>
                    <AddButton handleFetch={handleFetch} />
                    <Button colorScheme="teal" variant='outline' onClick={handleFetch} leftIcon={<RepeatIcon />}>Refrescar</Button>
                    <PdfButton2 fileName="ReporteUsuarios" id='pdf'/>
                </Flex>
                {pending && <Flex h='100vh'><Spinner size="xl" /></Flex>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!pending && users.length > 0 && (
                    <Box id="pdf">
                        <Box overflowX='auto' w="80vw" border="1px solid lightgray" borderRadius="8px" boxShadow='lg'>
                            <Table variant='simple' size='sm'>
                                <TableCaption>Tabla de usuarios</TableCaption>
                                <Thead>
                                    <Tr>
                                        <Th>Id</Th>
                                        <Th>Usuario</Th>
                                        <Th>Correo</Th>
                                        <Th>Rol</Th>
                                        <Th>Estado</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {users.map((u) => (
                                        <Tr key={u.id}>
                                            <Td>{u.id}</Td>
                                            <Td>{u.usuario}</Td>
                                            <Td>{u.correo}</Td>
                                            <Td>{u.rol}</Td>
                                            <Td><SwitchUser userId={u.id} initialState={u.estado} handleFetch={handleFetch} /></Td>

                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>
                )}

            </Flex>
        </Flex>
    )
};
