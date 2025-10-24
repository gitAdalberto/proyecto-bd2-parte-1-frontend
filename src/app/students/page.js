
import api from "@/utils/api";
import { verifySession } from "@/app/lib/dal";
import StudentsTable from "@/app/students/StudentsTable";
import SidebarWrapper from "@/components/SidebarWrapper";
import { handleTitle } from "@/actions/user";

export default async function Students() {
  //leer la sesion
  const session = await verifySession();
  if (!session) return null;

  //obtener el rol
  const role = session?.role;
  let error = null;
  let response = [];
  //hacemos fetch
  try {
    response = await api.post("/estudiantes/list",{data:{userRole: role}});    
  } catch (err) {
    error = err.response?.mensaje;
  }

  return <SidebarWrapper>
    <StudentsTable initialStudents={response.data} initialError={error} role={role} />
  </SidebarWrapper>
}
