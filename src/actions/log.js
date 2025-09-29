import api from "@/utils/api"

export const getLogs = async () => {
    try {
        const response = await api.get("/log");
        return   response.data
    } catch (err) {
        return  err.response?.data 
    }
}