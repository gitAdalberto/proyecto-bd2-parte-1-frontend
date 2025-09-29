import { verifySession } from "@/app/lib/dal";
import SidebarLayout from "./SidebarLayout";

export default async function SidebarWrapper({ children }) {
  //verificamos sesion
  const session = await verifySession();
  if (!session) return null;

  //obtenemos rol
  const role = session?.role;

  //verificamos si es admin
  const isAdmin = role === "admin";

  return <SidebarLayout isAdmin={isAdmin}>{children}</SidebarLayout>;
}
