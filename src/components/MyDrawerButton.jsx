"use client";

import { Button } from "@chakra-ui/react";
import Link from "next/link";

export default function MyDrawerButton({ children, href, variant, leftIcon }) {
    return (
        <Button
            as={Link}
            href={href}
            colorScheme="teal"
            variant={variant}
            leftIcon={leftIcon}
        >
            {children}
        </Button>
    )
};
