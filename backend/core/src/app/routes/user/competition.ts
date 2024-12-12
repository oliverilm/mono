import { FastifyInstance } from 'fastify';
import typia from "typia"
import { CompetitionService, CreateCompetition } from '../../services/competition';
import { getUserProfileFromRequest } from '../../utils/db';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post("/competition/create", async (request) => {
        const userProfile = await getUserProfileFromRequest(request)
        
        if (!userProfile) {
            throw new Error("User profile not found")
        }
        
        const data = typia.assert<CreateCompetition>(request.body)
        return CompetitionService.createCompetition({ data , userProfile})
    })

    fastify.patch("/competitions/:slug", (request) => {
        // implement this
        const params = typia.assert<{slug: string}>(request.params)
        // TODO: implement this
        return CompetitionService.updateCompetition(params.slug, {})
    })
}

