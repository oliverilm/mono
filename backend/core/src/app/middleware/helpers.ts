import { Session } from "@prisma/client";
import dayjs from "dayjs";
import { FastifyRequest } from "fastify";
import { LRUCache } from "lru-cache";
import session from "../services/session";

const sessionCache = new LRUCache<string, Session>({
	max: 1000,
	ttl: 1000 * 60 * 5,
	updateAgeOnGet: true,
})

export function extractTokenFromHeader(request: FastifyRequest) {
	const token = request.headers.authorization?.split(' ')[1];
	return token;
}

export async function getValidSessionAndSaveToCache(token: string) {
	const cachedSession = sessionCache.get(token)

	if (cachedSession) {
		// maybe have to account for timezone
		const isValid = dayjs(cachedSession.expiresAt).isAfter(dayjs())

		if (!isValid) {
			sessionCache.delete(token)
			return null
		}
		return cachedSession

	} else {
		const userSession = await session.getUserSessionFromToken(token);

		if (!userSession) {
			return null;
		}

		sessionCache.set(token, userSession);

		return userSession;
	}
}