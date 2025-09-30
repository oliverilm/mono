import { createCompetitionSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { getUserProfileFromRequest } from 'src/app/utils/db';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/',
		withBody(createCompetitionSchema, async (request) => {
			const userProfile = await getUserProfileFromRequest(request);

			if (!userProfile) {
				throw new Error('User profile not found');
			}

			return CompetitionService.createCompetition({
				data: request.body,
				userProfile,
			});
		}),
	);
}
