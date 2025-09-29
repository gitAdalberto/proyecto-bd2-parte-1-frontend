"use server";

import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";

export const getStudents = async () => {
  //leer la sesion
  const session = await verifySession();
  if (!session) return null;

  //obtener el rol
  const role = session?.role;
  let response = [];
  //hacemos fetch
  try {
    response = await api.post("/estudiantes/list", {
      data: { userRole: role },
    });
    return response.data;
  } catch (err) {
    return err?.response;
  }
};

export const createStudent = async (formData) => {
  //Verificamos la sesion
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;


  //obtener datos
  const nombre = formData.get("nombre");
  const apellido = formData.get("apellido");
  const carne = formData.get("carne");
  const correo = formData.get("correo");
  const telefono = formData.get("telefono");

  try {
    const response = await api.post("/estudiantes", {
      nombre: nombre,
      apellido: apellido,
      carne: carne,
      correo: correo,
      telefono: telefono,
      userId: userId,
      userRole: userRole,
    });
    console.log("hola mundo");
    return { success: true, data: response?.data, status: response?.status };
  } catch (err) {
    console.log("mensaje", err.response?.data);
    return {
      success: false,
      data: err.response?.data,
      status: err.response?.status,
    };
  }
};

export const deleteStudent = async (studentId) => {
  //Verificamos la sesion
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //verificamos rol de la sesion
  //solamente el admin puede editar o eliminar
  if (userRole === "secretaria") {
    return { success: false, data: { mensaje: "Accion denegada" }}
  }

  //hacemos fetch
  try {
    const response = await api.delete(`/estudiantes/${studentId}`, {
      data: {
        userId: userId,
        userRole: userRole,
      },
    });
    return { success: true, data: response.data };
  } catch (err) {
    console.log("valor de response.data:", err.response?.data);
    return {
      success: false,
      data: err.response?.data,
      status: err.response?.status,
    };
  }
};

export const editStudent = async (
  id,
  nombre,
  apellido,
  carne,
  correo,
  telefono
) => {
  //Verificamos la sesion
  const session = await verifySession();
  if (!session) return null;

  //recogemos el rol y id de la session
  const userId = session?.userId;
  const userRole = session?.role;

  //verificamos rol de la sesion
  //solamente el admin puede editar o eliminar
  if (userRole === "secretaria") {
    return { success: false, data: { mensaje: "Accion denegada" }}
  }

  //hacemos fetch
  console.log("Resultado de editar estudiante id:", id);
  try {
    const response = await api.put(`/estudiantes/${id}`,{
      nombre: nombre,
      apellido: apellido,
      carne: carne,
      correo: correo,
      telefono: telefono,
      userId: userId,
      userRole: userRole,
    })
    console.log(response.data);
    return { success: true, data: response?.data, status: response?.status };
  } catch (err) {
    console.log("mensaje", err.response?.data);
    return {
      success: false,
      data: err.response?.data,
      status: err.response?.status,
    };
  }
};
