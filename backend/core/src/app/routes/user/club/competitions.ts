import { slugSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { ClubService } from 'src/app/services/club';
import { ClubRepository } from 'src/repositories/club';

export default function (fastify: FastifyInstance) {
	fastify.get('/:slug/competitions', async (request) => {
		const slug = slugSchema.parse(request.params);
		const clubId = await ClubService.getClubIdBySlug(slug.slug);

		return ClubRepository.getClubCompetitions(clubId)
	});
}
