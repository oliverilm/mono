import { skipTakeSchema } from '@monorepo/utils';
import type { Competition } from '@prisma/client';
import type { FastifyInstance } from 'fastify';
import { prisma } from 'src/app/utils/db';
import { convertSkipTake } from 'src/app/utils/object';
import type { z } from 'zod';
import {
	type RequestWithQuery,
	createTypedFastify,
} from '../../../utils/fastify-typed';

export default function (fastify: FastifyInstance) {
	const tf = createTypedFastify(fastify);
	tf.query(skipTakeSchema).get('/', handler);
}

export async function handler(
	request: RequestWithQuery<z.infer<typeof skipTakeSchema>>,
): Promise<Competition[]> {
	return prisma.competition.findMany({
		where: {
			isArchived: false,
			isPublished: true,
		},
		...convertSkipTake(request.query),
	});
}
