import { FastifyInstance, FastifyRequest } from 'fastify';
import { CompetitionService } from '../../services/competition';
import { getUserProfileFromRequest } from '../../utils/db';
import { createCompetitionSchema, updateCompetitionSchema } from '@monorepo/utils';
import { getAssertedUserIdFromRequest } from 'src/app/utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post("/competitions", async (request) => {
        const userProfile = await getUserProfileFromRequest(request)
        
        if (!userProfile) {
            throw new Error("User profile not found")
        }
        
        const data = createCompetitionSchema.parse(request.body)
        return CompetitionService.createCompetition({ data, userProfile})
    })

    fastify.patch("/competitions", (request: FastifyRequest) => {
        const data = updateCompetitionSchema.parse(request.body)

        const userId = getAssertedUserIdFromRequest(request)
        return CompetitionService.updateCompetition({ userId, data })
    })

    fastify.get("/competitions/private", (request) => {
        const userId = getAssertedUserIdFromRequest(request)
        return CompetitionService.privateCompetitions(userId)
    })
}

