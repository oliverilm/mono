import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { ClubService } from 'src/app/services/club';

export default function (fastify: FastifyInstance) {
	fastify.get('/get-by-slug/:slug', handler);
}

export async function handler(request: FastifyRequest) {
	const slug = slugSchema.parse(request.params);
	return ClubService.getClubByIdOrSlug(slug);
}
