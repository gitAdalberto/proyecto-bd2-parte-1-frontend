"use client"
import api from "@/utils/api";
import { Button, Flex, FormControl, FormLabel, Input, Link, useToast } from "@chakra-ui/react";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useState } from "react";
export default function Forgot({ }) {
    const [email, setEmail] = useState("");
    const toast = useToast();

    const createToast = (desc) => {
        toast({
            title: "Recuperar Contraseña",
            description: desc,
            status: 'info',
            duration: 5000,
            isClosable: true
        })
    }


    const submit = async () => {
        const response = await api.post("/forgot-password", {
            email: email
        });
        console.log(response.data);
        createToast(response.data.message);
        setEmail("");
    }
    return (
        <Flex w='100vw' h='100vh' align='center' justifyContent='center' direction='column'>
            <Flex w='50vw' mb='1em'>
                <Link href="/login">
                    <Button colorScheme="blue" variant='solid' leftIcon={<ArrowBackIcon/>}>Regresar</Button>
                </Link>
            </Flex>
            <Flex w='50vw' boxShadow='2xl' p='2em' borderRadius='8px' direction='column' align='flex-start' gap='1em'>

                <FormControl>
                    <FormLabel>Ingresa tu correo</FormLabel>
                    <Input placeholder="ejemplo@correo.com" type='email' value={email} onChange={(e) => setEmail(e.target.value)}></Input>
                </FormControl>
                <Button variant='outline' colorScheme="blue" onClick={submit}>Enviar</Button>
            </Flex>
        </Flex>
    )
};
