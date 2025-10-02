"use server";
import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";

export const getTransactions = async () => {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //fetch
  try {
    const response = await api.get("/transacciones", {
      data: {
        userRole: userRole,
      },
    });
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  }
};

export const getFilterTransactions = async (
  usuario,
  accion,
  tabla,
  id,
  fechaInicio,
  fechaFin
) => {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  
  //fetch
  try {
    const response = await api.post("/transacciones/filtrar", {
      userRole: userRole,
      usuario: usuario,
      accion: accion,
      tabla: tabla,
      id: id,
      fechaInicio: fechaInicio,
      fechaFin: fechaFin,
    });
    
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  }
};
