import { logout, verifyLogout } from "@/actions/login";
import { Button, useToast } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";

export default function LogOutButton({children }) {
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
        <Button
            variant='outline'
            colorScheme="teal"
            leftIcon={<MdLogout />}
            onClick={handleLogout}
        >
            {children}
        </Button>
    )
};
