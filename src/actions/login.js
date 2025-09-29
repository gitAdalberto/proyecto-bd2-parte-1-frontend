"use server";

import { verifySession } from "@/app/lib/dal";
import { createSession, deleteSession } from "@/app/lib/session";
import api from "@/utils/api";
import { redirect } from "next/navigation";

export const login = async (formData) => {
  //obtenemos credenciales
  const user = formData.get("user");
  const password = formData.get("password");
  //validamos credenciales???
  //hacemos fetch a express

  try {
    const response = await api.post("/login", {
      usuario: user,
      contraseña: password
    });
    //creamos sesion del usuario con su respectivo id
    await createSession({
      userId: response.data?.idUser,
      role: response.data?.role,
    });
    
    return  { success: true, data: response?.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  } 
  
};

export const verifyLogout = async () => {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //fetch
  try {
    const response = api.post(`/logout/${userId}`,{
      data: {
        userRole: userRole
      }
    })
    return  { success: true, data: response?.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  } 
}

export const logout = async () => {
  await deleteSession();
  redirect("/login");
};

export const changePassword = async (formData) => {
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  const password1 = formData.get("password1");
  const password2 = formData.get("password2");

  console.log("Cambiar contraseña");
  //hacemos el fetch
  try {
    const response = await api.patch(`/usuarios/${userId}`, {
      contrasenia1: password1,
      contrasenia2: password2,
      userRole: userRole,
    });

    return { success: true, data: response?.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  }
};
