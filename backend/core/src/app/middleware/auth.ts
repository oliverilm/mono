import { FastifyReply, FastifyRequest } from 'fastify';
import session from '../services/session';
import { LRUCache } from 'lru-cache';

declare module 'fastify' {
	interface FastifyRequest {
		userId?: string;
	}
}

const cache = new LRUCache<string, string>({
	max: 1000,
	ttl: 1000 * 60,
	updateAgeOnGet: true,
})

export function extractTokenFromHeader(request: FastifyRequest) {
	const token = request.headers.authorization?.split(' ')[1];
	return token;
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

	const cachedUserId = cache.get(token)
	if (cachedUserId) {
		// TODO: expiration date might have been eceeded
		// either, store the while session object in the cache or do something else
		request.userId = cachedUserId
		return;

	} else {
		const userId = await session.getUserIdFromToken(token);

		if (!userId) {
			reply.unauthorized('Unauthorized');
			return;
		}

		cache.set(token, userId);
		request.userId = userId;
	}
}

export async function optionalSessionAuth(
	request: FastifyRequest,
	reply: FastifyReply,
) {
	const token = extractTokenFromHeader(request);

	if (!token) {
		return;
	}

	const cachedUserId = cache.get(token)

	if (cachedUserId) {
		request.userId = cachedUserId
		return;
	}
	
	const userId = await session.getUserIdFromToken(token);
	if (!userId) {
		return;
	}

	request.userId = userId;
}
