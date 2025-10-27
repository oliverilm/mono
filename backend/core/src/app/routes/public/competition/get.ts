import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { CompetitionDb } from 'src/app/db/competition.db';

export default function (fastify: FastifyInstance) {
	fastify.get('/:slug', handler);
}

export async function handler(request: FastifyRequest) {
	const params = slugSchema.parse(request.params);
	return CompetitionDb.getCompetitionBySlug(params.slug);
}
