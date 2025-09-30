"use client";

import { Flex, Text, Button } from "@chakra-ui/react";
import { NotAllowedIcon } from "@chakra-ui/icons";
import { FaHome } from "react-icons/fa";
import Link from "next/link";

export default function Page({}) {
  return (
    <Flex
      w="100vw"
      h="100vh"
      direction="column"
      justifyContent="center"
      align="center"
      gap="2em"
    >
      <Flex
        direction='row' gap='1em'
      >
        <NotAllowedIcon boxSize={10} color='gray'/>
        <Text fontSize={24} color='gray'>Contenido no permitido</Text>
      </Flex>
      <Button
      variant='outline'
      colorScheme="teal"
      leftIcon={<FaHome/>}
      as={Link}
      href='/dashboard'
      >
        Regresar</Button>
    </Flex>
  );
}
