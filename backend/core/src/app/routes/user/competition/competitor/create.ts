import { createCompetitorSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { requestUserId } from 'src/app/utils/request';

export default function (fastify: FastifyInstance) {
	fastify.post('/create', async (request) => {
		const userId = requestUserId(request);
		const data = createCompetitorSchema.parse(request.body);

		return CompetitionService.createCompetitor(data, userId);
	});
}
