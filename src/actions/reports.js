"use server";
import { verifySession } from "@/app/lib/dal"
import api from "@/utils/api";
import { redirect } from "next/navigation";

export const getLastAccess = async () => {
    const session = await verifySession();
    if (!session) return null;

    const userId = session?.userId;
    const userRole = session?.role;

    if (userRole !== "admin") redirect("/dashboard");

    try {
        const response = await api.get("/ultimaconexion",{
            data: {
                userRole: userRole
            }
        });
        return { success: true, data: response?.data };
    } catch (err) {
        return { success: false, data: err.response?.data };
    }
}


export const getAvgTime = async () => {
    const session = await verifySession();
    if (!session) return null;

    const userId = session?.userId;
    const userRole = session?.role;

    if (userRole !== "admin") redirect("/dashboard");

    try {
        const response = await api.post("/tiemposUsuarios",{
            data: {
                userRole: userRole
            }
        });
        return { success: true, data: response?.data };
    } catch (err) {
        return { success: false, data: err.response?.data };
    }
}

export const getFilterAccess = async (usuario, nuevoEstado, accion, fechaInicio, fechaFin) => {
    
    const session = await verifySession();
    if (!session) return null;

    const userId = session?.userId;
    const userRole = session?.role;

    if (userRole !== "admin") redirect("/dashboard");
    try {
        const response = await api.post("/filtrarAccesos",{
            
                userRole: userRole,
                usuario: usuario,
                nuevoEstado: nuevoEstado,
                fechaInicio: fechaInicio,
                fechaFin: fechaFin,
                accion: accion
            
        });
        return { success: true, data: response?.data };
    } catch (err) {
        return { success: false, data: err.response?.data };
    }
}

