import { FastifyInstance } from 'fastify';
import { CompetitionService } from '../../services/competition';
import { skipTakeSchema } from '@monorepo/utils';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/competitions", (request) => {
        const skipTake = skipTakeSchema.parse(request.query)
        return CompetitionService.list(skipTake)
    })
}
