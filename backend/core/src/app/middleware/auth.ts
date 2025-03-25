import type { FastifyReply, FastifyRequest } from 'fastify';
import { prisma } from '../utils/db';
import {
	extractTokenFromHeader,
	getValidSessionAndSaveToCache,
} from './helpers';

declare module 'fastify' {
	interface FastifyRequest {
		userId?: string;
	}
}

export async function sessionAuth(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const token = extractTokenFromHeader(request);

	if (!token) {
		reply.unauthorized('Unauthorized');
		return;
	}

	const activeSession = await getValidSessionAndSaveToCache(token);

	if (!activeSession) {
		reply.unauthorized('Unauthorized');
		return;
	}

	request.userId = activeSession.userId;
}

export async function optionalSessionAuth(request: FastifyRequest) {
	const token = extractTokenFromHeader(request);

	if (!token) {
		return;
	}

	const activeSession = await getValidSessionAndSaveToCache(token);

	if (!activeSession) {
		return;
	}

	request.userId = activeSession.userId;
}

export async function adminSessionAuth(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	await sessionAuth(request, reply);

	if (!request.userId) {
		reply.unauthorized('Unauthorized');
	}

	const user = await prisma.user.findFirst({
		where: {
			id: request.userId,
		},
		select: {
			isAdmin: true,
		},
	});

	if (!user?.isAdmin) {
		reply.unauthorized('Unauthorized');
	}

	// else user is admin and continue
}
