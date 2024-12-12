import { UserProfile } from "@prisma/client"
import { slugifyString } from "../utils/string"
import { convertSkipTake } from "../utils/object"
import { tryHandleKnownErrors } from "../utils/error"
import { Search, SkipTake } from "../schemas/common"
import { CreateCompetition } from "../schemas/competition"
import { prisma } from "../utils/db"



export interface UpdateCompetition {
    name?: string
    isPublished?: boolean,
    isArchived?: boolean
}

async function createCompetition({data, userProfile}: { data: CreateCompetition, userProfile: UserProfile}) {
    const slug = slugifyString(data.name)
    
    if (!userProfile.clubId) {
        throw new Error("User does not belong to a club")
    }

    const club = await prisma.club.findUnique({
        where: {
            id: userProfile.clubId
        },
        select: {
            name: true
        }
    })

    if (!club) {
        throw new Error("Invalid club")
    }

    const competition = await prisma.competition.create({
        data: {
            slug,
            clubName: club?.name,
            ...data,
        }
    })

    if (!competition) {
        throw new Error("Something went wrong")
    }

    return competition
}

async function updateCompetition(competitionSlug: string, data: UpdateCompetition ) {
    const updatableData: UpdateCompetition & { slug?: string } = {}
    Object.entries(data).forEach(([key, value]) => {
        if (key === "name") {
            updatableData["slug"] = slugifyString(value)
        }

        updatableData[key as keyof UpdateCompetition] = value
    })

    try {
        return prisma.competition.update({
            where: {
                slug: competitionSlug
            },
            data: updatableData
        })
    } catch (error) {
        tryHandleKnownErrors(error as Error)
    }
    
}

async function list({search, ...skipTake}: SkipTake & Search) {
    return prisma.competition.findMany({
       ...(search ? { where: {
            name: {
                contains: search
            }
        }} : {}),
        ...convertSkipTake(skipTake)
    })
}

export const CompetitionService = {
    createCompetition,
    list,
    updateCompetition,
}