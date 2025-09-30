"use client"
import api from "@/utils/api";
import { Button, Flex, FormControl, FormLabel, Input, useToast, InputRightElement, InputGroup } from "@chakra-ui/react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Reset({ }) {
    const sp = useSearchParams();
    const token = sp.get("token");
    const [pass, setPass] = useState("");
    const [pass2, setPass2] = useState("");
    const toast = useToast();
    const [show, setShow] = useState(false);

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
        try {
            const response = await api.post("/reset-password", {
                token: token,
                newPassword: pass,
                pass2: pass2
            });
            console.log(response.data);
            createToast(response.data.message);
            setPass("");
            if (response.data?.success) {
                window.location.href = "/login";
            }
        } catch (err) {
            if (err.response) {
                createToast(err.response.data?.message)
            } else {
                createToast("Ha ocurrido un error");
            }
        }
    }
    return (
        <Flex w='100vw' h='100vh' align='center' justifyContent='center'>
            <Flex w='50vw' boxShadow='2xl' p='2em' borderRadius='8px' direction='column' align='flex-start' gap='1em'>
                <FormControl>
                    <FormLabel>Ingresa una nueva contraseña</FormLabel>
                    <InputGroup>
                        <Input placeholder="Ingresar Contraseña" type={show ? "text" : "password"} value={pass} onChange={(e) => setPass(e.target.value)}></Input>
                        <InputRightElement>
                            <Button
                                onClick={() => {
                                    setShow(!show);
                                }}
                                variant="ghost"
                                iconSpacing={0}
                                leftIcon={show ? <FaEyeSlash /> : <FaEye />}
                            >
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <FormControl>
                    <FormLabel>Confirmar contraseña</FormLabel>
                    <InputGroup>
                        <Input placeholder="Contraseña" type={show ? "text" : "password"} value={pass2} onChange={(e) => setPass2(e.target.value)}></Input>
                        <InputRightElement>
                            <Button
                                onClick={() => {
                                    setShow(!show);
                                }}
                                variant="ghost"
                                iconSpacing={0}
                                leftIcon={show ? <FaEyeSlash /> : <FaEye />}
                            >
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Button variant='outline' colorScheme="teal" onClick={submit}>Enviar</Button>
            </Flex>
        </Flex>
    )
};
