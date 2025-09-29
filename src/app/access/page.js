import SidebarWrapper from "@/components/SidebarWrapper";
import { verifySession } from "../lib/dal";
import { redirect } from "next/navigation";
import { getAccess } from "@/actions/access";
import AccessPanel from "./AccessPanel";
import { handleTitle } from "@/actions/user";
import AccessTabs from "./AccessTabs";
import { getLogs } from "@/actions/log";

export default async function page() {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userRole = session?.role;
    if (userRole !== "admin") {
        redirect("/dashboard");
    }

    //fecth
    let data = null;
    let error = null;
    const response = await getAccess();
    if (response.success) {
        data = response.data;
    } else {
        error = response.data;
    }

    //recoger contenido del log
    const logs = await getLogs();
    console.log(logs);
  return (
    <SidebarWrapper>
      <AccessTabs initialData={data} initalError={error} logs={logs}></AccessTabs>
    </SidebarWrapper>
  );
}
