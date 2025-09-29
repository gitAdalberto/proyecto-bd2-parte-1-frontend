"use client"
import { changeState } from "@/actions/user";
import { Button, Spinner, Switch, useToast, Text, Flex } from "@chakra-ui/react";
import { useState, useTransition } from "react";
export default function SwitchUser({ userId, initialState, handleFetch }) {
    const [state, setState] = useState(initialState);
    const [pending, startTransition] = useTransition();
    const toast = useToast();
    const createToast = (description, status) => {
        toast({
            title: "Cambiar estado",
            description: description,
            status: status,
            duration: 5000,
            isClosable: true,
            position: "bottom",
        });
    };
    const handleSwitch = async (e) => {
        startTransition(async () => {
            const response = await changeState(userId, !state);
            console.log("Switch:", response.data);
            if (response.success) {
                createToast(response.data?.mensaje, "success");
                setState(!state);
                handleFetch();
            } else {
                createToast(response.data?.mensaje, "error");
            }
        })
    }
    return (
        <>
            {pending && <Spinner></Spinner>}
            {!pending && (
                <Flex direction='row' gap='1em' justifyContent='flex-start'>
                    <Text>{state ? "habilitado" : "deshabilitado"}</Text>
                    <Switch onChange={handleSwitch} isChecked={state}></Switch>
                </Flex>)}

        </>
    )
};
