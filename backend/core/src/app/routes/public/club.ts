import { FastifyInstance } from 'fastify';
import { ClubService } from '../../services/club';
import { skipTakeSchema } from '@monorepo/utils';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.get('/clubs', (request) => {
		const skipTake = skipTakeSchema.parse(request.query);
		return ClubService.getClubList(skipTake);
	});

	fastify.get('/club/:slug', (request) => {
		// TODO: implement me
		return null;
	});
}
