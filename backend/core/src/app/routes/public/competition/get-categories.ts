import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { CompetitionDb } from 'src/app/db/competition.db';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/get-categories/:slug', handler);
}

export async function handler(request: FastifyRequest) {
	const params = slugSchema.parse(request.params);
	return CompetitionDb.getCompetitionCategoriesBySlug(params.slug);
}
