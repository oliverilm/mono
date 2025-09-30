import { loginCredentialSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { UserService } from 'src/app/services/user';
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/login',
		withBody(loginCredentialSchema, (request) =>
			UserService.login(request.body),
		),
	);
}
