import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionDb } from 'src/app/db/competition.db';

export default function (fastify: FastifyInstance) {
	fastify.get('/:slug', (request) => {
		const params = slugSchema.parse(request.params);
		return CompetitionDb.getCompetitionBySlug(params.slug);
	});
}
