import type { Category } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import { createCache } from 'src/app/utils/cache';
import { prisma } from 'src/app/utils/db';

const { withCache } = createCache<Category[]>();

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/categories', async () => {
		return withCache('categories', await prisma.category.findMany());
	});
}
