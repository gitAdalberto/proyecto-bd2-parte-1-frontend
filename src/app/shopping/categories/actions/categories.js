"use server";
import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";

export const createCategory = async(category) => {
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userId = session?.userId;
    const userRole = session?.role;

    //recogemos propiedades
    const nombre = category.nombre;
    const descripcion = category.descripcion;
    
    try {
        const response = await api.post('/categorias', {
            nombre: nombre,
            descripcion: descripcion,
            estadoCategoria: 1,
            userRole: userRole
        });
        return { success: true, data: response?.data, status: response?.status };
    } catch (error) {
        return {
            success: false,
            data: err.response?.data,
            status: err.response?.status,
        };
    }
};

export const fetchCategories = async () => {
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;

    //fetcth
    try {
        const response = await api.get("/categorias",{
            data: {
                userRole: userRole
            }
        });
        return { success: true, data: response.data}
    } catch (error) {
        return { success: false, data: error.response?.data }
    }
}

export const deleteCategory = async (id) => {
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;

    //fetch
    try {
        const response = await api.delete(`/categorias/${id}`,{
            data:{
                userRole: userRole
            }
        });
        return { success: true, data: response.data}
    } catch (error) {
        return { success: false, data: error.response?.data }
    }
}