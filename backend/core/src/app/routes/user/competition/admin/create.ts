import { createCompetitionAdminSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';

export default function (fastify: FastifyInstance) {
	fastify.post('/', (request) => {
		const userId = getAssertedUserIdFromRequest(request);
		const data = createCompetitionAdminSchema.parse(request.body);

		return CompetitionService.createCompetitionAdmin(data, userId);
	});
}
