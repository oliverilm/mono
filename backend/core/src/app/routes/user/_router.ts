import type { FastifyInstance } from 'fastify';

// USER ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.register(import('./autohooks'));
	fastify.register(import('./user'));
	fastify.register(import('./invitation'));

	fastify.register(import('./club/_router'), { prefix: '/club' });
	fastify.register(import('./competition/_router'), { prefix: '/c_v2' });
}
