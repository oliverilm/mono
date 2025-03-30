import { userIdSchema } from '@monorepo/utils';
import type { FastifyRequest } from 'fastify';

export function requestUserId(request: FastifyRequest): string {
	return userIdSchema.parse({ userId: request.userId }).userId;
}
