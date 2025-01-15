import type { Session } from '@prisma/client';
import dayjs from 'dayjs';
import type { FastifyRequest } from 'fastify';
import { LRUCache } from 'lru-cache';
import { SessionService } from '../services/session';

const sessionCache = new LRUCache<string, Session>({
	max: 1000,
	ttl: 1000 * 60 * 5,
	updateAgeOnGet: true,
});

export function extractTokenFromHeader(request: FastifyRequest) {
	const token = request.headers.authorization?.split(' ')[1];
	return token;
}

export async function getValidSessionAndSaveToCache(token: string) {
	const cachedSession = sessionCache.get(token);

	if (cachedSession) {
		// maybe have to account for timezone
		const isValid = dayjs(cachedSession.expiresAt).isAfter(dayjs());

		if (!isValid) {
			sessionCache.delete(token);
			return null;
		}
		return cachedSession;
	}

	const userSession = await SessionService.getUserSessionFromToken(token);

	if (!userSession) {
		return null;
	}

	sessionCache.set(token, userSession);
	return userSession;
}
