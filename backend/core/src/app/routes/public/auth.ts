import { FastifyInstance } from 'fastify';
import { UserService } from '../../services/user';
import typia from 'typia';
import { LoginCredentials, loginCredentialSchema,  } from '../../schemas/auth';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post('/auth/login', (request) => {
        const loginCredentials = loginCredentialSchema.parse(request.body)
        return UserService.login(loginCredentials);
    });

    fastify.post('/auth/register', async (request) => {
        const loginCredentials = loginCredentialSchema.parse(request.body)
        return UserService.createUser(loginCredentials);
    });

}
