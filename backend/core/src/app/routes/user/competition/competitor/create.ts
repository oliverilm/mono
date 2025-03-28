import { createCompetitorSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';

export default function (fastify: FastifyInstance) {
	fastify.post('/competitors', async (request) => {
		const userId = getAssertedUserIdFromRequest(request);
		const data = createCompetitorSchema.parse(request.body);

		return CompetitionService.createCompetitor(data, userId);
	});
}
