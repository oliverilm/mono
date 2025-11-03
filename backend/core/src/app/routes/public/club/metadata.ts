import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { createTypedFastify } from '../../../utils/fastify-typed';
import { PublicClubHandlers } from './_handlers';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);
	tf.params(slugSchema).get(
		'/metadata/:slug',
		PublicClubHandlers.getPublicClubMetadata,
	);
}
