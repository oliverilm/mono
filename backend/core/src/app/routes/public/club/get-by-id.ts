import { idSchema } from '@monorepo/utils';
import type { FastifyInstance, FastifyRequest } from 'fastify';
import { ClubService } from 'src/app/services/club';

export default function (fastify: FastifyInstance) {
	// TODO: this might also be a slug.
	fastify.get('/get-by-id/:id', handler);
}

export async function handler(request: FastifyRequest) {
	const clubId = idSchema.parse(request.params);
	return ClubService.getClubByIdOrSlug(clubId);
}
