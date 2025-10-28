import Fastify, { FastifyInstance } from 'fastify';
import { beforeAll, beforeEach, vi, vitest } from "vitest";
import { app } from '../src/app/app';
import { ClubService } from '../src/app/services/club';
import { AuthenticationPayload, UserService } from '../src/app/services/user';
import { prisma } from '../src/app/utils/db';

export let testServer: FastifyInstance;

// Mutex to prevent concurrent database operations
let dbMutex = Promise.resolve();

beforeAll(async () => {
    testServer = Fastify({
        logger: true,
    });
    testServer.register(app);
   
})

async function cleanDb() {
    try {
        // Disable foreign key checks temporarily
        await prisma.$executeRawUnsafe('SET session_replication_role = replica;');
        
        // Delete all data from all tables
        await prisma.$executeRawUnsafe('DELETE FROM "Session"');
        await prisma.$executeRawUnsafe('DELETE FROM "Competitor"');
        await prisma.$executeRawUnsafe('DELETE FROM "Category"');
        await prisma.$executeRawUnsafe('DELETE FROM "Invitation"');
        await prisma.$executeRawUnsafe('DELETE FROM "Club"');
        await prisma.$executeRawUnsafe('DELETE FROM "Competition"');
        await prisma.$executeRawUnsafe('DELETE FROM "UserProfile"');
        await prisma.$executeRawUnsafe('DELETE FROM "User"');
        
        // Re-enable foreign key checks
        await prisma.$executeRawUnsafe('SET session_replication_role = DEFAULT;');
        
        // Small delay to ensure cleanup is complete
        await new Promise(resolve => setTimeout(resolve, 10));
    } catch (error) {
        console.error('Database cleanup failed:', error);
        // Re-enable foreign key checks even if cleanup failed
        await prisma.$executeRawUnsafe('SET session_replication_role = DEFAULT;');
        throw error;
    }
}

beforeEach(async () => {
    // Use mutex to prevent concurrent database operations
    dbMutex = dbMutex.then(async () => {
        // Clean the database before each test
        await cleanDb();
        
        // Clear all mocks
        vitest.clearAllMocks();
        vi.clearAllMocks();

        
        // Recreate the server for clean state
        testServer = Fastify({
            logger: false,
        });
        testServer.register(app);
        
        // Wait for server to be ready
        await testServer.ready();
    });
    
    await dbMutex;
});


export const TEST_EMAIL = "testing@testing.com"
export const TEST_PASSWORD = "testPassword"
export const TEST_CLUB_NAME = "test_club"

// Generate unique email for each test to avoid conflicts
function generateUniqueEmail(): string {
    return `testing-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@testing.com`;
}

// Generate unique club name for each test to avoid conflicts
function generateUniqueClubName(): string {
    return `test_club_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

type AddonFunction = "withClub"

const addonFunctions: Record<AddonFunction, (createdUserResponseWithToken: AuthenticationPayload) => Promise<void>> = {
    withClub: async (createdUserResponseWithToken: AuthenticationPayload) => {
        if (createdUserResponseWithToken.profile.userId) {
            await ClubService.create({country: "EE", name: generateUniqueClubName(), userId: createdUserResponseWithToken.profile.userId})
        }
    }
}

interface Overrides {
    email?: string,
    addons?: Partial<Record<AddonFunction, boolean>>
}

export async function registerTestUserAndRetrieveToken(override: Overrides = {}): Promise<string> {
    return (await createUserWithEmail(override)).token
}

export async function createUserWithEmail({ email, addons}: Overrides = {}) {
    // Use unique email if none provided
    const userEmail = email || generateUniqueEmail();
    
    const created = await UserService.createUser({ email: userEmail, password: TEST_PASSWORD})

    if (!created){ 
        throw new Error("Could not create user")
    }

    if (Object.entries(addons ?? {})?.length > 0) {
        for (const [addon, enabled] of Object.entries(addons ?? {})) {
            if (enabled && addonFunctions[addon as keyof typeof addonFunctions]) {
                await addonFunctions[addon as keyof typeof addonFunctions](created)
            }
        }
    }

    return created
}

