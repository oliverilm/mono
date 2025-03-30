import {
	competitionVisibilitySchema,
	deleteCompetitorSchema,
	slugSchema,
} from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import { CompetitionService } from 'src/app/services/competition';
import { UserService } from 'src/app/services/user';
import { prisma } from 'src/app/utils/db';
import { requestUserId } from 'src/app/utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.post('/competitions/:slug/configure-visibility', async (request) => {
		const slug = slugSchema.parse(request.params);
		const visibility = competitionVisibilitySchema.parse(request.body);

		const id = await CompetitionService.getCompetitionIdFromSlug(slug.slug);
		const isAdmin = await CompetitionService.isAdmin(
			id,
			requestUserId(request),
		);

		if (!isAdmin) {
			throw new Error('Unauthorized');
		}

		return prisma.competition.update({
			where: {
				id,
			},
			data: visibility,
		});
	});

	fastify.get('/competitions/private', (request) => {
		const userId = requestUserId(request);
		return CompetitionService.privateCompetitions(userId);
	});

	fastify.get('/competitions/:slug/personal-competitors', (request) => {
		const userId = requestUserId(request);
		const slug = slugSchema.parse(request.params);

		return CompetitionService.getPersonalCompetitors({
			userId,
			slug: slug.slug,
		});
	});

	fastify.post('/competitions/:slug/export', (request) => {
		const userId = requestUserId(request);
		const slug = slugSchema.parse(request.params);

		return CompetitionService.getCompetitorExport(
			{
				format: 'JSON',
			},
			userId,
			slug.slug,
		);
	});

	fastify.post('/delete-competitor', async (request) => {
		const userId = requestUserId(request);

		const competitorId = deleteCompetitorSchema.parse(request.body);
		const competitor = await prisma.competitor.findUnique({
			where: { id: competitorId.id },
		});

		if (!competitor) {
			throw new Error('Competitor not found');
		}

		const isAdmin = await ClubService.isClubAdmin(userId, competitor.clubId);

		if (!isAdmin) {
			// TODO: this could be more econimical. simplify to only fetch the profile id from the db
			const userProfile = await UserService.getUserProfileByUserId(userId);

			if (competitor.profileId !== userProfile?.id) {
				throw new Error('User is not an admin');
			}
		}

		const deleted = await prisma.competitor.delete({
			where: { id: competitorId.id },
		});

		if (!deleted) {
			throw new Error('Could not delete competitor');
		}

		return { id: competitorId.id };
	});
}
