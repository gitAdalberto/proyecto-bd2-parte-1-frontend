"use client"
import { RepeatIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";

export default function RefreshButton({action}) {
    return <Button colorScheme="green" variant='outline' leftIcon={<RepeatIcon />} onClick={action}>Refrescar</Button>
};
