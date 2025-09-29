"use client"
import api from "@/utils/api";
import { Button, Flex, FormControl, FormLabel, Input, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
export default function Reset({ }) {
    const sp = useSearchParams();
    const token = sp.get("token");
    const [pass,setPass]=useState("");
    const toast = useToast();

    const createToast = (desc)=>{
        toast({
            title:"Recuperar Contraseña",
            description: desc,
            status: 'info',
            duration: 5000,
            isClosable: true
        })
    }


    const submit = async () => {
        const response = await api.post("/reset-password", {
            token: token,
            newPassword: pass
        });
        console.log(response.data);
        createToast(response.data.message);
        setPass("");
        if (response.data?.success) {
            window.location.href = "/login";
        }
    }
    return (
    <Flex w='100vw' h='100vh' align='center' justifyContent='center'>
        <Flex w='50vw' boxShadow='2xl' p='2em' borderRadius='8px' direction='column' align='flex-start' gap='1em'>
            <FormControl>
                <FormLabel>Ingresa una nueva contraseña</FormLabel>
                <Input placeholder="Contraseña" type='password' value={pass} onChange={(e)=>setPass(e.target.value)}></Input>
            </FormControl>
            <Button variant='outline' colorScheme="blue" onClick={submit}>Enviar</Button>
        </Flex>
    </Flex>
    )
};
