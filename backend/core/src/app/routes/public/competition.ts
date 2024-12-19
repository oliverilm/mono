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

	fastify.get('/competitions/:slug/metadata', async (request) => {
		const params = slugSchema.parse(request.params);
		
		const [competitionAdmins, competitionLinks] = await Promise.all([
			CompetitionService.getCompetitionAdmins(params.slug, request.userId),
			CompetitionService.getCompetitionLinks(params.slug),
		]);
		return { ...competitionAdmins, competitionLinks };
	});

	fastify.get('/competitions/:slug/competitors', (request) => {
		const params = slugSchema.parse(request.params);
		const skipTake = skipTakeSchema.parse(request.query);
		return CompetitionService.listCompetitors(params.slug, skipTake);
	});

	fastify.get('/competitions/:slug/categories', (request) => {
		const params = slugSchema.parse(request.params);
		return CompetitionService.getCompetitionCategories(params.slug);
	});
}
