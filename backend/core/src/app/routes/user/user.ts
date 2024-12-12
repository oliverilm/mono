import { FastifyInstance } from 'fastify';
import { UserService, UserPatchPayload } from '../../services/user';
import typia from 'typia';
import { getAssertedUserIdFromRequest } from '../../utils/request';


// PRIVATE ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.get("/profile", (request) => {
        return UserService.getUserProfile(
            getAssertedUserIdFromRequest(request)
        )
    })

    fastify.patch("/profile", (request) => {
        const payload = typia.assert<Omit<UserPatchPayload, "userId">>(request.body)
        return UserService.updateUserProfile({
            ...payload, 
            userId: getAssertedUserIdFromRequest(request)
        })
    })
}

