import { skipTakeSchema, slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionService } from 'src/app/services/competition';
import { createTypedFastify } from '../../../utils/fastify-typed';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);
	tf.params(slugSchema)
		.query(skipTakeSchema)
		.get('/get-competitors/:slug', ({ params, query }) =>
			CompetitionService.listCompetitors(params.slug, {
				skip: Number(query?.skip ?? 0),
				take: Number(query?.take ?? 10),
			}),
		);
}
