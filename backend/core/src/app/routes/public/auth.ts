import { loginCredentialSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { UserService } from '../../services/user';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.post('/auth/login', (request) => {
		const loginCredentials = loginCredentialSchema.parse(request.body);
		return UserService.login(loginCredentials);
	});

	fastify.post('/auth/register', async (request) => {
		const loginCredentials = loginCredentialSchema.parse(request.body);
		return UserService.createUser(loginCredentials);
	});
}
