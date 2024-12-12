import { PrismaClient, UserProfile } from "@prisma/client"
import { slugifyString } from "../utils/string"
import { SearchQueryParam, SkipTake } from "../utils/types"
import { convertSkipTake } from "../utils/object"
import { tryHandleKnownErrors } from "../utils/error"

export interface CreateCompetition {
    name: string,
}

export interface UpdateCompetition {
    name?: string
    isPublished?: boolean,
    isArchived?: boolean
}

const prisma = new PrismaClient()

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

async function list({search, ...skipTake}: SkipTake & SearchQueryParam) {
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