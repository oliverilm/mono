import { FastifyInstance } from 'fastify';
import { UserService, LoginCredentials } from '../../services/user';
import typia from 'typia';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
    fastify.post('/auth/login', {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        }
    }, (request) => {
        const payload = typia.assert<LoginCredentials>(request.body)
        return UserService.login(payload);
    });

    fastify.post('/auth/register', {
        schema: {
            body: {
                type: 'object',
                required: ['email', 'password'],
                properties: {
                    email: { type: 'string' },
                    password: { type: 'string' }
                }
            }
        }
    }, async (request) => {
        const payload = typia.assert<LoginCredentials>(request.body)
        return UserService.createUser(payload);
    });

}
