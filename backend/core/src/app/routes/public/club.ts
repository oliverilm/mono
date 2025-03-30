import { idSchema, skipTakeSchema, slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { requestUserId } from 'src/app/utils/request';
import { ClubService } from '../../services/club';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/clubs', (request) => {
		const skipTake = skipTakeSchema.parse(request.query);
		return ClubService.getClubList(skipTake);
	});

	fastify.get('/clubs/:id', (request) => {
		const id = idSchema.parse(request.params);
		return ClubService.getClubByIdOrSlug(id);
	});

	fastify.get('/club/:slug', (request) => {
		const slug = slugSchema.parse(request.params);
		return ClubService.getClubByIdOrSlug(slug);
	});

	fastify.get('/club/:slug/metadata', async (request) => {
		const slug = slugSchema.parse(request.params);
		const club = await ClubService.getClubByIdOrSlug(slug);

		if (!club) {
			throw new Error('Club not found');
		}

		const userId = requestUserId(request);

		const [isAdmin, admins] = await Promise.all([
			userId ? ClubService.isClubAdmin(userId, club.id) : false,
			ClubService.getClubAdmins(club.id),
		]);
		return {
			isAdmin,
			admins,
		};
	});
}
