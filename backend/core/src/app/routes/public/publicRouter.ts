import type { FastifyInstance } from 'fastify';

// PUBLIC ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.register(import('./autohooks'));

	fastify.register(import('./auth/_router'), { prefix: '/auth' });
	fastify.register(import('./club/_router'), { prefix: '/club' });
	fastify.register(import('./common/_router'), { prefix: '/common' });
	fastify.register(import('./competition/_router'), { prefix: '/competition' });
}
