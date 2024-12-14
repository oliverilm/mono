import { FastifyInstance } from 'fastify';
import { UserService } from '../../services/user';
import { getAssertedUserIdFromRequest } from '../../utils/request';
import { userPatchSchema } from '@monorepo/utils';


// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/profile", (request) => {
        return UserService.getUserProfile(
            getAssertedUserIdFromRequest(request)
        )
    })

    fastify.patch("/profile", (request) => {

        const payload = userPatchSchema.parse(request.body)
        return UserService.updateUserProfile({
            ...payload, 
            userId: getAssertedUserIdFromRequest(request)
        })
    })
}

