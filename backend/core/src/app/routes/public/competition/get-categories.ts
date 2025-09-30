import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionDb } from 'src/app/db/competition.db';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/get-categories/:slug', (request) => {
		const params = slugSchema.parse(request.params);
		return CompetitionDb.getCompetitionCategoriesBySlug(params.slug);
	});
}
