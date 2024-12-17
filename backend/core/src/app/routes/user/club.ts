import { FastifyInstance } from 'fastify';
import { ClubService } from '../../services/club';
import { getAssertedUserIdFromRequest } from '../../utils/request';
import { clubCreateSchema } from '@monorepo/utils';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.post('/club/create', (request) => {
		const payload = clubCreateSchema.parse(request.body);
		return ClubService.create({
			...payload,
			userId: getAssertedUserIdFromRequest(request),
		});
	});
}
