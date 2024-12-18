import { Competition } from "@prisma/client";
import { ClubService } from "../../src/app/services/club";
import { TEST_CLUB_NAME, TEST_EMAIL, TEST_PASSWORD } from "../integration-init";
import { UserService } from "../../src/app/services/user";
import { slugifyString } from "../../src/app/utils/string";
import { prisma } from "../../src/app/utils/db";
import { CompetitionService } from "../../src/app/services/competition";
import { getTestUserProfile } from "./user";

export async function createTestClub() {
    const existing = await prisma.user.findUnique({ where: { email: TEST_EMAIL } })
    let userId;
    if (existing) {
        userId = existing.id
    } else {
        const created = await UserService.createUser({ email: TEST_EMAIL, password: TEST_PASSWORD })
        userId = created?.profile.userId
    }
    if (!userId) {
        return null
    }
    
    const existingClub = await prisma.club.findFirst({ where: { name: TEST_CLUB_NAME } })
    if (existingClub) {
        return existingClub
    }
    return ClubService.create({ country: "EE", name: TEST_CLUB_NAME, userId }) 
}

export async function createCompetitionWithName(name: string): Promise<Competition | null>  {
    const testClub = await createTestClub()
    const userProfile = await getTestUserProfile()
    if (!testClub || !userProfile) return null

    return CompetitionService.createCompetition({
        data: {
            name
        },
        userProfile
    })
}

export async function createManyCompetitionsWithNames(names: string[]): Promise<Competition[] | null> {
    const testClub = await createTestClub()
    if (!testClub) return null

    const competitions: Competition[] = []
    for(const name of names) {
        const competition = await prisma.competition.create({
            data: {
                clubName: testClub?.name,
                isPublished: true,
                slug: slugifyString(name),
                name: name
            }
        })
        competitions.push(competition)
    }
    return competitions
}
