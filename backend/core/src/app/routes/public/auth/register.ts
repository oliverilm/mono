import { loginCredentialSchema } from '@monorepo/utils';
import { FastifyInstance } from 'fastify';
import { UserService } from 'src/app/services/user';
import { withBody } from 'src/app/utils/route-helper';

export default async function (fastify: FastifyInstance) {
	fastify.post(
		'/register',
		withBody(loginCredentialSchema, (request) =>
			UserService.createUser(request.body),
		),
	);
}
