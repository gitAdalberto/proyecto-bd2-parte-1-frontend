"use client"
import {
    useDisclosure,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    Flex
} from "@chakra-ui/react"
import { useRef } from "react"

import { HamburgerIcon } from "@chakra-ui/icons";
import { FaGear, FaBookOpenReader, FaNewspaper } from "react-icons/fa6";
import { FaUser, FaDatabase, FaHome, FaProductHunt, FaShoppingCart } from "react-icons/fa";
import { BiSolidDoorOpen } from "react-icons/bi";
import { MdCategory, MdInventory } from "react-icons/md";


import { Divider } from "@chakra-ui/react";
import Link from "next/link";
import ColorMode from "./ColorMode";
import LogOutButton from "./LogOutButton";
import DrawerButton from "./DrawerButton";

export default function MyDrawer({ isAdmin }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();

    return (
        <Flex>
            <Button variant='unstyled' onClick={onOpen} leftIcon={<HamburgerIcon />} iconSpacing={0}></Button>

            <Drawer
                isOpen={isOpen}
                placement='left'
                onClose={onClose}
                finalFocusRef={btnRef}
                size='xs'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>

                    <DrawerBody>
                        <Flex w='100%' direction='column' gap='1em'>
                            <DrawerButton href='/dashboard' leftIcon={<FaHome />} >Dashboard</DrawerButton>
                            <DrawerButton href='/students' leftIcon={<FaBookOpenReader />} >Estudiantes</DrawerButton>
                            {isAdmin && <DrawerButton href='/users' leftIcon={<FaUser />} >Usuarios</DrawerButton>}
                            {isAdmin && <DrawerButton href='/access' leftIcon={<BiSolidDoorOpen />} >Accesos</DrawerButton>}
                            {isAdmin && <DrawerButton href='/transactions' leftIcon={<FaDatabase />} >Transacciones</DrawerButton>}
                            {isAdmin && <DrawerButton href='/reports' leftIcon={<FaNewspaper />} >Reportes</DrawerButton>}
                            <Divider orientation='horizontal' />
                            <DrawerButton href='/shopping/categories' leftIcon={<MdCategory />} >Categorías</DrawerButton>
                            <DrawerButton href='/shopping/products' leftIcon={<FaProductHunt />} >Productos</DrawerButton>
                            <DrawerButton href='/shopping/inventory' leftIcon={<MdInventory />} >Inventario</DrawerButton>
                            <DrawerButton href='/dashboard' leftIcon={<FaShoppingCart />} >Ventas</DrawerButton>
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter>
                        <Flex direction='row' gap='1em'>
                            <ColorMode></ColorMode>
                            <LogOutButton>Cerrar Sesión</LogOutButton>
                            <Button as={Link} href='/options' leftIcon={<FaGear />} colorScheme="teal" variant='solid' justifyContent='space-' iconSpacing={0}></Button>
                        </Flex>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
};
