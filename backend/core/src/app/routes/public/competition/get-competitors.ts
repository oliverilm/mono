import { skipTakeSchema, slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/get-competitors/:slug', (request) => {
		const params = slugSchema.parse(request.params);
		const skipTake = skipTakeSchema.parse(request.query);
		return CompetitionService.listCompetitors(params.slug, skipTake);
	});
}
