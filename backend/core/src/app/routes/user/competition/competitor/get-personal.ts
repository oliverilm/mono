import { slugSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { requestUserId } from 'src/app/utils/request';

export default function (fastify: FastifyInstance) {
	fastify.get('/get-personal/:slug', (request) => {
		const userId = requestUserId(request);
		const slug = slugSchema.parse(request.params);

		return CompetitionService.getPersonalCompetitors({
			userId,
			slug: slug.slug,
		});
	});
}
