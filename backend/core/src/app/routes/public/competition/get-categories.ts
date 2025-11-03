import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { CompetitionDb } from 'src/app/db/competition.db';
import type { z } from 'zod';
import {
	type RequestWithParams,
	createTypedFastify,
} from '../../../utils/fastify-typed';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);

	tf.params(slugSchema).get('/get-categories/:slug', handler);
}

export async function handler({
	params,
}: RequestWithParams<z.infer<typeof slugSchema>>) {
	return CompetitionDb.getCompetitionCategoriesBySlug(params.slug);
}
