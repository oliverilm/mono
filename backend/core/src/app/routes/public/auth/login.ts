import { loginCredentialSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { UserService } from 'src/app/services/user';

export default function (fastify: FastifyInstance) {
	fastify.post('/login', (request) => {
		const loginCredentials = loginCredentialSchema.parse(request.body);
		return UserService.login(loginCredentials);
	});
}
