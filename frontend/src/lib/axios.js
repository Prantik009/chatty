import axios from "axios"

export const axiosInstance = axios.create({
    baseURL: "https://chatty-backend-d78v.onrender.com/api",
    withCredentials: true,
})