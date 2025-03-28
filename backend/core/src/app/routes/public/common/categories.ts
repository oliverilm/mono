import { Category } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import { LRUCache } from 'lru-cache';
import { getSetReturn } from 'src/app/utils/cache';
import { prisma } from 'src/app/utils/db';
import { TIME_HOUR } from 'src/app/utils/time';

const commonCache = new LRUCache<string, Category[]>({
	max: 100,
	ttl: TIME_HOUR * 24,
});

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/categories', async () => {
		return getSetReturn(
			commonCache,
			'categories',
			await prisma.category.findMany(),
		);
	});
}
