import { FastifyInstance } from 'fastify';

export default function (fastify: FastifyInstance) {
	fastify.register(import('./create'));
	fastify.register(import('./update'));

	fastify.register(import('./category/_router'), { prefix: '/category' });
	fastify.register(import('./competitor/_router'), { prefix: '/competitor' });
	fastify.register(import('./admin/_router'), { prefix: '/admin' });
	fastify.register(import('./link/_router'), { prefix: '/link' });
}
