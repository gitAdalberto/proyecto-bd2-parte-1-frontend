"use client";
import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function DrawerButton({ children, href, leftIcon }) {
    return <Button as={Link} href={href} leftIcon={leftIcon} colorScheme="teal" variant='outline' justifyContent='space-'>{children}</Button>
};
