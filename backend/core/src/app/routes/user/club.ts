import { FastifyInstance } from 'fastify';
import club, { ClubCreate } from '../../services/club';
import typia from "typia"
import { getAssertedUserIdFromRequest } from '../../utils/request';

// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post("/club/create", {
        schema: {
            body: {
                type: 'object',
                required: ['name', 'country'],
                properties: {
                    name: { type: 'string' },
                    country: { type: 'string' }
                }
            }
        }
    }, (request) => {
        const payload = typia.assert<ClubCreate>(request.body)
        return club.create({...payload, userId: getAssertedUserIdFromRequest(request)})
    })
}

