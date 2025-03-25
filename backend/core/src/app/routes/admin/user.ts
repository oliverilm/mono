import { skipTakeSchema, userIdSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { SessionService } from 'src/app/services/session';
import { prisma } from 'src/app/utils/db';
import { convertSkipTake } from 'src/app/utils/object';

// ADMIN ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/list', (request) => {
		const skipTake = skipTakeSchema.parse(request.query);
		return prisma.user.findMany({
			orderBy: {
				createdAt: 'desc',
			},
			...convertSkipTake(skipTake),
		});
	});

	fastify.post('/impersonate', async (request) => {
		const userId = userIdSchema.parse(request.body);
		const session = await SessionService.createSession(userId.userId);
		return session.token;
	});
}
