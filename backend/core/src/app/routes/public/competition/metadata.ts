import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';

export default function (fastify: FastifyInstance) {
	fastify.get('/metadata/:slug', async (request) => {
		const params = slugSchema.parse(request.params);

		const [competitionAdmins, competitionLinks] = await Promise.all([
			CompetitionService.getCompetitionAdmins(params.slug, request.userId),
			CompetitionService.getCompetitionLinks(params.slug),
		]);
		return { ...competitionAdmins, competitionLinks };
	});
}
