import SidebarWrapper from "@/components/SidebarWrapper";
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { getAccess } from "@/actions/access";
import AccessPanel from "./AccessPanel";
import { handleTitle } from "@/actions/user";
import AccessTabs from "./AccessTabs";
import { getLogs } from "@/actions/log";
import { getFilterAccess } from "@/actions/reports";

export default async function page() {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userRole = session?.role;
    if (userRole !== "admin") {
        redirect("/dashboard");
    }

    //fecth
    const filterAccess = await getFilterAccess(null, null, null, null, null);

    //recoger contenido del log
    const logs = await getLogs();
  return (
    <SidebarWrapper>
      <AccessTabs initialData={filterAccess} logs={logs}></AccessTabs>
    </SidebarWrapper>
  );
}
