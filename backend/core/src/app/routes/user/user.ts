import { FastifyInstance } from 'fastify';
import { UserService } from '../../services/user';
import typia from 'typia';
import { getAssertedUserIdFromRequest } from '../../utils/request';
import { userPatchSchema } from 'src/app/schemas/auth';


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

