import axios from "axios"

export const client = axios.create({
    baseURL: "http://localhost:3000"
})

client.interceptors.request.use((config) => {
    const token = localStorage.getItem("token")
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

client.interceptors.response.use((data) => data, (error) => {
    // TODO: handle error
    console.log(error)

    throw error
})