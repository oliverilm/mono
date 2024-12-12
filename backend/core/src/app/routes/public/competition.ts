import { FastifyInstance } from 'fastify';
import { CompetitionService } from '../../services/competition';
import { skipTakeSchema } from 'src/app/schemas/common';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/competition/list", (request) => {
        const skipTake = skipTakeSchema.parse(request.query)
        return CompetitionService.list(skipTake)
    })
}
