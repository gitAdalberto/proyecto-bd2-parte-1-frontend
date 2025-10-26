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

export const postProduct = async (product) => {
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;

    //recogemos las propiedades
    const codigoProducto = product.codigoProducto;
    const nombre = product.nombre;
    const descripcion = product.descripcion;
    const precioVenta = product.precioVenta;
    const precioCosto = product.precioCosto;
    const estadoProducto = 1;

    if (!precioVenta || !precioCosto) {
        throw new Error("Precio Venta o Precio Costo Vacio");
    }

    try {
        const response = await api.post('/productos',{
            codigoProducto: codigoProducto,
            nombre: nombre,
            descripcion: descripcion,
            precioVenta: precioVenta,
            precioCosto: precioCosto,
            estadoProducto: estadoProducto,
            userRole: userRole
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
    }
}

export const deleteProduct = async (id) => {
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;
    const productId = parseInt(id);
    //fetch
    try {
        const response = await api.delete(`/productos/${productId}`,{
            data:{
                userRole: userRole
            }
        });
        return response.data
    } catch (error) {
        throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
    }
}

export const putProduct = async (product) =>{
    //Verificamos la sesion
    const session = await verifySession();
    if (!session) return null;

    //recogemos el rol y id de la session
    const userRole = session?.role;

    //recogemos las propiedades
    const productId = parseInt(product.id);
    const codigoProducto = product.codigoProducto;
    const nombre = product.nombre;
    const descripcion = product.descripcion;
    const precioVenta = product.precioVenta;
    const precioCosto = product.precioCosto;
    const estadoProducto = 1;

    if (!precioVenta || !precioCosto) {
        throw new Error("Precio Venta o Precio Costo Vacio");
    }

    try {
        const response = await api.put(`/productos/${productId}`,{
            codigoProducto: codigoProducto,
            nombre: nombre,
            descripcion: descripcion,
            precioVenta: precioVenta,
            precioCosto: precioCosto,
            estadoProducto: estadoProducto,
            userRole: userRole
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.mensaje || "Ha ocurrido un error");
    }
}