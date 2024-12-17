import { FastifyReply, FastifyRequest } from 'fastify';
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
	} else {
		request.userId = activeSession.userId;
	}
}
