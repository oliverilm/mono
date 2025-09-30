import { createCompetitionCategorySchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { requestUserId } from 'src/app/utils/request';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/create',
		withBody(createCompetitionCategorySchema, async (request) => {
			const userId = requestUserId(request);
			const isAdmin = await CompetitionService.isAdmin(
				request.body.competitionId,
				userId,
			);

			if (!isAdmin) {
				throw new Error('User is not an admin');
			}

			return CompetitionService.createCompetitionCategory(request.body);
		}),
	);
}
