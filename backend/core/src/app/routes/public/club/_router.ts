import { FastifyInstance } from 'fastify';

// PUBLIC ENDPOINTS
export default function (fastify: FastifyInstance) {
	fastify.register(import('./list'));
	fastify.register(import('./get'));
	fastify.register(import('./metadata'));
}
