import { loginCredentialSchema } from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { UserService } from 'src/app/services/user';
import { createTypedFastify } from 'src/app/utils/fastify-typed';

// NEW TYPED APPROACH - This is how you can use the new API
export default function (fastify: FastifyInstance) {
	const typedFastify = createTypedFastify(fastify);

	// The new API provides the exact syntax you requested:
	// fastify.body(zod.object(...)).post("path", (request) => // here the request.body is typeof zod.object(...))
	typedFastify.body(loginCredentialSchema).post('/login', (request) => {
		// request.body is now strongly typed as { email: string; password: string }
		// No need for manual parsing - it's already validated and typed!
		return UserService.login(request.body);
	});
}

// COMPARISON WITH OLD APPROACH:
/*
// OLD APPROACH (current implementation):
import { withBody } from 'src/app/utils/route-helper';

export default function (fastify: FastifyInstance) {
	fastify.post(
		'/login',
		withBody(loginCredentialSchema, (request) =>
			UserService.login(request.body),
		),
	);
}

// NEW APPROACH (what you requested):
import { createTypedFastify } from 'src/app/utils/fastify-typed';

export default function (fastify: FastifyInstance) {
	const typedFastify = createTypedFastify(fastify);
	
	typedFastify.body(loginCredentialSchema).post('/login', (request) => {
		// request.body is strongly typed and validated
		return UserService.login(request.body);
	});
}
*/
