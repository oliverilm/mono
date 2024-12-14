import { FastifyInstance } from 'fastify';
import { UserService } from '../../services/user';
import { loginCredentialSchema } from '@monorepo/utils';

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
