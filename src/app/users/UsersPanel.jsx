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
import PdfButton3 from "@/components/PdfButton3";
import ShowInfo from "./ShowInfo";
import ExportExcelButton from "@/components/excel/ToExcelButton";

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
        <Flex w='100%' mt='0.5em'>
            <Flex align='center' justifyContent='center' direction='column' m='2em'>
                <Heading fontWeight='normal' mb='1em'>Panel de Usuarios</Heading>
                <Flex w='80vw'  mb='2em' direction='row' gap='1em'>
                    <AddButton handleFetch={handleFetch} />
                    <Button colorScheme="teal" variant='outline' onClick={handleFetch} leftIcon={<RepeatIcon />}>Refrescar</Button>
                    <PdfButton3 fileName="ReporteUsuarios" headers={[["ID","Usuario","Correo","Rol", "Estado"]]}
                        rows={
                            users.map((u)=>[
                                u.id,
                                u.usuario,
                                u.correo,
                                u.rol,
                                u.estado ? "habilitado" : "deshabilitado"
                            ])
                        }
                    />
                    <ExportExcelButton  filename={'archivoUsuarios'} rows={users} />
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
                                        <Th></Th>
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
                                            <Td>
                                                <ShowInfo usuario={u.usuario} correo={u.correo} rol={u.rol} estado={u.estado} />
                                            </Td>
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
