import { updateCompetitionSchema } from "@monorepo/utils";
import { FastifyInstance } from "fastify";
import { CompetitionService } from "src/app/services/competition";
import { getAssertedUserIdFromRequest } from "src/app/utils/request";

export default function (fastify: FastifyInstance) {
    fastify.patch('/', async (request) => {
		const data = updateCompetitionSchema.parse(request.body);
        
        const userId = getAssertedUserIdFromRequest(request);
        return CompetitionService.updateCompetition({ userId, data });
	});
}