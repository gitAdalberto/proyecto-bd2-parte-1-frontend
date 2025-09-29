import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type":"application/json"
    },
});

api.interceptors.response.use(
  res => res,
  err => Promise.reject(err)
);

export default api;