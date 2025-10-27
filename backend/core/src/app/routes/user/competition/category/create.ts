import { createCompetitionCategorySchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { requestUserId } from 'src/app/utils/request';
import { createTypedFastify } from '../../../../utils/fastify-typed';

export default function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);

	tf.body(createCompetitionCategorySchema).post('/create', async (request) => {
		const userId = requestUserId(request);
		const isAdmin = await CompetitionService.isAdmin(
			request.body.competitionId,
			userId,
		);

		if (!isAdmin) {
			throw new Error('User is not an admin on this competition');
		}

		return CompetitionService.createCompetitionCategory(request.body);
	});
}
