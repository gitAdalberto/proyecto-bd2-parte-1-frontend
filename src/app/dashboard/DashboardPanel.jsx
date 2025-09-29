"use client";
import { Button, Flex, Link } from "@chakra-ui/react";
import { logout } from "@/actions/login";
import { getSessionUser } from "@/actions/user";
export default function DashboardPanel() {
  return (
    <>
      <Flex>
        <p>Hola mundo</p>
        <Button colorScheme="red" variant="solid" onClick={logout}>
          Cerrar Sesion
        </Button>
        <Button colorScheme="green" variant="solid" onClick={getSessionUser}>
          Verificar usuario
        </Button>
        <Link href="/students">
          <Button colorScheme="teal">Ver estudiantes</Button>
        </Link>
      </Flex>
    </>
  );
}
