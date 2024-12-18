import { FastifyInstance } from 'fastify';
import { ClubService } from '../../services/club';
import { getAssertedUserIdFromRequest } from '../../utils/request';
import { clubCreateSchema } from '@monorepo/utils';
import { tryHandleKnownErrors } from 'src/app/utils/error';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
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
