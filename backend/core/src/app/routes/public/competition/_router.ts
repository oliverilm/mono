import { FastifyInstance } from 'fastify';

// PUBLIC ENDPOINTS
export default function (fastify: FastifyInstance) {
	fastify.register(import('./list'));
}
