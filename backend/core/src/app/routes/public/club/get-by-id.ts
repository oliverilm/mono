import { idSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';

export default function (fastify: FastifyInstance) {
	// TODO: this might also be a slug.
	fastify.get('/get-by-id/:id', (request) => {
		const clubId = idSchema.parse(request.params);
		return ClubService.getClubByIdOrSlug(clubId);
	});
}
