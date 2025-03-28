import { createCompetitionSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { getUserProfileFromRequest } from 'src/app/utils/db';

export default function (fastify: FastifyInstance) {
	fastify.post('/', async (request) => {
		const userProfile = await getUserProfileFromRequest(request);

		if (!userProfile) {
			throw new Error('User profile not found');
		}

		const data = createCompetitionSchema.parse(request.body);
		return CompetitionService.createCompetition({ data, userProfile });
	});
}
