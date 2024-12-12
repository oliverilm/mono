import { Competition, PrismaClient } from "@prisma/client";
import club from "../../src/app/services/club";
import { TEST_CLUB_NAME, TEST_EMAIL, TEST_PASSWORD } from "../integration-init";
import { UserService } from "../../src/app/services/user";
import { slugifyString } from "../../src/app/utils/string";

const prisma = new PrismaClient()

export async function createTestClub() {
    const created = await UserService.createUser({ email: TEST_EMAIL, password: TEST_PASSWORD })
    if (!created?.profile.userId) {
        return null
    }
    return club.create({ country: "EE", name: TEST_CLUB_NAME, userId: created.profile.userId }) 
}

export async function createCompetitionWithName(name: string): Promise<Competition | null>  {
    const testClub = await createTestClub()
    if (!testClub) return null

    return prisma.competition.create({
        data: {
            clubName: testClub?.name,
            slug: slugifyString(name),
            name: name
        }
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
                slug: slugifyString(name),
                name: name
            }
        })
        competitions.push(competition)
    }
    return competitions
}
