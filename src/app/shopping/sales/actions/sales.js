"use server";

import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";

export const createCompleteSale = async (obj) => {
  //Verificamos la sesion
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userRole = session?.role;
  const userId = session?.userId;

  const venta = obj.venta;
  const detalles = obj.productsList;

  venta.idUsuario = userId;

  console.log({ userRole, venta, detalles });

  try {
    const response = await api.post("/ventas/completa", {
      venta: venta,
      detalles: detalles,
      userRole: userRole
    });
    return response.data;
  } catch (error) {
    console.log("error en createCompleteSale");
    console.log({error})
    throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
  }
};
