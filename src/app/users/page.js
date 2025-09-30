import { getUsers, handleTitle } from "@/actions/user";
import SidebarWrapper from "@/components/SidebarWrapper";
import UsersPanel from "./UsersPanel";

export default async function page() {
    const response = await getUsers();
    return <SidebarWrapper><UsersPanel initialUsers={response.data}></UsersPanel></SidebarWrapper>
};
