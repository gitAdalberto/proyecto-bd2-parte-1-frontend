"use server";

import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";

export const fetchInventoryMovements = async () => {
  const session = await verifySession();
  if (!session) return null;

  const userRole = session?.role;

  try {
    const response = await api.get("/inventario/movimientos",{
        data: {
            userRole: userRole
        }
    }
    );
    return response.data; 
  } catch (error) {
    console.log("error en fetchInventoryMovements")
    throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
  }
};

export const fetchInventoryHistory = async () => {
  const session = await verifySession();
  if (!session) return null;

  const userRole = session?.role;

  try {
    const response = await api.get("/inventario/bitacora",{
        data: {
            userRole: userRole
        }
    }
    );
    return response.data; 
  } catch (error) {
    throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
  }
};

export const postInvetoryMovements = async (obj) => {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //recogemos propiedades
  const idProducto = obj.id;
  const tipoMovimiento = obj.tipoMovimiento;
  const cantidad = obj.cantidad;
  const motivo = obj.motivo;

  console.log({obj});
  try {
    const response = await api.post("/inventario/movimientos",{
        idProducto: idProducto,
        tipoMovimiento: tipoMovimiento,
        cantidad: cantidad,
        motivo: motivo,
        idUsuario: userId,
        userRole: userRole
    }
    );
    return response.data; 
  } catch (error) {
    console.log("error en fetchInventoryMovements")
    throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
  }
}
