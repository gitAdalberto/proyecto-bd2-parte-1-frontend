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
    Input,
    Flex,
    useToast
} from "@chakra-ui/react"
import { useRef } from "react"
import { HamburgerIcon } from "@chakra-ui/icons";
import { FaGear, FaBookOpenReader, FaNewspaper } from "react-icons/fa6";
import { FaUser, FaDatabase } from "react-icons/fa";
import { BiSolidDoorOpen } from "react-icons/bi";
import { MdLogout } from "react-icons/md";
import Link from "next/link";
import { logout, verifyLogout } from "@/actions/login";
import ColorMode from "./ColorMode";

export default function MyDrawer({ isAdmin }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = useRef();
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
        <Flex ml='0.5em' mt='0.5em'>
            <Button variant='outline' colorScheme="teal" onClick={onOpen} leftIcon={<HamburgerIcon />} iconSpacing={0}></Button>

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
                            <Button as={Link} href='/students' leftIcon={<FaBookOpenReader />} colorScheme="teal" variant='outline' justifyContent='space-'>Estudiantes</Button>
                            {isAdmin && <Button as={Link} href='/users' leftIcon={<FaUser />} colorScheme="teal" variant='outline' justifyContent='space-'>Usuarios</Button>}
                            {isAdmin && <Button as={Link} href='/access' leftIcon={<BiSolidDoorOpen />} colorScheme="teal" variant='outline' justifyContent='space-'>Accesos</Button>}
                            {isAdmin && <Button as={Link} href='/transactions' leftIcon={<FaDatabase />} colorScheme="teal" variant='outline' justifyContent='space-'>Transacciones</Button>}
                            {isAdmin && <Button as={Link} href='/reports' leftIcon={<FaNewspaper />} colorScheme="teal" variant='outline' justifyContent='space-'>Reportes</Button>}
                        </Flex>
                    </DrawerBody>

                    <DrawerFooter>
                        <Flex direction='row' gap='1em'>
                            <ColorMode></ColorMode>
                            <Button variant='outline' colorScheme="teal" leftIcon={<MdLogout />} onClick={handleLogout} >Cerrar Sesion</Button>
                            <Button as={Link} href='/options' leftIcon={<FaGear />} colorScheme="teal" variant='solid' justifyContent='space-' iconSpacing={0}></Button>
                        </Flex>
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </Flex>
    )
};
