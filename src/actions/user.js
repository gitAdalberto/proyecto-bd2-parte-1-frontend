"use server";

import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getSessionUser = cache(async () => {
  //llamar a la funcion de verificacion
  const session = await verifySession();

  //retornar nulo si no hay sesion;
  if (!session) return null;
  console.log(session);
});

export const getUsers = async () => {
  //leer la sesion
  const session = await verifySession();
  if (!session) return null;

  //obtener el rol
  const userRole = session?.role;

  //redirigir si no es admin
  if (userRole !== "admin") {
    redirect("/dashboard");
  }

  //hacemos fetch
  try {
    const response = await api.post("/usuarios/list", {
      userRole: userRole,
    });
    return { success: true, data: response?.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  }
};

export const createUser = async (user, password1, password2, email, role) => {
  //Verificamos la sesion
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //redirigir si no es admin
  if (userRole !== "admin") {
    redirect("/dashboard");
  }

  //hacemos fetch
  try {
    const response = await api.post("/usuarios", {
      usuario: user,
      contrasenia1: password1,
      contrasenia2: password2,
      correo: email,
      rol: role,
      userRole: userRole,
      userId: userId,
    });
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  }
};

export const changeState = async (id, newState) => {
  //Verificamos la sesion
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //redirigir si no es admin
  if (userRole !== "admin") {
    redirect("/dashboard");
  }

  //fetch
  try {
    const response = await api.patch(`/usuarios/estado/${id}`,{
      nuevoEstado: newState,
      userId: userId,
      userRole: userRole
    })
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  }
};

export const deleteUser = async (id) => {
  //Verificamos la sesion
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;
  console.log({ userId, userRole});
  //redirigir si no es admin
  if (userRole !== "admin") {
    redirect("/dashboard");
  }

  //fetch
  try {
    const response = await api.delete(`/usuarios/${id}`,{
      data: {
        userId: userId,
        userRole: userRole
      }
    })
    return { success: true, data: response.data };
  } catch (err) {
    return { success: false, data: err.response?.data };
  }
};

export const getCurrentUserName = async () => {
  //Verificamos la sesion
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;
  console.log("current username")
  console.log({ userId, userRole })
  //fetch
  try {
    const response = await api.post(`/usuarios/${userId}`, {
      userRole: userRole
    });
    return { success: true, username: response.data?.usuario }
  } catch (err) {
    console.log(err.response?.data );
    return { success: false, username: "desconocido" }
  }
}

export const handleTitle = async (title) => {
  const result = await getCurrentUserName();
  const date = new Date();

  const current_date =
    date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
  const current_time =
    date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

  const dateString = "Fecha y hora: " + current_date + " " + current_time;

  const finalString =
    "Titulo: " + title + " " + dateString + " Usuario: " + result.username;

  return finalString;
};