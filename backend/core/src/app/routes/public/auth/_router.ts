import type { FastifyInstance } from 'fastify';

// PUBLIC ENDPOINTS
export default function (fastify: FastifyInstance) {
	fastify.register(import('./login'));
	fastify.register(import('./register'));
}
