import { CreateCompetition, Search, SkipTake, ClubCreate } from "@monorepo/utils";
import { addSkipTakeSearch, client } from "./client";
import { AxiosResponse } from "axios";

export function getPublicClubs(query: SkipTake & Search) {
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

export function getPublicCamps(query: SkipTake & Search) {
    return client.get(addSkipTakeSearch("/public/camps", query))
}