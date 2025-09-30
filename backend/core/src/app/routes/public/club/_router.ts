import type { FastifyInstance } from 'fastify';

// PUBLIC ENDPOINTS
export default function (fastify: FastifyInstance) {
	fastify.register(import('./list'));
	fastify.register(import('./get-by-id'));
	fastify.register(import('./get-by-slug'));
	fastify.register(import('./metadata'));
}
