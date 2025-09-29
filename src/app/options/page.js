import SidebarWrapper from "@/components/SidebarWrapper";
import OptionsPanel from "./OptionsPanel";
import { verifySession } from "../lib/dal";

export default async function page() {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //hacemos fetch

  

  return (
    <SidebarWrapper>
      <OptionsPanel></OptionsPanel>
    </SidebarWrapper>
  );
}
