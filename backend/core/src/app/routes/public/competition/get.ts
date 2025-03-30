import { slugSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';

export default function (fastify: FastifyInstance) {
	fastify.get('/:slug', (request) => {
		const params = slugSchema.parse(request.params);
		return CompetitionService.get(params.slug);
	});
}
