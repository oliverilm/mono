import { FastifyInstance, FastifyRequest } from 'fastify';
import { CompetitionService } from '../../services/competition';
import { getUserProfileFromRequest } from '../../utils/db';
import {
	createCompetitionCategorySchema,
	createCompetitionSchema,
	createCompetitorSchema,
	slugSchema,
	updateCompetitionSchema,
} from '@monorepo/utils';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.post('/competitions', async (request) => {
		const userProfile = await getUserProfileFromRequest(request);

		if (!userProfile) {
			throw new Error('User profile not found');
		}

		const data = createCompetitionSchema.parse(request.body);
		return CompetitionService.createCompetition({ data, userProfile });
	});

	fastify.patch('/competitions', (request: FastifyRequest) => {
		const data = updateCompetitionSchema.parse(request.body);

		const userId = getAssertedUserIdFromRequest(request);
		return CompetitionService.updateCompetition({ userId, data });
	});

	fastify.post('/competitions/:slug/competitors', (request) => {
		const params = slugSchema.parse(request.params); // TODO: not sure what to do with this
		const userId = getAssertedUserIdFromRequest(request);
		const data = createCompetitorSchema.parse(request.body);

		return CompetitionService.createCompetitor(data, userId);
	});

	fastify.post('/competitions/:slug/categories', async (request) => {
		const slug = slugSchema.parse(request.params);
		const body = createCompetitionCategorySchema.parse(request.body);
		const userId = getAssertedUserIdFromRequest(request);
		const competitionId = await CompetitionService.getCompetitionIdFromSlug(
			slug.slug,
		);

		const isAdmin = await CompetitionService.isAdmin(competitionId, userId);

		if (!isAdmin) {
			throw new Error('User is not an admin');
		}

		return CompetitionService.createCompetitionCategory(slug.slug, body);
	});

	fastify.get('/competitions/:slug/categories', (request) => {
		const slug = slugSchema.parse(request.params);

		return CompetitionService.getCompetitionCategories(slug.slug);
	});

	fastify.get('/competitions/private', (request) => {
		const userId = getAssertedUserIdFromRequest(request);
		return CompetitionService.privateCompetitions(userId);
	});
}
