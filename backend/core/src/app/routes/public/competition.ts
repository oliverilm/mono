import { FastifyInstance } from 'fastify';
import { CompetitionService } from '../../services/competition';
import { skipTakeSchema, slugSchema } from '@monorepo/utils';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/competitions', (request) => {
		const skipTake = skipTakeSchema.parse(request.query);
		return CompetitionService.list(skipTake);
	});

	fastify.get('/competitions/:slug', (request) => {
		const params = slugSchema.parse(request.params);
		return CompetitionService.get(params.slug);
	});

	fastify.get('/competitions/:slug/metadata', (request) => {
		const params = slugSchema.parse(request.params);
		return CompetitionService.getMetadata(params.slug, request.userId);
	});
}
