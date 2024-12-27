import { PrismaClient } from '@prisma/client';
import type { FastifyRequest } from 'fastify';
import { getAssertedUserIdFromRequest } from './request';

export const prisma = new PrismaClient();

export function getUserProfileFromRequest(request: FastifyRequest) {
	const userId = getAssertedUserIdFromRequest(request);
	return prisma.userProfile.findUnique({ where: { userId } });
}
