import {
	loginCredentialSchema,
	skipTakeSchema,
	userIdSchema,
} from '@monorepo/utils';
import type { FastifyInstance } from 'fastify';
import { createTypedFastify } from 'src/app/utils/fastify-typed';

// Example of how to use the new typed routes API
export default function (fastify: FastifyInstance) {
	const typedFastify = createTypedFastify(fastify);

	// Example 1: Body validation only
	typedFastify.body(loginCredentialSchema).post('/login', (request) => {
		return request.body;
	});

	// Example 2: Params validation only
	typedFastify.params(userIdSchema).get('/user/:userId', (request) => {
		return request.params.userId;
	});

	// Example 3: Query validation only
	typedFastify.query(skipTakeSchema).get('/users', (request) => {
		return request.query;
	});

	// Example 4: PUT with body validation
	typedFastify.body(loginCredentialSchema).put('/user/profile', (request) => {
		return request.body;
	});

	// Example 5: PATCH with body validation
	typedFastify.body(loginCredentialSchema).patch('/user/profile', (request) => {
		return request.body;
	});

	// Example 6: DELETE with params validation
	typedFastify.params(userIdSchema).delete('/user/:userId', (request) => {
		return request.params.userId;
	});
}
