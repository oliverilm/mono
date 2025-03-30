import { updateCompetitionSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { requestUserId } from 'src/app/utils/request';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.patch(
		'/',
		withBody(updateCompetitionSchema, async (request) => {
			const userId = requestUserId(request);
			return CompetitionService.updateCompetition({
				userId,
				data: request.body,
			});
		}),
	);
}
