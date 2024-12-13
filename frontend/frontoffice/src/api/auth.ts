import { client } from "./client";

export interface LoginCreateData { email: string, password: string }

export async function login(data: LoginCreateData) {
    return client.post("/public/login", data)
}

export async function createUser(data: LoginCreateData) {
    return client.post("/public/register", data)
}

export async function getProfile() {
    return client.get("/user/profile")
}