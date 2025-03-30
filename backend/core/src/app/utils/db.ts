import { PrismaClient } from '@prisma/client';
import type { FastifyRequest } from 'fastify';
import { requestUserId } from './request';

export const prisma = new PrismaClient();

export function getUserProfileFromRequest(request: FastifyRequest) {
	const userId = requestUserId(request);
	return prisma.userProfile.findUnique({ where: { userId } });
}
