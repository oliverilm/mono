import { clubCreateSchema, createMemberSchema, slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { UserService } from 'src/app/services/user';
import { prisma } from 'src/app/utils/db';
import { tryHandleKnownErrors } from 'src/app/utils/error';
import { ClubService } from '../../services/club';
import { getAssertedUserIdFromRequest } from '../../utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.post('/club/:slug/members', async (request) => {
		const createMemberPayload = createMemberSchema.parse(request.body);
		const userId = getAssertedUserIdFromRequest(request);
		const slug = slugSchema.parse(request.params);
		const clubId = (await ClubService.getClubByIdOrSlug(slug))?.id;

		if (!clubId) {
			throw new Error('Club not found');
		}

		return ClubService.createMember(createMemberPayload, userId, clubId);
	});

	fastify.get('/club/:slug/members',  async (request) => {
		const userId = getAssertedUserIdFromRequest(request);
		const user = await UserService.getUserProfileByUserId(userId)
		const slug = slugSchema.parse(request.params);
		
		if (!user?.clubId) {
			throw new Error('User is not a member of a club');
		}

		const clubId = await ClubService.getClubIdBySlug(slug.slug);
		const isAdmin = await ClubService.isClubAdmin(userId,clubId);
		
		return prisma.userProfile.findMany({
			where: {
				club: {
					slug: slug.slug
				}
			},
			...(!isAdmin ? {
				select: {
					firstName: true,
					lastName: true,
					sex: true,
					belt: true,
					dateOfBirth: true
				}
			} : {})
		})
	});

	fastify.post('/club/create', async (request) => {
		const payload = clubCreateSchema.parse(request.body);
		try {
			const response = await ClubService.create({
				...payload,
				userId: getAssertedUserIdFromRequest(request),
			});

			return response;
		} catch (error) {
			tryHandleKnownErrors(error as Error);

			throw error;
		}
	});
}
