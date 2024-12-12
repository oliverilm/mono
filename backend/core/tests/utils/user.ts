import { TEST_EMAIL } from "../integration-init";
import { prisma } from "../../src/app/utils/db";

export async function getTestUserProfile() {
    return prisma.userProfile.findFirst({ where: { user: { email: TEST_EMAIL} }});
}