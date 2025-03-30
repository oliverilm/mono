import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';

export default function (fastify: FastifyInstance) {
	fastify.get('/get-private', (request) => {
		const userId = getAssertedUserIdFromRequest(request);
		return CompetitionService.privateCompetitions(userId);
	});
}
