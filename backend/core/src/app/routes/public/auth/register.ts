import { loginCredentialSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { UserService } from 'src/app/services/user';

export default async function (fastify: FastifyInstance) {
	fastify.post('/register', async (request) => {
		const loginCredentials = loginCredentialSchema.parse(request.body);
		return UserService.createUser(loginCredentials);
	});
}
