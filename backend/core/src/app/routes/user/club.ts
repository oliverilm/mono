import { clubCreateSchema, createMemberSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { tryHandleKnownErrors } from 'src/app/utils/error';
import { ClubService } from '../../services/club';
import { getAssertedUserIdFromRequest } from '../../utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.post('/club/create-member', (request) => {
		const createMemberPayload = createMemberSchema.parse(request.body);
		const userId = getAssertedUserIdFromRequest(request);
		return ClubService.createMember(createMemberPayload, userId);
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
