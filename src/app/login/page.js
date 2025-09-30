"use client";
import { login } from "@/actions/login";
import {
  Flex,
  Box,
  Heading,
  Icon,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  useToast,
  Link
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState, useRef } from "react";

import { verify } from "@/actions/captcha";
import ReCAPTCHA from "react-google-recaptcha";

export default function ClientPage() {
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(false);
  const toast = useToast();
  const createToast = (description, status) => {
        toast({
            title: "Iniciar sesion",
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    };
  const handleClick = async (formData) => {
    if (verified) {
        const response = await login(formData);
        if (response.success) {
          createToast(response.data?.mensaje, "success");
          window.location.href = "/dashboard";
        } else {
          createToast(response.data?.mensaje, "error");
        }
    } else {
        createToast("Completa el captcha", "error");
    }
  };
  const handleVerify = async (token) =>{
    const data = await verify(token);
    if (data.success) {
        setVerified(true);
    } else {
        setVerified(false)
    }
  }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      direction="column"
    >
      <Box
        p={8}
        rounded="lg"
        shadow="md"
        w="full"
        maxW="md"
        as="form"
        action={handleClick}
        border='2px solid lightblue'
      >
        <Heading mb={6} textAlign="center" size="lg">
          Iniciar Sesión
        </Heading>
        <FormControl id="email" mb={4}>
          <FormLabel>Usuario</FormLabel>
          <Input type="text" placeholder="tu usuario" name="user" />
        </FormControl>
        <FormControl id="password" mb={6}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup>
            <Input
              type={show ? "text" : "password"}
              placeholder="Ingresar Contraseña"
              name="password"
            />
            <InputRightElement>
              <Button
                onClick={() => {
                  setShow(!show);
                }}
                variant="ghost"
              >
                <Icon as={show ? FaEyeSlash : FaEye} />
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <Box mb={4}>
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
            onChange={handleVerify}
          />
        </Box>
        <Button colorScheme="teal" w="full" mb={4} type="submit">
          Entrar
        </Button>
        <Link color='teal.500' href="/forgot-password">Recuperar Contraseña</Link>
      </Box>
    </Flex>
  );
}
