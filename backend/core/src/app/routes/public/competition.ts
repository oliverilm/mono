import { FastifyInstance } from 'fastify';
import typia from 'typia';
import { SearchQueryParam, SkipTake } from '../../utils/types';
import { CompetitionService } from '../../services/competition';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/competition/list", (request) => {
        const skipTake = typia.assert<SkipTake & SearchQueryParam>(request.query)
        return CompetitionService.list(skipTake)
    })
}
