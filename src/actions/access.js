import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";

export const getAccess = async () => {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //fetch
  try {
    const response = await api.get("/accesos", {
      data: {
        userRole: userRole
      }
    });
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  }
};
