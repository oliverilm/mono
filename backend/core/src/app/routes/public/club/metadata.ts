import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/:slug/metadata', async (request) => {
		const slug = slugSchema.parse(request.params);
		const club = await ClubService.getClubByIdOrSlug(slug);

		if (!club) {
			throw new Error('Club not found');
		}

		const userId = getAssertedUserIdFromRequest(request);

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
