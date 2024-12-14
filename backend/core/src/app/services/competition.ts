import { CompetitionRole, UserProfile } from "@prisma/client"
import { slugifyString } from "../utils/string"
import { convertSkipTake } from "../utils/object"
import { tryHandleKnownErrors } from "../utils/error"
import { prisma } from "../utils/db"
import { CreateCompetition, Search, SkipTake } from "@monorepo/utils"
import { LRUCache } from "lru-cache"

const cache = new LRUCache({ 
    ttl: 1000 * 60 * 60, 
    max: 1000
})

export interface UpdateCompetition {
    name?: string
    isPublished?: boolean,
    isArchived?: boolean
}

export const CompetitionService = {

    createCompetitionAdmin: async function ( data: {competitionId: string, userId: string, role: CompetitionRole}, competitionAdminId: string) {
        const admin = await prisma.competitionAdmin.findFirst({
            where: {
                userId: competitionAdminId,
                competitionId: data.competitionId,
            },
            select: {
                role: true
            }
        })

        const isAdmin = admin?.role === "OWNER"

        if (!isAdmin) {
            throw new Error("You are not an admin of this competition")
        }

        return prisma.competitionAdmin.create({ data })

    },

    isAdmin: async function (competitionId: string, userId: string) {
        if (cache.get(`${competitionId}-${userId}`)) {
            return true
        }

        return (await prisma.competitionAdmin.count({
            where: {
                competitionId,
                userId
            }
        })) > 0
    },

    getCompetitionIdFromSlug: async function (competitionSlug: string) {

        if (cache.get(competitionSlug)) {
            return cache.get(competitionSlug) as string
        }

        const competition = await prisma.competition.findUnique({
            where: {
                slug: competitionSlug
            },
            select: {
                id: true
            }
        })

        if (!competition) {
            throw new Error("Competition not found")
        }

        cache.set(competitionSlug, competition.id)
        return competition.id
    },
    getMetadata: async function (competitionSlug: string, userId?: string) {
        if (!userId) return {}

        const competitionId = await this.getCompetitionIdFromSlug(competitionSlug)
        const isAdmin = await this.isAdmin(competitionId, userId)

        if (isAdmin) {
            const admins = await prisma.competitionAdmin.findMany({
                where: {
                    competitionId
                },
                select: {
                    user: {
                        select: {
                            email: true,
                        }
                    },
                    role: true
                }
            })
            return {
                competitionAdmins: admins.map(admin => {
                    return {
                        email: admin.user.email,
                        role: admin.role
                    }
                })
            }
        }

        return {
            competitionAdmins: []
        }
    },
    get: async function (competitionSlug: string) {
        return prisma.competition.findUnique({
            where: {
                slug: competitionSlug
            }
        })
    },

    createCompetition: async function ({data, userProfile}: { data: CreateCompetition, userProfile: UserProfile}) {
        const slug = slugifyString(data.name)

        if (!userProfile.userId) {
            throw new Error("User not found")
        }
        
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

                competitionAdmins: {
                    create: {
                        userId: userProfile.userId,
                        role: CompetitionRole.OWNER
                    }
                }
            }
        })
    
        if (!competition) {
            throw new Error("Something went wrong")
        }
    
        return competition
    },

    list: async function ({search, ...skipTake}: SkipTake & Search) {
        return prisma.competition.findMany({
            where: {
                isArchived: false,
                isPublished: true,
                ...(search ? { name: {
                    contains: search
                }} : {})
            },
            ...convertSkipTake(skipTake)
        })
    },

    updateCompetition: async function (competitionSlug: string, data: UpdateCompetition ) {
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
    },
}