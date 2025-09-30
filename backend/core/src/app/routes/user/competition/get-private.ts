import type { FastifyInstance } from 'fastify';
import { CompetitionDb } from 'src/app/db/competition.db';
import { requestUserId } from 'src/app/utils/request';

export default function (fastify: FastifyInstance) {
	fastify.get('/get-private', (request) => {
		const userId = requestUserId(request);
		return CompetitionDb.getAdminPrivateCompetitions(userId);
	});
}
