import { idSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';

export default function (fastify: FastifyInstance) {
	// TODO: this might also be a slug.
	fastify.get('/get-by-slug/:slug', (request) => {
		const slug = idSchema.parse(request.params);
		return ClubService.getClubByIdOrSlug(slug);
	});
}
