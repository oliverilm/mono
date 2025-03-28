import { slugSchema } from "@monorepo/utils";
import { FastifyInstance } from "fastify";
import { ClubService } from "src/app/services/club";
import { prisma } from "src/app/utils/db";

export default function (fastify: FastifyInstance) {
    fastify.get('/:slug/competitions', async (request) => {
		const slug = slugSchema.parse(request.params);

		const clubId = await ClubService.getClubIdBySlug(slug.slug);

		return prisma.competition.findMany({
			where: {
				clubId,
			},
		});
	});
}