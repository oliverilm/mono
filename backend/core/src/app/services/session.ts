import { PrismaClient, Session } from "@prisma/client";
import dayjs from "dayjs";
import crypto from "crypto";

const prisma = new PrismaClient()

class SessionService {
    createSession(userId: string): Promise<Session> {
        return prisma.session.create({
            data: {
                expiresAt: dayjs().add(3, 'day').toDate(),
                token: crypto.randomBytes(32).toString('base64'),
                userId,
            }
        });
    }

    getSession(token: string): Promise<Session | null> {
        return prisma.session.findFirst({
            where: {
                token,
                expiresAt: {
                    gt: new Date()
                }
            }
        })
    }

    async getUserIdFromToken(token: string): Promise<string | null> {
        const session = await prisma.session.findFirst({
            select: {
                userId: true
            },
            where: {
                token,
                expiresAt: {
                    gt: new Date()
                }
            }
        })

        if (!session) {
            return null
        }

        return session.userId
    }

}

export default new SessionService();