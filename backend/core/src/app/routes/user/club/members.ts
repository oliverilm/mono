import { createMemberSchema, slugSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import { UserService } from 'src/app/services/user';
import { prisma } from 'src/app/utils/db';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/:slug/members',
		withBody(createMemberSchema, async (request) => {
			const userId = getAssertedUserIdFromRequest(request);
			const slug = slugSchema.parse(request.params);
			const clubId = (await ClubService.getClubByIdOrSlug(slug))?.id;

			if (!clubId) {
				throw new Error('Club not found');
			}

			return ClubService.createMember(request.body, userId, clubId);
		}),
	);

	fastify.get('/:slug/members', async (request) => {
		const userId = getAssertedUserIdFromRequest(request);
		const user = await UserService.getUserProfileByUserId(userId);
		const slug = slugSchema.parse(request.params);

		if (!user?.clubId) {
			throw new Error('User is not a member of a club');
		}

		const clubId = await ClubService.getClubIdBySlug(slug.slug);
		const isAdmin = await ClubService.isClubAdmin(userId, clubId);

		return prisma.userProfile.findMany({
			where: {
				club: {
					slug: slug.slug,
				},
			},
			...(!isAdmin
				? {
						select: {
							firstName: true,
							lastName: true,
							sex: true,
							belt: true,
							dateOfBirth: true,
						},
					}
				: {}),
		});
	});
}
