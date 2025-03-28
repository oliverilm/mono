import { skipTakeSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { prisma } from 'src/app/utils/db';
import { convertSkipTake } from 'src/app/utils/object';

export default function (fastify: FastifyInstance) {
	fastify.get('/', (request) => {
		const skipTake = skipTakeSchema.parse(request.query);

		return prisma.competition.findMany({
			where: {
				isArchived: false,
				isPublished: true,
			},
			...convertSkipTake(skipTake),
		});
	});
}
