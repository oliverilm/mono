import {
	invitatationCreateSchema,
	invitationDecideSchema,
	invitationQueryParamSchema,
} from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import { prisma } from 'src/app/utils/db';
import { UserService } from '../../services/user';
import { getAssertedUserIdFromRequest } from '../../utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/invitation/to', async (request) => {
		const profile = await UserService.getUserProfileByUserId(
			getAssertedUserIdFromRequest(request),
		);
		return prisma.invitation.findMany({
			where: {
				isAccepted: null,
				profileId: profile?.id,
			},
		});
	});

	fastify.post('/invitation', async (request) => {
		const payload = invitatationCreateSchema.parse(request.body);
		const userId = getAssertedUserIdFromRequest(request);
		const profile = await UserService.getUserProfileByUserId(userId);
		if (!profile) {
			throw new Error('Profile not found');
		}

		const isAdmin = await ClubService.isClubAdmin(userId, profile.clubId);

		if (!profile.clubId) {
			throw new Error('You are not a member of a club');
		}
		if (!isAdmin) {
			throw new Error('You are not an admin of this club');
		}

		return prisma.invitation.create({
			data: {
				club: {
					connect: {
						id: profile.clubId,
					},
				},
				profile: {
					connect: {
						id: payload.profileId,
					},
				},
				invitedBy: {
					connect: {
						id: profile.id,
					},
				},
			},
		});
	});

	/*
	 * This endpoint is used to get all invitations that the user or its club has created
	 */
	fastify.get('/invitation/from', async (request) => {
		const userId = getAssertedUserIdFromRequest(request);
		const profile = await UserService.getUserProfileByUserId(userId);

		if (!profile) {
			throw new Error('Profile not found');
		}

		if (!profile.clubId) {
			throw new Error('You are not a member of a club');
		}

		return prisma.invitation.findMany({
			where: {
				isAccepted: null,
				clubId: profile.clubId,
			},
		});
	});

	fastify.post('/invitation/decide/:id', async (request) => {
		const userId = getAssertedUserIdFromRequest(request);
		const profile = await UserService.getUserProfileByUserId(userId);
		const query = invitationQueryParamSchema.parse(request.params);
		const payload = invitationDecideSchema.parse(request.body);

		if (!profile) {
			throw new Error('Profile not found');
		}

		const invitation = await prisma.invitation.update({
			where: {
				id: Number(query.id),
				profileId: profile?.id,
			},
			data: {
				isAccepted: payload.isAccepted,
			},
		});

		if (!invitation) {
			throw new Error('you can not decide on this invitation');
		}

		if (invitation.isAccepted) {
			await prisma.userProfile.update({
				where: {
					id: profile.id,
				},
				data: {
					clubId: invitation.clubId,
				},
			});
		}

		return { isAccepted: invitation.isAccepted };
	});
}
