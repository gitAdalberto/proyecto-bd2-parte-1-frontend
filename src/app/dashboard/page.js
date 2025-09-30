import SidebarWrapper from "@/components/SidebarWrapper";
import DashboardPanel from "./DashboardPanel";
import { verifySession } from "../lib/dal";
import { getCurrentUserName } from "@/actions/user";

export default async function Page() {
  const session = await verifySession();
    if (!session) return null;
  
    //recogemos el rol y id de la session
    const userRole = session?.role;

    const user = await getCurrentUserName()
    console.log("user")
    console.log({user})
  
  return <SidebarWrapper>
    <DashboardPanel userName={user.username} isAdmin={userRole === "admin" ? true : false}/>
  </SidebarWrapper>
};
