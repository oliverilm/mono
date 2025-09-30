import { slugSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';

export default function (fastify: FastifyInstance) {
	fastify.get('/get-by-slug/:slug', (request) => {
		const slug = slugSchema.parse(request.params);
		return ClubService.getClubByIdOrSlug(slug);
	});
}
