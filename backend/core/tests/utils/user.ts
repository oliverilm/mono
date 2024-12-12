import { PrismaClient } from "@prisma/client";
import { TEST_EMAIL } from "../integration-init";

const prisma = new PrismaClient()

export async function getTestUserProfile() {
    return prisma.userProfile.findFirst({ where: { user: { email: TEST_EMAIL} }});
}