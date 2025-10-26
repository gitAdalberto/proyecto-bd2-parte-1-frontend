"use server"
import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";

export const fetchProducts = async () =>{
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;

    try {
        const response = await api.get('/productos',{
            data:{
                userRole: userRole
            }
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
    }
};

