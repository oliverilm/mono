import Fastify, { FastifyInstance } from 'fastify';
import { app } from '../src/app/app';
import { UserService, AuthenticationPayload } from '../src/app/services/user';
import { ClubService } from '../src/app/services/club';
import { beforeEach } from "vitest"
import { prisma } from '../src/app/utils/db';

export let testServer: FastifyInstance;

async function cleanDb() {
    const tables = await prisma.$queryRaw`
        SELECT table_name
        FROM
        information_schema.tables
        WHERE table_schema NOT IN ('pg_catalog', 'information_schema')
        AND table_type='BASE TABLE'
    ` as { table_name: string }[]

    const tableNames = tables.reduce((acc, table) => {
        if (table.table_name.startsWith("_")) return acc
        return [...acc, table.table_name]
    }, [] as string[]) 

    return prisma.$executeRawUnsafe(`TRUNCATE ${tableNames.map((name) => `public."${name}"`).join(", ")} CASCADE`)
}



beforeEach(async () => {
    await cleanDb().then(() => {
        testServer = Fastify();
        testServer.register(app);
    })
});


export const TEST_EMAIL = "testing@testing.com"
export const TEST_PASSWORD = "testPassword"
export const TEST_CLUB_NAME = "test_club"

type AddonFunction = "withClub"

const addonFunctions: Record<AddonFunction, (createdUserResponseWithToken: AuthenticationPayload) => Promise<void>> = {
    withClub: async (createdUserResponseWithToken: AuthenticationPayload) => {
        if (createdUserResponseWithToken.profile.userId) {
            await ClubService.create({country: "EE", name: TEST_CLUB_NAME, userId: createdUserResponseWithToken.profile.userId})
        }
    }
}

interface Overrides {
    email?: string,
    addons?: Partial<Record<AddonFunction, boolean>>
}

export async function registerTestUserAndRetrieveToken(override: Overrides = {}): Promise<string> {
    const created = await UserService.createUser({ email: TEST_EMAIL, password: TEST_PASSWORD, ...override})
    if (!created) return ""

    if (Object.entries(override?.addons ?? {}).length > 0) {
        for (const [addon, enabled] of Object.entries(override.addons ?? {})) {
            if (enabled && addonFunctions[addon as keyof typeof addonFunctions]) {
                await addonFunctions[addon as keyof typeof addonFunctions](created)
            }
        }
    }

    return created.token
}

