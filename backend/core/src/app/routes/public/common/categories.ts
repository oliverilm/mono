import type { FastifyInstance } from 'fastify';
import { LRUCache } from 'lru-cache';
import { prisma } from 'src/app/utils/db';
import { TIME_HOUR } from 'src/app/utils/time';

const commonCache = new LRUCache({
	max: 100,
	ttl: TIME_HOUR * 24,
});

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/categories', async (request) => {
		if (commonCache.has('categories')) {
			return commonCache.get('categories');
		}

		const categories = await prisma.category.findMany();

		if (categories) {
			commonCache.set('categories', categories);
		}

		return categories;
	});
}
