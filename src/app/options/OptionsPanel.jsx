"use client";
import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Text,
  useToast
} from "@chakra-ui/react";
import ChangeButton from "./ChangeButton";
import { MdLogout } from "react-icons/md";
import { logout, verifyLogout } from "@/actions/login";
import ColorMode from "@/components/ColorMode";
export default function OptionsPanel({  }) {
  const toast = useToast();
    const createToast = (description, status) => {
          toast({
              title: "Cerrar sesion",
              description: description,
              status: status,
              duration: 5000,
              isClosable: true,
              position: "bottom",
          });
      };
    const handleLogout = async () => {
        const response = await verifyLogout();
        if (response.success) {
          createToast(response.data?.mensaje, "success");
          await logout();
        } else {
          createToast(response.data?.mensaje, "error");
        }
      
    };
  return (
    <>
      <Flex  align="flex-start" justifyContent="flex-start" direction='column' gap='2em' ml='2em' mt='2em'>
        <Box>
          <Heading as='h3' size='lg' mb='1em'>Opciones de usuario</Heading>
          <Text mb='1em' fontWeight='medium'>Cambiar de Contraseña</Text>
          <ChangeButton />

        </Box>
        <Box w='100%'>
          <Divider orientation="horizontal" />
        </Box>
        <Box>
          <Text mb='1em' fontWeight='medium'>Cerrar sesión</Text>
          <Button variant='outline' colorScheme="blue" leftIcon={<MdLogout />} onClick={handleLogout}>Cerrar</Button>
        </Box>
        <Box w='100%'>
          <Divider orientation="horizontal" />
        </Box>
        <Box>
          <Heading as='h3' size='lg' mb='1em'>Opciones de interfaz</Heading>
          <Text mb='1em' fontWeight='medium'>Cambiar Tema</Text>
          <ColorMode />
        </Box>
      </Flex>
    </>
  );
}
