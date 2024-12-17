import { FastifyReply, FastifyRequest } from 'fastify';
import session from '../services/session';

declare module 'fastify' {
	interface FastifyRequest {
		userId?: string;
	}
}

export async function sessionAuth(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const token = request.headers.authorization?.split(' ')[1];

	if (!token) {
		reply.unauthorized('Unauthorized');
		return;
	}

	const userId = await session.getUserIdFromToken(token);

	if (!userId) {
		reply.unauthorized('Unauthorized');
		return;
	}

	request.userId = userId;
}

export async function optionalSessionAuth(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const token = request.headers.authorization?.split(' ')[1];

	if (!token) {
		return;
	}

	const userId = await session.getUserIdFromToken(token);

	if (!userId) {
		return;
	}

	request.userId = userId;
}
