import { AxiosResponse } from "axios";
import { client } from "./client";
import { LoginCredentials, NationalId, UserPatch } from "@monorepo/utils"

export interface AuthResponse {
    profile: Profile
    token: string
  }
  
export interface Profile {
    id: string
    firstName: string | null
    lastName: string | null
    nationalId: string | null
    nationalIdType: NationalId | null // TODO
    dateOfBirth: string | null
    sex: string
    userId: string
    clubId: string | null
    belt: string | null
    createdAt: string
    updatedAt: string
}
  

export async function login(data: LoginCredentials): Promise<AxiosResponse<AuthResponse>> {
    return client.post("/public/auth/login", data)
}

export async function createUser(data: LoginCredentials): Promise<AxiosResponse<AuthResponse>> {
    return client.post("/public/auth/register", data)
}

export async function getProfile(): Promise<AxiosResponse<Profile>> {
    return client.get("/user/profile")
}

export async function updateUser(data: UserPatch): Promise<AxiosResponse<Profile>> {
    return client.patch("/user/profile", data)
}