"use client";
import {
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableCaption,
    Flex,
    Spinner,
    Button,
    Box,
    Heading,
    Icon
} from "@chakra-ui/react";
import { useState, useTransition } from "react";
import { RepeatIcon } from "@chakra-ui/icons";
import { getStudents } from "@/actions/students";
import { FaBookOpenReader } from "react-icons/fa6";
import DeleteButton from "./DeleteButton";
import EditButton from "./EditButton";
import AddButton from "./AddButton";
import ShowButton from "./ShowButton";
import PdfButton2 from "@/components/PdfButton2";




export default function StudentsTable({ initialStudents, initialError }) {

    const [students, setStudents] = useState(initialStudents || []);
    const [error, setError] = useState(initialError || null);
    const [pending, startTransition] = useTransition();
    const handleFetch = () => {
        setError(null);
        startTransition(async () => {
            try {
                const data = await getStudents();
                setStudents(data);
            } catch (err) {
                setError(err.mensaje);
            }
        })
    }

    return (
        <Flex w='100%'>
            <Flex align="center" justifyContent="center" direction="column" m="2em">
                <Heading  fontWeight='normal'>Panel de Estudiantes</Heading>
                <Flex w="80vw"  direction="row" gap="1em" mb='2em'>
                    <AddButton handleFetch={handleFetch} />
                    <Button colorScheme="teal" variant='outline' onClick={handleFetch} leftIcon={<RepeatIcon />}>Refrescar</Button>
                    <PdfButton2 fileName='ReporteEstudiantes' id='pdf'/>
                </Flex>

                {pending && <Flex h='100vh'><Spinner size="xl" /></Flex>}
                {error && <p style={{ color: "red" }}>{error}</p>}
                {!pending && students.length > 0 && (
                    <Box id="pdf">
                        <Box  overflowX='auto' w="80vw" border="1px solid lightgray" borderRadius="8px" boxShadow='lg'>
                            
                            <Table variant="simple" size="sm" >
                                <TableCaption>Tabla de estudiantes</TableCaption>
                                <Thead>
                                    <Tr >
                                        <Th></Th>
                                        <Th>nombre</Th>
                                        <Th>carne</Th>
                                        <Th>correo</Th>
                                        <Th>telefono</Th>
                                        <Th>registro</Th>
                                        <Th>Acciones</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {students.map((s) => (
                                        <Tr key={s.id}>
                                            <Td><ShowButton {...s} /></Td>
                                            <Td>{s.nombre} {s.apellido}</Td>
                                            <Td>{s.carne}</Td>
                                            <Td>{s.correo}</Td>
                                            <Td>{s.telefono}</Td>
                                            <Td>{s.fechaRegistro}</Td>
                                            <Td display="flex" gap="1em">
                                                <EditButton {...s} handleFetch={handleFetch} />
                                                <DeleteButton studentId={s.id} handleFetch={handleFetch} />
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </Box>

                )}
            </Flex>
        </Flex>
    );
};
