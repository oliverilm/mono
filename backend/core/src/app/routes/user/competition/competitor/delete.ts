import { deleteCompetitorSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import { UserService } from 'src/app/services/user';
import { prisma } from 'src/app/utils/db';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.delete(
		'/delete',
		withBody(deleteCompetitorSchema, async (request) => {
			const userId = getAssertedUserIdFromRequest(request);

			const { id } = request.body;
			const competitor = await prisma.competitor.findUnique({
				where: { id },
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
				where: { id },
			});

			if (!deleted) {
				throw new Error('Could not delete competitor');
			}

			return { id };
		}),
	);
}
