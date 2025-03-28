import { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
	fastify.register(import('./competitions'));
	fastify.register(import('./create'));
	fastify.register(import('./members'));
}
