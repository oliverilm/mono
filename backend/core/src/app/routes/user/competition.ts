import { FastifyInstance } from 'fastify';
import { CompetitionService } from '../../services/competition';
import { getUserProfileFromRequest } from '../../utils/db';
import { createCompetitionSchema, slugSchema } from '@monorepo/utils';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post("/competition/create", async (request) => {
        const userProfile = await getUserProfileFromRequest(request)
        
        if (!userProfile) {
            throw new Error("User profile not found")
        }
        
        const data = createCompetitionSchema.parse(request.body)
        return CompetitionService.createCompetition({ data, userProfile})
    })

    fastify.patch("/competitions/:slug", (request) => {
        const params = slugSchema.parse(request.params)

        const userId = getAssertedUserIdFromRequest(request)
        return CompetitionService.updateCompetition({competitionSlug: params.slug, userId, data: {} })
    })

    fastify.get("/competitions/private", (request) => {
        const userId = getAssertedUserIdFromRequest(request)
        return CompetitionService.privateCompetitions(userId)
    })
}

