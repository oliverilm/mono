import { idSchema, skipTakeSchema, userIdSchema } from '@monorepo/utils';
import type { PrismaClient } from '@prisma/client/extension';
import type { FastifyInstance } from 'fastify';
import { prisma } from 'src/app/utils/db';
import { convertSkipTake } from 'src/app/utils/object';
import { SessionService } from '../../session';

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

	fastify.register(buildCrudRoutes, { prefix: '/crud' });
}

function buildCrudRoutes(fastify: FastifyInstance) {
	const dbPathToModel: Record<string, PrismaClient[keyof PrismaClient]> = {
		user: prisma.user,
		userProfile: prisma.userProfile,
	} as const;
	for (const [key, path] of Object.entries(dbPathToModel)) {
		fastify.get(`/${key}/form`, async (request) => {
			// get all the types for the db path model columns and parse them to a json object for the frontend to parse it to a form

			return {
				form: {
					columns: Object.keys(path.fields).map((field) => {
						return {
							name: field,
							type: path.fields[field].type,
						};
					}),
				},
			};
		});

		fastify.get(`/${key}`, async (request) => {
			const skipTake = skipTakeSchema.parse(request.query);
			return path.findMany({
				...convertSkipTake(skipTake),
			});
		});

		fastify.get(`/${key}/:id`, async (request) => {
			const id = idSchema.parse(request.params);
			return path.findUnique({
				where: {
					id,
				},
			});
		});

		fastify.post(`/${key}`, async (request) => {
			const data = request.body;
			return path.create({
				data,
			});
		});

		fastify.put(`/${key}/:id`, async (request) => {
			const id = idSchema.parse(request.params);
			const data = request.body;
			return path.update({
				where: {
					id,
				},
				data,
			});
		});

		fastify.delete(`/${key}/:id`, async (request) => {
			const id = idSchema.parse(request.params);
			return path.delete({
				where: {
					id,
				},
			});
		});

		fastify.patch(`/${key}/:id`, async (request) => {
			const id = idSchema.parse(request.params);
			const data = request.body;
			return path.update({
				where: {
					id,
				},
				data,
			});
		});
	}
}
