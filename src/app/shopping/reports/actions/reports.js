"use server"
import { verifySession } from "@/app/lib/dal";
import api from "@/utils/api";

export const fetchSalesReport = async (obj) =>{
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;
    console.log(obj.queryKey[1]);
    const temp = obj.queryKey[1];
    
    const usuario = temp.usuario === '' ? null: temp.usuario;
    const categoria = temp.categoria === '' ? null: temp.categoria;
    const fechaInicio = temp.fechaInicio === ''? null: temp.fechaInicio.replace("T"," ") ;
    const fechaFin =  temp.fechaFin === ''? null: temp.fechaFin.replace("T"," ") ;

    try {
        const response = await api.post('/reporte/ventas',{
            userRole: userRole,
            usuario: usuario,
            categoria: categoria,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
    }
};


export const fetchStockReport = async () =>{
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;
    try {
        const response = await api.post('/reporte/stock/critico',{
            userRole: userRole
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
    }
};


export const fetchTopSalesReport = async (obj) =>{
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;
    console.log(obj.queryKey[1]);
    const temp = obj.queryKey[1];
    
    const categoria = temp.categoria;
    const fechaInicio = temp.fechaInicio.replace("T"," ") ;
    const fechaFin = temp.fechaFin.replace("T"," ") ;

    try {
        const response = await api.post('/reporte/ventas/top',{
            userRole: userRole,
            categoria: categoria,
            fechaInicio: fechaInicio,
            fechaFin: fechaFin
        });
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
    }
};

export const fetchIncomeReport = async (obj) =>{
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;
    console.log(obj.queryKey[1]);
    const temp = obj.queryKey[1];
    
    const year = parseInt(temp.year);

    try {
        const response = await api.post('/reporte/ingresos',{
            userRole: userRole,
            year: year
        });
        console.log(response.data)
        return response.data;
    } catch (error) {
        console.log(error)
        throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
    }
};