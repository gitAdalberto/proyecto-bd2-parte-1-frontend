'use client';
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  Heading,
  Text,
  InputRightElement,
} from "@chakra-ui/react";
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const [verified, setVerified] = useState(null);

  const handleClick = () => setShow(!show);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    // Aquí podrías llamar a tu backend o Supabase
    
  };

  const handleVerify = async (token) => {
    const res = await fetch("http://localhost:4000/api/verify-recaptcha", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    });

    const data = await res.json();
    setVerified(data.success ? "Humano confirmado" : "Falló la validación");
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" direction="column">
      <Box
        bg="white"
        p={8}
        rounded="lg"
        shadow="md"
        w="full"
        maxW="md"
        as="form"
        onSubmit={handleSubmit}
      >
        <Heading mb={6} textAlign="center" size="lg">
          Iniciar Sesión
        </Heading>

        <FormControl id="email" mb={4}>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
          />
        </FormControl>

        <FormControl id="password" mb={6}>
          <FormLabel>Contraseña</FormLabel>
          <InputGroup >
            <Input
              type={show ? 'text' : 'password'}
              placeholder="Ingresar Contraseña"
            />
            <InputRightElement>
              <Button onClick={handleClick} variant='ghost'>
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
        <Button type="submit" colorScheme="teal" w="full" mb={4}>
          Entrar
        </Button>

        <Text fontSize="sm" textAlign="center">
          Hola{" "}
          <Box as="a" href="/register" color="teal.500">
            Mundo
          </Box>
        </Text>
      </Box>
      {verified &&
        <Box>
          <Alert status={verified === "Humano confirmado" ? "success" : "error"}>
            <AlertIcon />
            {verified}
          </Alert>
        </Box>
      }
    </Flex>
  );
}
