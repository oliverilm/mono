import { slugSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';

export default function (fastify: FastifyInstance) {
	fastify.get('/list/:slug', (request) => {
		const slug = slugSchema.parse(request.params);

		return CompetitionService.getCompetitionCategories(slug.slug);
	});
}
