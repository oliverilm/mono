import { createCompetitionAdminSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/',
		withBody(createCompetitionAdminSchema, (request) => {
			const userId = getAssertedUserIdFromRequest(request);
			return CompetitionService.createCompetitionAdmin(request.body, userId);
		}),
	);
}
