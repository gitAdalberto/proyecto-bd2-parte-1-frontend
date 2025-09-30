import { Flex, Heading, Text, Button } from "@chakra-ui/react";
import { FaGear, FaBookOpenReader } from "react-icons/fa6";
import Link from "next/link";

export default function SecretariaPanel({ userName }) {
    return (
        <Flex m='2em' direction='column' gap='1em'>
            <Flex>
                <Heading as='h1'>Bienvenido! {userName}</Heading>
            </Flex>
            <Flex align='center' gap='1em'>
                <Text fontSize='large' fontWeight='medium' >Ir a ver estudiantes</Text>
                <Button as={Link} href='/students' leftIcon={<FaBookOpenReader />} colorScheme="teal" variant='link' justifyContent='space-'>Estudiantes</Button>
            </Flex>
            <Flex align='center' gap='1em'>
                <Text fontSize='large' fontWeight='medium' >Ir a ver configuraciones</Text>
                <Button as={Link} href='/options' leftIcon={<FaGear />} colorScheme="teal" variant='solid' justifyContent='space-' iconSpacing={0}></Button>
            </Flex>
        </Flex>
    )
};
