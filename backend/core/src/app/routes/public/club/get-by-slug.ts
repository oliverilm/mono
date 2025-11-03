import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import type { z } from 'zod';
import {
	type RequestWithParams,
	createTypedFastify,
} from '../../../utils/fastify-typed';

export default function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);
	tf.params(slugSchema).get('/get-by-slug/:slug', handler);
}

export async function handler(
	request: RequestWithParams<z.infer<typeof slugSchema>>,
) {
	return ClubService.getClubByIdOrSlug({ slug: request.params.slug });
}
