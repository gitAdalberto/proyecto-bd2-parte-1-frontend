import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { FaGear, FaBookOpenReader, FaNewspaper } from "react-icons/fa6";
import { FaUser, FaDatabase } from "react-icons/fa";
import { BiSolidDoorOpen } from "react-icons/bi";
import Link from "next/link";

export default function AdminPanel({ userName }) {
    return (
        <Flex m='2em' direction='column' gap='1em'>
            <Flex>
                <Heading as='h1'>Bienvenido! {userName}</Heading>
            </Flex>
            <Flex align='center' gap='1em'>
                <Text fontSize='large' fontWeight='medium' >Ir a ver Panel de Estudiantes</Text>
                <Button as={Link} href='/students' leftIcon={<FaBookOpenReader />} colorScheme="teal" variant='link' >Estudiantes</Button>
            </Flex>
            <Flex align='center' gap='1em'>
                <Text fontSize='large' fontWeight='medium' >Ir a ver el Panel de Usuarios</Text>
                <Button as={Link} href='/users' leftIcon={<FaUser />} colorScheme="teal" variant='link' >Usuarios</Button>
            </Flex>
            <Flex align='center' gap='1em'>
                <Text fontSize='large' fontWeight='medium' >Ir a ver el Panel de Accesos</Text>
                <Button as={Link} href='/access' leftIcon={<BiSolidDoorOpen />} colorScheme="teal" variant='link' >Accesos</Button>
            </Flex>
            <Flex align='center' gap='1em'>
                <Text fontSize='large' fontWeight='medium' >Ir a ver el Panel de Transacciones</Text>
                <Button as={Link} href='/transactions' leftIcon={<FaDatabase />} colorScheme="teal" variant='link' >Transacciones</Button>
            </Flex>
            <Flex align='center' gap='1em'>
                <Text fontSize='large' fontWeight='medium' >Ir a ver el Panel de Reportes</Text>
                <Button as={Link} href='/access' leftIcon={<FaNewspaper />} colorScheme="teal" variant='link' >Reportes</Button>
            </Flex>
            <Flex align='center' gap='1em'>
                <Text fontSize='large' fontWeight='medium' >Ir a ver configuraciones</Text>
                <Button as={Link} href='/options' leftIcon={<FaGear />} colorScheme="teal" variant='solid'  iconSpacing={0}></Button>
            </Flex>
        </Flex>
    )
};
