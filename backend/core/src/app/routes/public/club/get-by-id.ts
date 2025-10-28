import { idSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import type { z } from 'zod';
import {
	type RequestWithParams,
	createTypedFastify,
} from '../../../utils/fastify-typed';

export default function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);
	// TODO: this might also be a slug.
	tf.params(idSchema).get('/get-by-id/:id', handler);
}

export async function handler(
	request: RequestWithParams<z.infer<typeof idSchema>>,
) {
	console.log('request.params.id', request.params.id);
	console.log('request.params', request.params);
	return ClubService.getClubByIdOrSlug({ id: request.params.id });
}
