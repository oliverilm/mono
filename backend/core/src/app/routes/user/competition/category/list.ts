import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionDb } from 'src/app/db/competition.db';

export default function (fastify: FastifyInstance) {
	fastify.get('/list/:slug', (request) => {
		const slug = slugSchema.parse(request.params);

		return CompetitionDb.getCompetitionCategoriesBySlug(slug.slug);
	});
}
