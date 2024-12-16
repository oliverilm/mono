import { CreateCompetition, Search, SkipTake, ClubCreate, UpdateCompetition } from "@monorepo/utils";
import { addSkipTakeSearch, client } from "./client";
import { AxiosResponse } from "axios";

export function getPublicClubs(query: SkipTake & Search): Promise<AxiosResponse<unknown[]>> {
    return client.get(addSkipTakeSearch("/public/clubs", query))
}

export function createClub(data: ClubCreate) {
    return client.post("/user/club/create", data)
}

export interface CompetitionListItem {
    id: string
    name: string
    slug: string
    clubName: string
    isPublished: boolean
    isArchived: boolean
    description: string
    startingAt: Date
    location: string
    additionalInfo: JSON
    createdAt: string
    updatedAt: string
}
  
export function getPublicCompetitions(query: SkipTake & Search): Promise<AxiosResponse<CompetitionListItem[]>> {
    return client.get(addSkipTakeSearch("/public/competitions", query))
}

export function createCompetition(data: CreateCompetition): Promise<AxiosResponse<CompetitionListItem>> {
    return client.post("/user/competition/create", data)
}

export function updateCompetition(slug: string, data: UpdateCompetition): Promise<AxiosResponse<CompetitionListItem>> {
    return client.patch(`/user/competitions/${slug}`, data)
}

export function getPrivateCompetitions(): Promise<AxiosResponse<CompetitionListItem[]>> {
    return client.get("/user/competitions/private")
}

export function getPublicCamps(query: SkipTake & Search) {
    return client.get(addSkipTakeSearch("/public/camps", query))
}

export function getCompetition(competitionSlug?: string) {
    if (!competitionSlug) return Promise.resolve(null)
    return client.get(`/public/competitions/${competitionSlug}`)
}

export interface CompetitionMetadata {
    competitionAdmins: {
        id: number,
        userId: string,
        email: string
        role: string
    }[]
}

export function getCompetitionMetadata(competitionSlug?: string): Promise<AxiosResponse<CompetitionMetadata> | null> {
    if (!competitionSlug) return Promise.resolve(null)
    return client.get(`/public/competitions/${competitionSlug}/metadata`)
}