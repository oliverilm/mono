import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/get-categories/:slug', (request) => {
		const params = slugSchema.parse(request.params);
		return CompetitionService.getCompetitionCategories(params.slug);
	});
}
