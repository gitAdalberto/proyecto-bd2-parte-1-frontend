import React, { useState } from 'react'
import {
    Flex,
    Text,
    IconButton,
    Divider,
    Avatar,
    Heading
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';
import { FiLogOut } from "react-icons/fi";
import { FaGear, FaBookOpenReader, FaNewspaper } from "react-icons/fa6";
import { FaUser, FaDatabase } from "react-icons/fa";
import NavItem from '../components/NavItem'
import { BiSolidDoorOpen } from "react-icons/bi";



export default function Sidebar({ isAdmin }) {
    const [navSize, changeNavSize] = useState("small")
    return (
        <Flex
            pos="sticky"
            left="5"
            h="95vh"
            marginTop="2.5vh"
            boxShadow="0 4px 12px 0 rgba(0, 0, 0, 0.05)"
            borderRadius={navSize == "small" ? "15px" : "30px"}
            w={navSize == "small" ? "75px" : "200px"}
            flexDir="column"
            justifyContent="space-between"
        >
            <Flex
                p="5%"
                flexDir="column"
                w="100%"
                alignItems={navSize == "small" ? "center" : "flex-start"}
                as="nav"
            >
                <IconButton
                    background="none"
                    mt={5}
                    _hover={{ background: 'none' }}
                    icon={<HamburgerIcon />}
                    onClick={() => {
                        if (navSize == "small")
                            changeNavSize("large")
                        else
                            changeNavSize("small")
                    }}
                />
                <NavItem navSize={navSize} icon={FaBookOpenReader} title="Estudiantes" href={"/students"}/>
                {isAdmin && <NavItem navSize={navSize} icon={FaUser} title="Usuarios" href={"/users"}/>}
                {isAdmin && <NavItem navSize={navSize} icon={BiSolidDoorOpen} title="Accesos" href={"/access"}/>}
                {isAdmin && <NavItem navSize={navSize} icon={FaDatabase} title="Transacciones" href={"/transactions"}/>}
                {isAdmin && <NavItem navSize={navSize} icon={FaNewspaper} title="Reportes" href={"/reports"}/>}
                <NavItem navSize={navSize} icon={FaGear} title="Opciones" href={"/options"}/>
            </Flex>

            
        </Flex>
    )
}