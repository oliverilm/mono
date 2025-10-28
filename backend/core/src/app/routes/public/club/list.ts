import { skipTakeSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import type { z } from 'zod';
import {
	type RequestWithQuery,
	createTypedFastify,
} from '../../../utils/fastify-typed';

export default function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);
	tf.query(skipTakeSchema).get('/', handler);
}

export async function handler({
	query,
}: RequestWithQuery<z.infer<typeof skipTakeSchema>>) {
	return ClubService.getClubList(query);
}
