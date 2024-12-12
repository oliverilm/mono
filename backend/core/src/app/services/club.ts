import { Club, PrismaClient } from "@prisma/client";
import { slugifyString } from "../utils/string";
import { SkipTake } from "../utils/types";

const prisma = new PrismaClient()

export interface ClubCreate {
    name: string;
    country: string;
}

export type SlugOrId = {
    id: string
} | { slug: string }

class ClubService {
    async create({ name, country, userId }: ClubCreate & { userId: string }): Promise<Club | null> {
        // PS: this action should require a subscription later on
        // if user is subscribed then allow them to create a club

        // the price should be dependant on the avg hosting bill in zone or something like that 
        
        const user = await prisma.userProfile.findUnique({ 
            where: {
                userId
            }, 
        })

        if (user?.clubId !== null) {
            throw new Error("User already belongs to a club")
        }

        
        const slug = slugifyString(name)

        if (!slug) {
            throw new Error("name must contain letters and or numbers")
        }

        const club = await prisma.club.create({
            data: {
                name,
                country,
                slug,
                description: "",
                clubMetadata: { create: {}}
            }
        })
        if (club) {
            await prisma.userProfile.update({ 
                where: {
                    userId
                }, 
                data: { 
                    clubId: club.id 
                }
            })
        }
        return club || null
    }

    getClubByIdOrSlug(slugOrId: SlugOrId ): Promise<Club | null> | null {
        if ("id" in slugOrId) {
            return prisma.club.findUnique({
                where: {
                    id: slugOrId.id
                }
            })
        }
        if ("slug" in slugOrId) {
            return prisma.club.findFirst({
                where: {
                    slug: slugOrId.slug
                }
            })
        }
        return null
    }

    getClubList({ take = 25, skip = 0 }: SkipTake): Promise<Club[]> {
        return prisma.club.findMany({
            take: Number(take),
            skip: Number(skip),
            orderBy: {
                id: "desc"
            }
        })
    }
}

export default new ClubService()