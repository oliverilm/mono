import { Search, SkipTake } from "@monorepo/utils";
import { addSkipTakeSearch, client } from "./client";

export function getPublicClubs(query: SkipTake & Search) {
    return client.get(addSkipTakeSearch("/public/clubs", query))
}

export function getPublicCompetitions(query: SkipTake & Search) {
    return client.get(addSkipTakeSearch("/public/competitions", query))
}

export function getPublicCamps(query: SkipTake & Search) {
    return client.get(addSkipTakeSearch("/public/camps", query))
}