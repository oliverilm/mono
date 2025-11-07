import { idSchema, skipTakeSchema, slugSchema } from '@monorepo/utils';
import type { PrismaClient } from '@prisma/client/extension';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { prisma } from 'src/app/utils/db';
import { convertSkipTake } from 'src/app/utils/object';
import { z } from 'zod';

// ADMIN ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.register(buildCrudRoutes);
}

const dbPathToModel: Record<string, PrismaClient[keyof PrismaClient]> = {
	user: prisma.user,
	userProfile: prisma.userProfile,
	club: prisma.club,
	competition: prisma.competition,
	competitionAdmin: prisma.competitionAdmin,
	clubAdmin: prisma.clubAdmin,
	competitor: prisma.competitor,
	invitation: prisma.invitation,
	category: prisma.category,
	competitionCategory: prisma.competitionCategory,
	competitionLink: prisma.competitionLink,
} as const;

function buildCrudRoutes(fastify: FastifyInstance) {
	const getRouteProps = (request: FastifyRequest) => {
		const key = (request.params as Record<string, string>)?.key as string;

		if (!key) {
			throw new Error('Key is required');
		}

		if (!dbPathToModel[key]) {
			throw new Error('Key is not valid');
		}

		return { path: dbPathToModel[key], key };
	};

	const getWhere = (request: FastifyRequest) => {
		const params = request.params as Record<string, string>;

		// Try to parse as CUID (string ID)
		const cuidWhere = idSchema.safeParse(params);
		if (cuidWhere.success) {
			return {
				where: {
					id: cuidWhere.data.id,
				},
			};
		}

		// Try to parse as slug
		const slugWhere = slugSchema.safeParse(params);
		if (slugWhere.success) {
			return {
				where: {
					slug: slugWhere.data.slug,
				},
			};
		}

		// Try to parse as numeric ID
		const numberIdWhere = z
			.object({
				id: z.string().transform((val) => {
					const num = Number(val);
					if (Number.isNaN(num)) {
						throw new Error('Invalid number');
					}
					return num;
				}),
			})
			.safeParse(params);

		if (numberIdWhere.success) {
			return {
				where: {
					id: numberIdWhere.data.id,
				},
			};
		}

		throw new Error('Invalid lookup parameters');
	};

	fastify.get('/', async () => {
		return {
			models: Object.keys(dbPathToModel),
		};
	});
	fastify.get('/:key/form', async (request) => {
		// get all the types for the db path model columns and parse them to a json object for the frontend to parse it to a form
		const { path } = getRouteProps(request);
		return {
			form: {
				columns: Object.keys(path.fields).map((field) => {
					return {
						name: field,
						type: path.fields[field].typeName,
					};
				}),
			},
		};
	});

	fastify.get('/:key', async (request) => {
		const { path } = getRouteProps(request);
		const skipTake = skipTakeSchema.parse(request.query);
		return path.findMany({
			...convertSkipTake(skipTake),
			orderBy: {
				createdAt: 'desc',
			},
		});
	});

	fastify.get('/:key/:id', async (request) => {
		const { path } = getRouteProps(request);
		return path.findUnique(getWhere(request));
	});

	fastify.post('/:key', async (request) => {
		const { path } = getRouteProps(request);
		const data = request.body;
		return path.create({
			data,
		});
	});

	fastify.put('/:key/:id', async (request) => {
		const { path } = getRouteProps(request);
		const data = request.body;
		return path.update({
			...getWhere(request),
			data,
		});
	});

	fastify.delete('/:key/:id', async (request) => {
		const { path } = getRouteProps(request);
		return path.delete(getWhere(request));
	});

	fastify.patch('/:key/:id', async (request) => {
		const { path } = getRouteProps(request);
		const data = request.body;
		return path.update({
			...getWhere(request),
			data,
		});
	});
}
