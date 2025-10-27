import { skipTakeSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import type { z } from 'zod';
import {
	type RequestWithQuery,
	createTypedFastify,
} from '../../utils/fastify-typed';
import {
	PrismaPagination,
	convertSkipTakeToPagination,
} from '../../utils/prisma-pagination';

// Example: Club list with pagination
export default function clubListExample(fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);
	tf.query(skipTakeSchema.optional()).get('/clubs', handler);
}

export async function handler(
	request: RequestWithQuery<z.infer<typeof skipTakeSchema>>,
) {
	const skipTake = skipTakeSchema.parse(request.query);
	const pagination = convertSkipTakeToPagination(skipTake);

	// Use the pagination abstraction
	return PrismaPagination.findClubsPaginated(
		{
			// Add any where conditions
			isActive: true,
		},
		pagination,
	);
}

// Example: User list with pagination and custom ordering
export async function userListExample(
	request: RequestWithQuery<z.infer<typeof skipTakeSchema>>,
) {
	const skipTake = skipTakeSchema.parse(request.query);
	const pagination = convertSkipTakeToPagination(skipTake);

	// Use the generic method for custom ordering
	return PrismaPagination.findManyPaginated(
		{
			findMany: (args) =>
				prisma.user.findMany({
					...args,
					orderBy: { createdAt: 'desc' },
					include: { profile: true },
				}),
			count: (args) => prisma.user.count(args),
		},
		{
			where: {
				isActive: true,
			},
		},
		pagination,
	);
}

// Example: Competition categories with pagination
export async function competitionCategoriesExample(
	request: RequestWithQuery<z.infer<typeof skipTakeSchema>>,
) {
	const skipTake = skipTakeSchema.parse(request.query);
	const pagination = convertSkipTakeToPagination(skipTake);

	return PrismaPagination.findManyPaginated(
		{
			findMany: (args) => prisma.competitionCategory.findMany(args),
			count: (args) => prisma.competitionCategory.count(args),
		},
		{
			where: {
				isActive: true,
			},
		},
		pagination,
	);
}

// Import prisma for the examples
import { prisma } from '../utils/db';

