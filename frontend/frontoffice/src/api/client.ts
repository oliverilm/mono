import axios from "axios"
import { LS_TOKEN_KEY } from "../constants"
import { Search, SkipTake } from "@monorepo/utils"

export const client = axios.create({
    baseURL: "http://localhost:3000"
})

client.interceptors.request.use((config) => {
    const token = localStorage.getItem(LS_TOKEN_KEY)
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

export function addSkipTakeSearch(url: string, query: SkipTake & Search) {
    const { skip, take, search } = query
    let str = "?"
    if (skip) str += `skip=${skip}&`
    if (take) str += `take=${take}&`
    if (search) str += `search=${search}`

    if (skip || take || search) return url + str
    return url
}