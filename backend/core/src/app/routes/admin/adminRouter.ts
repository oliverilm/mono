import type { FastifyInstance } from 'fastify';

// USER ENDPOINTS
export default async function (fastify: FastifyInstance) {
	fastify.register(import('./autohooks'));
	fastify.register(import('./user'), { prefix: 'user' });
	fastify.register(import('./crud'), { prefix: 'crud' });
}
