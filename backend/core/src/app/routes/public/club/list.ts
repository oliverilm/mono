import { skipTakeSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';

export default function (fastify: FastifyInstance) {
	fastify.get('/', (request) => {
		const skipTake = skipTakeSchema.parse(request.query);
		return ClubService.getClubList(skipTake);
	});
}
