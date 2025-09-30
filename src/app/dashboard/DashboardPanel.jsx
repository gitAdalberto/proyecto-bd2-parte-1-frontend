"use client";
import { Button, Flex, Link } from "@chakra-ui/react";
import { logout } from "@/actions/login";
import { getSessionUser } from "@/actions/user";
import AdminPanel from "./AdminPanel";
import SecretariaPanel from "./SecretariaPanel";
export default function DashboardPanel({ userName, isAdmin }) {
  if (isAdmin) {
    return <AdminPanel userName={userName}/>
  } else {
    return <SecretariaPanel userName={userName} />
  }
}
