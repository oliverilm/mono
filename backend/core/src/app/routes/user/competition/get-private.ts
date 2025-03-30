import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { requestUserId } from 'src/app/utils/request';

export default function (fastify: FastifyInstance) {
	fastify.get('/get-private', (request) => {
		const userId = requestUserId(request);
		return CompetitionService.privateCompetitions(userId);
	});
}
